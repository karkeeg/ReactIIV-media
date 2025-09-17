
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Target, 
  Users, 
  Zap,
  Lightbulb,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Clock
} from 'lucide-react';

interface NewExtractionClientProps {
  userId: string;
}

const niches = [
  'Health & Wellness',
  'Business & Entrepreneurship',
  'Productivity & Time Management',
  'Parenting & Relationships',
  'Personal Development',
  'AI & Technology',
  'Creative Hobbies',
  'Financial Management'
];

export function NewExtractionClient({ userId }: NewExtractionClientProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    niche: '',
    targetAudience: '',
    transformation: '',
    timeframe: '60',
    expertise: ''
  });
  const router = useRouter();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const createExtraction = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/extractions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Extraction created!',
          description: 'Starting your AI extraction session...',
          variant: 'default'
        });
        router.push(`/extract/${data.extraction.id}`);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast({
        title: 'Failed to create extraction',
        description: 'Please try again',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">New AI Extraction</h1>
              <p className="text-gray-300">Let's identify your unique expertise and create a profitable product</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Product Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., The 15-Minute Perfect Morning Routine"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="niche">Choose Your Niche</Label>
                <Select value={formData.niche} onValueChange={(value) => handleInputChange('niche', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a niche" />
                  </SelectTrigger>
                  <SelectContent>
                    {niches.map((niche) => (
                      <SelectItem key={niche} value={niche}>
                        {niche}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="expertise">Your Expertise in This Area</Label>
                <Textarea
                  id="expertise"
                  placeholder="Describe your knowledge, experience, or skills in this niche..."
                  value={formData.expertise}
                  onChange={(e) => handleInputChange('expertise', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Define Your Target Audience</h2>
              <p className="text-gray-300">Who specifically will this product help?</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Textarea
                  id="targetAudience"
                  placeholder="e.g., Busy working professionals who struggle with morning routines and want to start their day with more energy and focus..."
                  value={formData.targetAudience}
                  onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-300 mb-1">Pro Tip</h4>
                    <p className="text-sm text-gray-300">The more specific you are about your audience's pain points and desires, the more valuable your product will be to them.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Define the Transformation</h2>
              <p className="text-gray-300">What specific outcome will your product deliver?</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="transformation">Transformation Promise</Label>
                <Textarea
                  id="transformation"
                  placeholder="e.g., Transform from chaotic, stressful mornings to energized, focused, productive days in just 15 minutes..."
                  value={formData.transformation}
                  onChange={(e) => handleInputChange('transformation', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="timeframe">Timeframe for Results</Label>
                <Select value={formData.timeframe} onValueChange={(value) => handleInputChange('timeframe', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="1440">1 day</SelectItem>
                    <SelectItem value="10080">1 week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                  <Clock className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <div className="text-sm font-medium text-green-300">Quick Win Focus</div>
                  <div className="text-xs text-gray-400">Immediate value</div>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
                  <Sparkles className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-sm font-medium text-purple-300">Transformation</div>
                  <div className="text-xs text-gray-400">Measurable results</div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.title && formData.niche && formData.expertise;
      case 2:
        return formData.targetAudience;
      case 3:
        return formData.transformation && formData.timeframe;
      default:
        return false;
    }
  };

  const progress = (step / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AI Extraction OS</h1>
                <p className="text-sm text-gray-400">Create your profitable product</p>
              </div>
            </div>
            <Badge variant="outline">
              Step {step} of 3
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                {renderStepContent()}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
              >
                Previous
              </Button>

              {step < 3 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="flex items-center"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={createExtraction}
                  disabled={!canProceed() || isLoading}
                  className="flex items-center"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      Start AI Extraction
                      <Zap className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What You'll Get</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-white">6-Pillar Product Structure</div>
                    <div className="text-sm text-gray-400">Complete framework ready for sale</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-white">Sales Page Content</div>
                    <div className="text-sm text-gray-400">Converting copy and materials</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-white">Bonus Materials</div>
                    <div className="text-sm text-gray-400">Templates and resources</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-white">Pricing Strategy</div>
                    <div className="text-sm text-gray-400">Optimized for maximum profit</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Success Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">$6M+</div>
                  <div className="text-sm text-gray-400">Revenue Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">15,000+</div>
                  <div className="text-sm text-gray-400">Products Created</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">60 min</div>
                  <div className="text-sm text-gray-400">Average Creation Time</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
