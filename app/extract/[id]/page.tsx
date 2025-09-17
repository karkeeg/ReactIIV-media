
import { getServerSession } from 'next-auth';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { ExtractionClient } from '@/components/extraction/extraction-client';

export const dynamic = "force-dynamic";

interface ExtractionPageProps {
  params: {
    id: string;
  };
}

export default async function ExtractionPage({ params }: ExtractionPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/auth/signin');
  }

  const extraction = await prisma.extraction.findFirst({
    where: {
      id: params.id,
      userId: session.user.id
    }
  });

  if (!extraction) {
    notFound();
  }

  return <ExtractionClient extraction={extraction} />;
}
