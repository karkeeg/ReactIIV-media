
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { ExtractionsClient } from '@/components/extractions/extractions-client';

export const dynamic = "force-dynamic";

export default async function ExtractionsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/auth/signin');
  }

  const extractions = await prisma.extraction.findMany({
    where: { userId: session.user.id },
    include: {
      products: true
    },
    orderBy: { updatedAt: 'desc' }
  });

  return <ExtractionsClient extractions={extractions} />;
}
