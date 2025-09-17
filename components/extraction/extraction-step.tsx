
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  Target, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Lightbulb,
  Loader2,
  RefreshCw,
  Copy,
  Download
} from 'lucide-react';
import { Extraction } from '@prisma/client';
import { SixPillar, PERCMethod } from '@/lib/types';

interface ExtractionStepProps {
  step: number;
  extraction: Extraction;
  onStepComplete: (step: number, data?: any) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function ExtractionStep({ step, extraction, onStepComplete, isLoading, setIsLoading }: ExtractionStepProps) {
  const [streamingText, setStreamingText] = useState('');
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const startAIExtraction = async () => {
    setIsLoading(true);
    setStreamingText('');
    setProgress(0);
    setIsComplete(false);

    try {
      const response = await fetch(`/api/extractions/${extraction.id}/ai-process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step })
      });

      if (!response.ok) {
        throw new Error('Failed to start AI processing');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let partialData = '';

      if (!reader) {
        throw new Error('No response body');
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        partialData += decoder.decode(value, { stream: true });
        let lines = partialData.split('\n');
        partialData = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              return;
            }
            
            try {
              const parsed = JSON.parse(data);
              
              if (parsed.status === 'processing') {
                setProgress(prev => Math.min(prev + 1, 99));
                setStreamingText(prev => prev + (parsed.chunk || ''));
              } else if (parsed.status === 'completed') {
                setResult(parsed.result);
                setIsComplete(true);
                setProgress(100);
                toast({
                  title: 'Step completed!',
                  description: 'AI processing finished successfully',
                  variant: 'default'
                });
              } else if (parsed.status === 'error') {
                throw new Error(parsed.message || 'AI processing failed');
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error('AI extraction error:', error);
      toast({
        title: 'AI processing failed',
        description: 'Please try again',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const proceedToNext = async () => {
    if (result) {
      await onStepComplete(step + 1, result);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Copied!',
        description: 'Content copied to clipboard',
        variant: 'default'
      });
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">AI Product Extraction</h2>
              <p className="text-gray-300">
                Our AI will analyze your input and generate a complete 6-pillar product structure
              </p>
            </div>

            {!isLoading && !result && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-300 mb-2">About to generate:</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Complete 6-pillar product framework</li>
                      <li>• Quick-win actions for each pillar</li>
                      <li>• Scientific backing and examples</li>
                      <li>• Step-by-step implementation plans</li>
                      <li>• Ready-to-use templates and resources</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">AI Processing Progress</span>
                  <span className="text-sm text-gray-400">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Loader2 className="h-4 w-4 animate-spin text-purple-400 mr-2" />
                    <span className="text-sm text-gray-400">AI is thinking...</span>
                  </div>
                  {streamingText && (
                    <div className="text-sm text-gray-300 whitespace-pre-wrap max-h-40 overflow-y-auto">
                      {streamingText}
                    </div>
                  )}
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    <span className="text-green-300 font-medium">6-Pillar Structure Generated!</span>
                  </div>
                </div>

                {result.pillars && result.pillars.length > 0 && (
                  <div className="space-y-4">
                    {result.pillars.map((pillar: SixPillar, index: number) => (
                      <Card key={index} className="bg-slate-800/50">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">
                              Pillar {index + 1}: {pillar.title}
                            </CardTitle>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(`${pillar.title}\n\n${pillar.description}\n\nQuick Win: ${pillar.quickWin}`)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                          <CardDescription>{pillar.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Badge variant="success" className="mb-2">Quick Win</Badge>
                            <p className="text-sm text-gray-300">{pillar.quickWin}</p>
                          </div>
                          <div>
                            <Badge variant="outline" className="mb-2">Why It Works</Badge>
                            <p className="text-sm text-gray-300">{pillar.whyItWorks}</p>
                          </div>
                          {pillar.stepByStep && pillar.stepByStep.length > 0 && (
                            <div>
                              <Badge variant="secondary" className="mb-2">Steps</Badge>
                              <ul className="text-sm text-gray-300 list-disc list-inside space-y-1">
                                {pillar.stepByStep.map((step, idx) => (
                                  <li key={idx}>{step}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-center space-x-4">
              {!isLoading && !result && (
                <Button onClick={startAIExtraction} size="lg" className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Start AI Extraction
                </Button>
              )}

              {result && (
                <Button onClick={proceedToNext} size="lg" className="flex items-center">
                  Continue to Next Step
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              )}

              {isLoading && (
                <Button disabled size="lg" className="flex items-center">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Processing...
                </Button>
              )}
            </div>
          </div>
        );

      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-white mb-2">Step {step} Processing</h2>
              <p className="text-gray-300">
                AI is working on the next phase of your product creation
              </p>
            </div>

            {!isLoading && !result && (
              <div className="text-center">
                <Button onClick={startAIExtraction} size="lg" className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Continue Processing
                </Button>
              </div>
            )}

            {isLoading && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Processing...</span>
                  <span className="text-sm text-gray-400">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    <span className="text-green-300 font-medium">Step Complete!</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button onClick={proceedToNext} size="lg" className="flex items-center">
                    Continue to Next Step
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Product Creation Complete!</h2>
              <p className="text-gray-300">
                Your profitable digital product is ready for launch
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10">
                <CardContent className="p-6 text-center">
                  <Target className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <h3 className="font-bold text-white">Product Ready</h3>
                  <p className="text-sm text-gray-400">Complete 6-pillar structure</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                <CardContent className="p-6 text-center">
                  <Download className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <h3 className="font-bold text-white">Export Ready</h3>
                  <p className="text-sm text-gray-400">Download all materials</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center space-y-4">
              <Button size="lg" className="flex items-center">
                <Download className="h-5 w-5 mr-2" />
                Download Complete Product
              </Button>
              <Button variant="outline" size="lg">
                View Product Dashboard
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {renderStepContent()}
    </motion.div>
  );
}
