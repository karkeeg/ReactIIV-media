
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

    // Increment template usage count
    await prisma.template.update({
      where: { id: params.id },
      data: {
        usageCount: { increment: 1 }
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Template usage recorded'
    });

  } catch (error) {
    console.error('Template usage error:', error);
    return NextResponse.json(
      { error: 'Failed to record template usage' },
      { status: 500 }
    );
  }
}
