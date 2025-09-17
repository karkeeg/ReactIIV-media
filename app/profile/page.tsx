
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { ProfileClient } from '@/components/profile/profile-client';

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/auth/signin');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      progress: true,
      extractions: { include: { products: true } },
      products: true
    }
  });

  if (!user) {
    redirect('/auth/signin');
  }

  return <ProfileClient user={user} />;
}
