
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';

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

    const { step, data } = await request.json();

    const extraction = await prisma.extraction.update({
      where: {
        id: params.id,
        userId: session.user.id
      },
      data: {
        currentStep: step,
        isComplete: step === 8,
        ...(data && { 
          sixPillars: step === 1 ? data : undefined,
          percMethod: step === 3 ? data : undefined,
          resources: step === 4 ? data : undefined,
          salesPage: step === 5 ? data : undefined
        })
      }
    });

    // Update user progress
    await prisma.userProgress.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        completedExtractions: step === 8 ? 1 : 0,
        currentStep: step === 8 ? 'product_creation' : 'extraction',
        timeInSystem: 5
      },
      update: {
        completedExtractions: step === 8 ? { increment: 1 } : undefined,
        currentStep: step === 8 ? 'product_creation' : 'extraction',
        timeInSystem: { increment: 5 },
        lastActiveAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      extraction: {
        id: extraction.id,
        currentStep: extraction.currentStep,
        isComplete: extraction.isComplete
      }
    });

  } catch (error) {
    console.error('Extraction update error:', error);
    return NextResponse.json(
      { error: 'Failed to update extraction' },
      { status: 500 }
    );
  }
}
