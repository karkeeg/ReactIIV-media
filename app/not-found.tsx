import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 text-center">
      <h1 className="text-4xl font-bold text-white mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-gray-300 mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Button asChild variant="default">
        <Link href="/" className="px-6 py-3 text-lg">
          Return Home
        </Link>
      </Button>
    </div>
  );
}

export const dynamic = 'force-static';
