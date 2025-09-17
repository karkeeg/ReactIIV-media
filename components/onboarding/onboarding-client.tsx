
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Target, 
  Brain, 
  Rocket,
  User,
  Lightbulb,
  Users,
  CheckCircle
} from 'lucide-react';
import { ExtendedUser } from '@/lib/types';

interface OnboardingClientProps {
  user: ExtendedUser | null;
}

const onboardingSteps = [
  {
    id: 1,
    title: 'Welcome to AI Extraction OS',
    description: 'Let\'s get you set up for success',
    icon: Sparkles
  },
  {
    id: 2,
    title: 'Tell Us About Yourself',
    description: 'Help us personalize your experience',
    icon: User
  },
  {
    id: 3,
    title: 'Your Expertise Areas',
    description: 'What knowledge do you have that others need?',
    icon: Brain
  },
  {
    id: 4,
    title: 'Target Audience',
    description: 'Who do you want to help?',
    icon: Users
  },
  {
    id: 5,
    title: 'Your Goals',
    description: 'What do you want to achieve?',
    icon: Target
  },
  {
    id: 6,
    title: 'Ready to Launch',
    description: 'You\'re all set up!',
    icon: Rocket
  }
];

export function OnboardingClient({ user }: OnboardingClientProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    goals: '',
    expertise: '',
    targetAudience: '',
    challenges: '',
    experience: '',
    interests: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const completeOnboarding = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Welcome to AI Extraction OS!',
          description: 'Your profile has been set up successfully',
          variant: 'default'
        });
        router.push('/dashboard');
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast({
        title: 'Setup failed',
        description: 'Please try again',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-6"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome to AI Extraction OS
              </h2>
              <p className="text-gray-300">
                You're about to join thousands of entrepreneurs who have transformed their expertise into profitable digital products using our proven system.
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">$6M+</div>
                  <div className="text-sm text-gray-400">Revenue Generated</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">15K+</div>
                  <div className="text-sm text-gray-400">Products Created</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">60 min</div>
                  <div className="text-sm text-gray-400">To First Product</div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Tell Us About Yourself</h2>
              <p className="text-gray-300">Help us personalize your extraction experience</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="experience">What's your current experience level?</Label>
                <Textarea
                  id="experience"
                  placeholder="e.g., I'm a business coach with 5 years experience helping small businesses grow..."
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="challenges">What challenges are you facing in your business?</Label>
                <Textarea
                  id="challenges"
                  placeholder="e.g., I struggle to scale my one-on-one services, want to create passive income..."
                  value={formData.challenges}
                  onChange={(e) => handleInputChange('challenges', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Your Expertise Areas</h2>
              <p className="text-gray-300">What knowledge do you have that others desperately need?</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="expertise">What do people ask you for help with?</Label>
                <Textarea
                  id="expertise"
                  placeholder="e.g., Social media marketing, productivity systems, relationship coaching, financial planning..."
                  value={formData.expertise}
                  onChange={(e) => handleInputChange('expertise', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="interests">What topics could you teach for 30 minutes without preparation?</Label>
                <Textarea
                  id="interests"
                  placeholder="e.g., Email marketing strategies, time management, parenting techniques..."
                  value={formData.interests}
                  onChange={(e) => handleInputChange('interests', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Your Target Audience</h2>
              <p className="text-gray-300">Who specifically do you want to help with your products?</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="targetAudience">Describe your ideal customer</Label>
                <Textarea
                  id="targetAudience"
                  placeholder="e.g., Small business owners struggling to get clients, working moms who want better work-life balance..."
                  value={formData.targetAudience}
                  onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Lightbulb className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-300 mb-1">Pro Tip</h4>
                  <p className="text-sm text-gray-300">The more specific you are about your audience, the easier it will be to create products that truly resonate with them.</p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Your Goals</h2>
              <p className="text-gray-300">What do you want to achieve with AI Extraction OS?</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="goals">What are your main goals for the next 90 days?</Label>
                <Textarea
                  id="goals"
                  placeholder="e.g., Create my first digital product, generate $5K in additional monthly revenue, help 100 people..."
                  value={formData.goals}
                  onChange={(e) => handleInputChange('goals', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                <div className="text-lg font-bold text-green-400">$10K+</div>
                <div className="text-sm text-gray-400">Average first product revenue</div>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
                <div className="text-lg font-bold text-purple-400">30 days</div>
                <div className="text-sm text-gray-400">Average time to first sale</div>
              </div>
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-6"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                You're All Set!
              </h2>
              <p className="text-gray-300 mb-6">
                Your profile is ready. Time to create your first profitable product using AI extraction.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6">
              <h3 className="font-bold text-white mb-4">What happens next?</h3>
              <div className="space-y-3 text-sm text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">1</div>
                  <span className="text-gray-300">Access your personalized dashboard</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">2</div>
                  <span className="text-gray-300">Start your first AI extraction session</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">3</div>
                  <span className="text-gray-300">Create your sellable product in 60 minutes</span>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const currentStepData = onboardingSteps.find(step => step.id === currentStep);
  const progress = ((currentStep - 1) / (onboardingSteps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">
              Step {currentStep} of {onboardingSteps.length}
            </span>
            <span className="text-sm text-gray-400">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Main Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep < onboardingSteps.length ? (
            <Button
              onClick={handleNext}
              className="flex items-center"
              disabled={currentStep > 1 && !formData.experience && !formData.expertise && !formData.targetAudience && !formData.goals}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={completeOnboarding}
              disabled={isLoading}
              className="flex items-center"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Setting Up...
                </>
              ) : (
                <>
                  Complete Setup
                  <Rocket className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
