
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardNav } from '@/components/dashboard/dashboard-nav';
import { useSession } from 'next-auth/react';
import { Target, Plus, Eye, Download, Edit, Calendar } from 'lucide-react';
import { Product, Extraction } from '@prisma/client';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface ProductWithExtraction extends Product {
  extraction: Extraction;
}

interface ProductsClientProps {
  products: ProductWithExtraction[];
}

export function ProductsClient({ products }: ProductsClientProps) {
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
                <Target className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">My Products</h1>
                <p className="text-gray-300">Manage your created digital products</p>
              </div>
            </div>
            
            <Button asChild size="lg" className="flex items-center">
              <Link href="/extract/new">
                <Plus className="h-5 w-5 mr-2" />
                Create New Product
              </Link>
            </Button>
          </div>
        </motion.div>

        {products.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={
                        product.status === 'launched' ? 'success' :
                        product.status === 'ready' ? 'default' : 'secondary'
                      }>
                        {product.status}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(product.updatedAt)}
                      </div>
                    </div>
                    
                    <CardTitle className="text-xl">{product.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {product.description || 'No description available'}
                    </CardDescription>
                    
                    <div className="flex items-center space-x-2 mt-3">
                      <Badge variant="outline">
                        {product.extraction.niche}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-sm text-gray-300">
                        <div className="font-medium mb-1">Target Audience:</div>
                        <div className="line-clamp-2">{product.extraction.targetAudience}</div>
                      </div>
                      
                      <div className="text-sm text-gray-300">
                        <div className="font-medium mb-1">Transformation:</div>
                        <div className="line-clamp-2">{product.extraction.transformation}</div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No products yet</h3>
            <p className="text-gray-400 mb-6">
              Create your first digital product using AI extraction
            </p>
            <Button asChild size="lg">
              <Link href="/extract/new">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Product
              </Link>
            </Button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
