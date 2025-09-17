
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, niche, targetAudience, transformation, timeframe, expertise } = body;

    // Validate required fields
    if (!title || !niche || !targetAudience || !transformation) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create extraction session
    const extraction = await prisma.extraction.create({
      data: {
        userId: session.user.id,
        title,
        niche,
        targetAudience,
        transformation,
        currentStep: 1,
        productIdea: `${title} — A digital product that helps ${targetAudience} go from their current challenges to ${transformation} in ${timeframe} minutes.`,
        sixPillars: JSON.stringify({
          timeframe,
          expertise,
          pillars: []
        })
      }
    });

    return NextResponse.json({
      success: true,
      extraction: {
        id: extraction.id,
        title: extraction.title,
        niche: extraction.niche,
        currentStep: extraction.currentStep
      }
    });

  } catch (error) {
    console.error('Extraction creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create extraction session' },
      { status: 500 }
    );
  }
}
