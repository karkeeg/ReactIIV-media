
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { TemplateGalleryClient } from '@/components/templates/template-gallery-client';

export const dynamic = "force-dynamic";

export default async function TemplatesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/auth/signin');
  }

  const templates = await prisma.template.findMany({
    orderBy: [
      { isPopular: 'desc' },
      { usageCount: 'desc' },
      { createdAt: 'desc' }
    ]
  });

  return <TemplateGalleryClient templates={templates} />;
}
