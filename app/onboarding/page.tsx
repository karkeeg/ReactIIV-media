
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { OnboardingClient } from '@/components/onboarding/onboarding-client';

export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/auth/signin');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { progress: true }
  });

  if (user?.onboardingCompleted) {
    redirect('/dashboard');
  }

  // Create extended user type with proper typing
  const extendedUser = user ? {
    ...user,
    progress: user.progress || undefined,
    extractions: [],
    products: []
  } : null;

  return <OnboardingClient user={extendedUser} />;
}
