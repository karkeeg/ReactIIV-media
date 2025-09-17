
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
    const { goals, expertise, targetAudience, challenges, experience, interests } = body;

    // Update user onboarding completion
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        onboardingCompleted: true,
        progress: {
          upsert: {
            create: {
              currentStep: 'extraction',
              achievements: JSON.stringify([{
                id: 'onboarding-complete',
                title: 'Welcome Aboard!',
                description: 'Completed onboarding successfully',
                unlocked: true,
                unlockedAt: new Date()
              }]),
              timeInSystem: 5 // Initial 5 minutes for onboarding
            },
            update: {
              currentStep: 'extraction',
              achievements: JSON.stringify([{
                id: 'onboarding-complete',
                title: 'Welcome Aboard!',
                description: 'Completed onboarding successfully',
                unlocked: true,
                unlockedAt: new Date()
              }])
            }
          }
        }
      }
    });

    // Store onboarding data for personalization (you could create a separate table for this)
    // For now, we'll store it in a simple format in the user progress
    await prisma.userProgress.update({
      where: { userId: session.user.id },
      data: {
        // Store onboarding responses in achievements for now
        achievements: JSON.stringify([
          {
            id: 'onboarding-complete',
            title: 'Welcome Aboard!',
            description: 'Completed onboarding successfully',
            unlocked: true,
            unlockedAt: new Date()
          },
          {
            id: 'profile-data',
            goals,
            expertise,
            targetAudience,
            challenges,
            experience,
            interests
          }
        ])
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Onboarding completed successfully'
    });

  } catch (error) {
    console.error('Onboarding completion error:', error);
    return NextResponse.json(
      { error: 'Failed to complete onboarding' },
      { status: 500 }
    );
  }
}
