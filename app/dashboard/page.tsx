
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { DashboardClient } from '@/components/dashboard/dashboard-client';

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/auth/signin');
  }

  // Check if user needs onboarding
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      progress: true,
      extractions: {
        orderBy: { updatedAt: 'desc' },
        take: 5
      },
      products: {
        orderBy: { updatedAt: 'desc' },
        take: 3
      }
    }
  });

  if (!user?.onboardingCompleted) {
    redirect('/onboarding');
  }

  // Create extended user type with proper typing
  const extendedUser = {
    ...user,
    progress: user.progress || undefined,
    extractions: user.extractions || [],
    products: user.products || []
  };

  return <DashboardClient user={extendedUser} />;
}
