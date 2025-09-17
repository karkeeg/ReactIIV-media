
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './db';
import bcrypt from 'bcryptjs';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      businessType?: string | null;
      experience?: string | null;
      onboardingCompleted?: boolean;
    }
  }
  
  interface User {
    id: string;
    email?: string | null;
    name?: string | null;
    businessType?: string | null;
    experience?: string | null;
    onboardingCompleted?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    businessType?: string | null;
    experience?: string | null;
    onboardingCompleted?: boolean;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { progress: true }
        });

        if (!user || !user.password) {
          throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid credentials');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          firstName: user.firstName,
          lastName: user.lastName,
          businessType: user.businessType,
          experience: user.experience,
          onboardingCompleted: user.onboardingCompleted,
        };
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth/signin'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.businessType = (user as any).businessType;
        token.experience = (user as any).experience;
        token.onboardingCompleted = (user as any).onboardingCompleted;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.businessType = token.businessType;
        session.user.experience = token.experience;
        session.user.onboardingCompleted = token.onboardingCompleted;
      }
      return session;
    }
  }
};
