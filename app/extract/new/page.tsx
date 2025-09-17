
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth-options';
import { NewExtractionClient } from '@/components/extraction/new-extraction-client';

export const dynamic = "force-dynamic";

export default async function NewExtractionPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/auth/signin');
  }

  return <NewExtractionClient userId={session.user.id} />;
}
