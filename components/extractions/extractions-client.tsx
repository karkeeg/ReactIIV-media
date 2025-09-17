
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DashboardNav } from '@/components/dashboard/dashboard-nav';
import { useSession } from 'next-auth/react';
import { Brain, Plus, Play, CheckCircle, Calendar, Clock } from 'lucide-react';
import { Extraction, Product } from '@prisma/client';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface ExtractionWithProducts extends Extraction {
  products: Product[];
}

interface ExtractionsClientProps {
  extractions: ExtractionWithProducts[];
}

export function ExtractionsClient({ extractions }: ExtractionsClientProps) {
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <DashboardNav user={session?.user as any} />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">My Extractions</h1>
                <p className="text-gray-300">Track your AI extraction progress</p>
              </div>
            </div>
            
            <Button asChild size="lg" className="flex items-center">
              <Link href="/extract/new">
                <Plus className="h-5 w-5 mr-2" />
                New Extraction
              </Link>
            </Button>
          </div>
        </motion.div>

        {extractions.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-6">
            {extractions.map((extraction, index) => {
              const progress = (extraction.currentStep / 8) * 100;
              
              return (
                <motion.div
                  key={extraction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:scale-105 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={extraction.isComplete ? 'success' : 'secondary'}>
                          {extraction.isComplete ? 'Completed' : `Step ${extraction.currentStep}/8`}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-400">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(extraction.updatedAt)}
                        </div>
                      </div>
                      
                      <CardTitle className="text-xl">{extraction.title}</CardTitle>
                      <CardDescription>
                        {extraction.niche && (
                          <Badge variant="outline" className="mr-2">
                            {extraction.niche}
                          </Badge>
                        )}
                        {extraction.products.length > 0 && (
                          <span className="text-green-400">
                            {extraction.products.length} product{extraction.products.length > 1 ? 's' : ''} created
                          </span>
                        )}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-white">{Math.round(progress)}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                        
                        {extraction.targetAudience && (
                          <div className="text-sm text-gray-300">
                            <div className="font-medium mb-1">Target Audience:</div>
                            <div className="line-clamp-2">{extraction.targetAudience}</div>
                          </div>
                        )}
                        
                        {extraction.transformation && (
                          <div className="text-sm text-gray-300">
                            <div className="font-medium mb-1">Transformation:</div>
                            <div className="line-clamp-2">{extraction.transformation}</div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between pt-2">
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/extract/${extraction.id}`}>
                              {extraction.isComplete ? (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  View Results
                                </>
                              ) : (
                                <>
                                  <Play className="h-4 w-4 mr-2" />
                                  Continue
                                </>
                              )}
                            </Link>
                          </Button>
                          
                          {extraction.products.length > 0 && (
                            <Button asChild variant="ghost" size="sm">
                              <Link href="/products">
                                View Products
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No extractions yet</h3>
            <p className="text-gray-400 mb-6">
              Start your first AI extraction to create profitable products
            </p>
            <Button asChild size="lg">
              <Link href="/extract/new">
                <Plus className="h-4 w-4 mr-2" />
                Start First Extraction
              </Link>
            </Button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
