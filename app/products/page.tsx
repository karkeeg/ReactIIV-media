
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { ProductsClient } from '@/components/products/products-client';

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/auth/signin');
  }

  const products = await prisma.product.findMany({
    where: { userId: session.user.id },
    include: {
      extraction: true
    },
    orderBy: { updatedAt: 'desc' }
  });

  return <ProductsClient products={products} />;
}
