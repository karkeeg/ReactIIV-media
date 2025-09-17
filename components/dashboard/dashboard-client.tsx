
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DashboardNav } from './dashboard-nav';
import { 
  Brain, 
  Target, 
  Clock, 
  Zap, 
  TrendingUp, 
  Star,
  Play,
  Plus
} from 'lucide-react';
import Link from 'next/link';
import { ExtendedUser } from '@/lib/types';
import { getBusinessTypeColor, getExperienceLevel, formatTime } from '@/lib/utils';

interface DashboardClientProps {
  user: ExtendedUser;
}

export function DashboardClient({ user }: DashboardClientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-pulse">
        <div className="flex items-center justify-center h-screen">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const progress = user?.progress;
  const completionRate = progress ? Math.round((progress.completedExtractions / Math.max(1, progress.completedExtractions + 1)) * 100) : 0;

  const stats = [
    {
      label: 'Extractions Completed',
      value: progress?.completedExtractions || 0,
      icon: Brain,
      color: 'text-purple-500'
    },
    {
      label: 'Products Created',
      value: progress?.completedProducts || 0,
      icon: Target,
      color: 'text-blue-500'
    },
    {
      label: 'Time in System',
      value: formatTime(progress?.timeInSystem || 0),
      icon: Clock,
      color: 'text-green-500'
    },
    {
      label: 'Success Rate',
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: 'text-yellow-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <DashboardNav user={user} />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {user?.firstName || 'Creator'}!
              </h1>
              <p className="text-gray-300 text-lg">
                Ready to extract your next profitable product?
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <Badge className={getBusinessTypeColor(user?.businessType || '')}>
                {user?.businessType}
              </Badge>
              <Badge variant="outline">
                {getExperienceLevel(user?.experience || '')} {user?.experience}
              </Badge>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      <div className="text-2xl font-bold text-white">
                        {stat.value}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-purple-400" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Jump right into creating your next product
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button asChild size="lg" className="h-auto p-6 flex-col group">
                  <Link href="/extract/new">
                    <Plus className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="font-semibold">New Extraction</div>
                    <div className="text-xs opacity-80">Start fresh product creation</div>
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="h-auto p-6 flex-col group">
                  <Link href="/templates">
                    <Star className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="font-semibold">Browse Templates</div>
                    <div className="text-xs opacity-80">Ready-to-use frameworks</div>
                  </Link>
                </Button>

                <Button asChild variant="outline" size="lg" className="h-auto p-6 flex-col group">
                  <Link href="/products">
                    <Target className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="font-semibold">My Products</div>
                    <div className="text-xs opacity-80">Manage existing products</div>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Extractions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-purple-400" />
                    Recent Extractions
                  </div>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/extractions">View All</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user?.extractions?.length ? (
                  <div className="space-y-4">
                    {user.extractions.map((extraction) => (
                      <div key={extraction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">{extraction.title}</h3>
                          <p className="text-sm text-gray-400 mt-1">{extraction.niche || 'No niche selected'}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant={extraction.isComplete ? 'success' : 'secondary'}>
                              Step {extraction.currentStep}/8
                            </Badge>
                            {extraction.isComplete && (
                              <Badge variant="success">
                                <Star className="h-3 w-3 mr-1" />
                                Complete
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={(extraction.currentStep / 8) * 100} 
                            className="w-20"
                          />
                          <Button asChild size="sm">
                            <Link href={`/extract/${extraction.id}`}>
                              {extraction.isComplete ? 'View' : 'Continue'}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-300 mb-2">No extractions yet</h3>
                    <p className="text-gray-400 mb-4">Start your first extraction to begin creating products</p>
                    <Button asChild>
                      <Link href="/extract/new">
                        <Play className="h-4 w-4 mr-2" />
                        Start First Extraction
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                    Your Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall Completion</span>
                        <span>{completionRate}%</span>
                      </div>
                      <Progress value={completionRate} />
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="font-semibold mb-3 text-white">Current Focus</h4>
                      <div className="text-sm text-gray-400">
                        {progress?.currentStep === 'onboarding' ? (
                          'Complete your profile setup'
                        ) : (
                          `Working on ${progress?.currentStep || 'getting started'}`
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-400" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <Star className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">
                      Complete your first extraction to unlock achievements
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
