
import { SignUpForm } from '@/components/auth/signup-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | AI Extraction OS',
  description: 'Create your AI Extraction Operating System account',
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Join Reactiiv Media</h1>
          <p className="text-gray-300">Transform your expertise into profitable products</p>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}
