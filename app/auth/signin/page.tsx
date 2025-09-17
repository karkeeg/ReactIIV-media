
import { SignInForm } from '@/components/auth/signin-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | AI Extraction OS',
  description: 'Sign in to your AI Extraction Operating System account',
};

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-300">Sign in to continue your extraction journey</p>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}
