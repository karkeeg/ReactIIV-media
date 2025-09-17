
'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Target, 
  File, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Sparkles,
  TrendingUp,
  User,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ExtendedUser } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardNavProps {
  user: ExtendedUser;
}

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'New Extraction', href: '/extract/new', icon: Brain },
  { label: 'My Extractions', href: '/extractions', icon: TrendingUp },
  { label: 'Products', href: '/products', icon: Target },
  { label: 'Templates', href: '/templates', icon: File },
  { label: 'Profile', href: '/profile', icon: User }
];

export function DashboardNav({ user }: DashboardNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-slate-900/80 border-b border-gray-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center space-x-3 group">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-110 transition-transform">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="text-xl font-bold text-white">AI Extraction OS</div>
                <div className="text-xs text-gray-400">Reactiiv Media</div>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-accent/50",
                      isActive 
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" 
                        : "text-gray-300 hover:text-white"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-white">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div className="text-xs text-gray-400">{user?.businessType}</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                  {user?.firstName?.[0] || 'U'}
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="hidden md:flex items-center space-x-2 text-gray-300 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-slate-900/95 backdrop-blur-lg border-b border-gray-800"
          >
            <div className="container mx-auto px-4 py-4">
              {/* User Info */}
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-800">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                  {user?.firstName?.[0] || 'U'}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div className="text-xs text-gray-400">{user?.businessType}</div>
                </div>
              </div>

              {/* Navigation Items */}
              <div className="space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                        isActive 
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" 
                          : "text-gray-300 hover:text-white hover:bg-accent/50"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Sign Out */}
              <div className="mt-6 pt-4 border-t border-gray-800">
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="w-full justify-start text-gray-300 hover:text-white"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign Out
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
