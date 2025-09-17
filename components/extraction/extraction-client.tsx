
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ExtractionStep } from './extraction-step';
import { ExtractionSidebar } from './extraction-sidebar';
import { 
  Brain, 
  Target, 
  Lightbulb, 
  FileText, 
  DollarSign, 
  Gift, 
  ShoppingCart,
  Package,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { Extraction } from '@prisma/client';

interface ExtractionClientProps {
  extraction: Extraction;
}

const extractionSteps = [
  {
    id: 1,
    title: 'Product Extraction',
    description: 'Generate your 6-pillar product structure using AI',
    icon: Brain,
    estimatedTime: 15
  },
  {
    id: 2,
    title: 'Content Expansion',
    description: 'Develop detailed content for each pillar',
    icon: FileText,
    estimatedTime: 10
  },
  {
    id: 3,
    title: 'PERC Method Integration',
    description: 'Apply the Plan, Eliminate, Replace, Create framework',
    icon: Target,
    estimatedTime: 8
  },
  {
    id: 4,
    title: 'Resource Creation',
    description: 'Generate templates, checklists, and supporting materials',
    icon: Package,
    estimatedTime: 12
  },
  {
    id: 5,
    title: 'Sales Page Generation',
    description: 'Create converting sales copy and marketing materials',
    icon: ShoppingCart,
    estimatedTime: 10
  },
  {
    id: 6,
    title: 'Bonus Materials',
    description: 'Add value-boosting complementary bonuses',
    icon: Gift,
    estimatedTime: 8
  },
  {
    id: 7,
    title: 'Pricing Strategy',
    description: 'Optimize pricing and upsell structure',
    icon: DollarSign,
    estimatedTime: 5
  },
  {
    id: 8,
    title: 'Final Package',
    description: 'Complete product ready for launch',
    icon: CheckCircle,
    estimatedTime: 2
  }
];

export function ExtractionClient({ extraction }: ExtractionClientProps) {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(extraction.currentStep);
  const [isLoading, setIsLoading] = useState(false);
  const [extractionData, setExtractionData] = useState(extraction);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateExtractionStep = async (step: number, data?: any) => {
    try {
      const response = await fetch(`/api/extractions/${extraction.id}/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step, data })
      });

      const result = await response.json();
      if (result.success) {
        setCurrentStep(step);
        setExtractionData(prev => ({ ...prev, ...result.extraction }));
      }
    } catch (error) {
      console.error('Failed to update extraction:', error);
      toast({
        title: 'Update failed',
        description: 'Please try again',
        variant: 'destructive'
      });
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-pulse">
        <div className="flex items-center justify-center h-screen">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const currentStepData = extractionSteps.find(step => step.id === currentStep);
  const progress = ((currentStep - 1) / extractionSteps.length) * 100;
  const totalEstimatedTime = extractionSteps.reduce((sum, step) => sum + step.estimatedTime, 0);
  const completedTime = extractionSteps
    .filter(step => step.id < currentStep)
    .reduce((sum, step) => sum + step.estimatedTime, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{extractionData.title}</h1>
                  <p className="text-gray-400">{extractionData.niche}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-400">Estimated Time Remaining</div>
                <div className="text-lg font-semibold text-white">
                  {totalEstimatedTime - completedTime} min
                </div>
              </div>
              <Badge variant={extractionData.isComplete ? 'success' : 'secondary'}>
                {extractionData.isComplete ? 'Complete' : `Step ${currentStep}/8`}
              </Badge>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Steps Overview */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mt-6">
            {extractionSteps.map((step) => (
              <div key={step.id} className="text-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step.id < currentStep 
                    ? 'bg-green-500 text-white' 
                    : step.id === currentStep 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-gray-700 text-gray-400'
                }`}>
                  {step.id < currentStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <div className="text-xs text-gray-400 hidden md:block">{step.title}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  {currentStepData && (
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                      <currentStepData.icon className="h-6 w-6 text-white" />
                    </div>
                  )}
                  <div>
                    <CardTitle>{currentStepData?.title}</CardTitle>
                    <CardDescription className="flex items-center">
                      {currentStepData?.description}
                      <Clock className="h-4 w-4 ml-2 mr-1" />
                      <span>{currentStepData?.estimatedTime} min</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ExtractionStep
                      step={currentStep}
                      extraction={extractionData}
                      onStepComplete={updateExtractionStep}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                    />
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ExtractionSidebar 
              extraction={extractionData} 
              currentStep={currentStep}
              steps={extractionSteps}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
