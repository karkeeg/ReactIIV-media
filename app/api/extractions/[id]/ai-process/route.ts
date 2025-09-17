
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { EXTRACTION_PROMPTS } from '@/lib/prompts';

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { step } = await request.json();
    
    // Get extraction data
    const extraction = await prisma.extraction.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      }
    });

    if (!extraction) {
      return NextResponse.json(
        { error: 'Extraction not found' },
        { status: 404 }
      );
    }

    // Build the prompt based on the step
    let prompt = '';
    let messages = [];

    switch (step) {
      case 1:
        prompt = EXTRACTION_PROMPTS.PRODUCT_EXTRACTION
          .replace('{productIdea}', extraction.productIdea || '')
          .replace('{targetAudience}', extraction.targetAudience || '')
          .replace('{transformation}', extraction.transformation || '');
        break;

      case 2:
        const sixPillarsData = extraction.sixPillars as any;
        prompt = EXTRACTION_PROMPTS.PILLAR_EXPANSION
          .replace('{pillarTitle}', 'All Pillars')
          .replace('{currentContent}', JSON.stringify(sixPillarsData?.pillars || []))
          .replace('{targetAudience}', extraction.targetAudience || '');
        break;

      case 5:
        const pillarsForSales = extraction.sixPillars as any;
        prompt = EXTRACTION_PROMPTS.SALES_PAGE_GENERATION
          .replace('{productTitle}', extraction.title)
          .replace('{price}', '$37')
          .replace('{targetAudience}', extraction.targetAudience || '')
          .replace('{transformation}', extraction.transformation || '')
          .replace('{pillars}', JSON.stringify(pillarsForSales?.pillars || []));
        break;

      default:
        prompt = `Continue processing step ${step} for the product "${extraction.title}". 
                 Target audience: ${extraction.targetAudience}
                 Transformation: ${extraction.transformation}
                 
                 Generate appropriate content for this step with detailed, actionable information.`;
    }

    messages = [{
      role: "user",
      content: prompt
    }];

    // Stream the LLM response
    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: messages,
        stream: true,
        max_tokens: 3000,
        response_format: step === 1 || step === 5 ? { type: "json_object" } : undefined,
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      throw new Error(`LLM API error: ${response.status}`);
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        let buffer = '';
        let partialRead = '';

        try {
          while (true) {
            const { done, value } = await reader?.read() ?? { done: true, value: undefined };
            if (done) break;
            
            partialRead += decoder.decode(value, { stream: true });
            let lines = partialRead.split('\n');
            partialRead = lines.pop() || '';

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') {
                  // Process the complete response
                  let finalResult;
                  
                  if (step === 1 || step === 5) {
                    // JSON response expected
                    try {
                      finalResult = JSON.parse(buffer);
                    } catch (e) {
                      finalResult = { content: buffer };
                    }
                  } else {
                    finalResult = { content: buffer };
                  }

                  // Update extraction in database
                  const updateData: any = { currentStep: step };
                  
                  if (step === 1) {
                    updateData.sixPillars = finalResult;
                  } else if (step === 5) {
                    updateData.salesPage = finalResult;
                  } else {
                    // Store in resources or other appropriate field
                    const currentResources = extraction.resources as any || {};
                    currentResources[`step_${step}`] = finalResult;
                    updateData.resources = currentResources;
                  }

                  await prisma.extraction.update({
                    where: { id: params.id },
                    data: updateData
                  });

                  const finalData = JSON.stringify({
                    status: 'completed',
                    result: finalResult
                  });
                  
                  controller.enqueue(encoder.encode(`data: ${finalData}\n\n`));
                  return;
                }
                
                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content || '';
                  buffer += content;
                  
                  // Stream progress updates
                  const progressData = JSON.stringify({
                    status: 'processing',
                    message: 'Generating content...',
                    chunk: content
                  });
                  
                  controller.enqueue(encoder.encode(`data: ${progressData}\n\n`));
                } catch (e) {
                  // Skip invalid JSON
                }
              }
            }
          }
        } catch (error) {
          console.error('Stream error:', error);
          const errorData = JSON.stringify({
            status: 'error',
            message: 'Processing failed'
          });
          controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
          controller.error(error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('AI processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process AI request' },
      { status: 500 }
    );
  }
}
