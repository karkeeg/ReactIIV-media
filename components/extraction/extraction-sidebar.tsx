
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Clock, 
  Target, 
  DollarSign,
  Users,
  Star,
  Eye,
  Download
} from 'lucide-react';
import { Extraction } from '@prisma/client';

interface ExtractionSidebarProps {
  extraction: Extraction;
  currentStep: number;
  steps: Array<{
    id: number;
    title: string;
    description: string;
    icon: any;
    estimatedTime: number;
  }>;
}

export function ExtractionSidebar({ extraction, currentStep, steps }: ExtractionSidebarProps) {
  const progress = ((currentStep - 1) / steps.length) * 100;
  const completedSteps = currentStep - 1;
  const totalTime = steps.reduce((sum, step) => sum + step.estimatedTime, 0);
  const remainingTime = steps
    .filter(step => step.id >= currentStep)
    .reduce((sum, step) => sum + step.estimatedTime, 0);

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Target className="h-5 w-5 mr-2 text-purple-400" />
            Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Overall Progress</span>
              <span className="text-white">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-green-500/10 rounded-lg p-3">
              <div className="text-lg font-bold text-green-400">{completedSteps}</div>
              <div className="text-xs text-gray-400">Steps Done</div>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-3">
              <div className="text-lg font-bold text-purple-400">{steps.length - completedSteps}</div>
              <div className="text-xs text-gray-400">Remaining</div>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-800">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-400">
                <Clock className="h-4 w-4 mr-1" />
                Time Left
              </div>
              <div className="text-white font-medium">{remainingTime} min</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Product Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="text-sm text-gray-400 mb-1">Title</div>
            <div className="text-white font-medium">{extraction.title}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-1">Niche</div>
            <Badge variant="outline">{extraction.niche}</Badge>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-1">Target Audience</div>
            <div className="text-sm text-white">{extraction.targetAudience}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-1">Transformation</div>
            <div className="text-sm text-white">{extraction.transformation}</div>
          </div>
        </CardContent>
      </Card>

      {/* Steps Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Steps Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                  step.id < currentStep
                    ? 'bg-green-500/10 border border-green-500/20'
                    : step.id === currentStep
                      ? 'bg-purple-500/10 border border-purple-500/20'
                      : 'bg-gray-800/30'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  step.id < currentStep
                    ? 'bg-green-500 text-white'
                    : step.id === currentStep
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-600 text-gray-400'
                }`}>
                  {step.id < currentStep ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <step.icon className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-medium ${
                    step.id <= currentStep ? 'text-white' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {step.estimatedTime} min
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-400" />
            Success Potential
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-green-400 mr-2" />
                <span className="text-sm text-gray-400">Revenue Potential</span>
              </div>
              <Badge variant="success">$10K+</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Users className="h-4 w-4 text-blue-400 mr-2" />
                <span className="text-sm text-gray-400">Market Demand</span>
              </div>
              <Badge variant="outline">High</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Target className="h-4 w-4 text-purple-400 mr-2" />
                <span className="text-sm text-gray-400">Competition</span>
              </div>
              <Badge variant="secondary">Medium</Badge>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-800">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">85%</div>
              <div className="text-sm text-gray-400">Success Probability</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={() => {
              // Create preview window with current progress
              const previewWindow = window.open('', '_blank');
              if (previewWindow) {
                previewWindow.document.write(`
                  <html>
                    <head>
                      <title>Product Preview - ${extraction.title}</title>
                      <style>
                        body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                        h1 { color: #6366f1; }
                        .section { margin: 20px 0; padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px; }
                      </style>
                    </head>
                    <body>
                      <h1>${extraction.title}</h1>
                      <div class="section">
                        <h2>Niche</h2>
                        <p>${extraction.niche || 'Not specified'}</p>
                      </div>
                      <div class="section">
                        <h2>Target Audience</h2>
                        <p>${extraction.targetAudience || 'Not specified'}</p>
                      </div>
                      <div class="section">
                        <h2>Transformation Promise</h2>
                        <p>${extraction.transformation || 'Not specified'}</p>
                      </div>
                      <div class="section">
                        <h2>Progress</h2>
                        <p>Step ${extraction.currentStep}/8 - ${extraction.isComplete ? 'Complete' : 'In Progress'}</p>
                      </div>
                    </body>
                  </html>
                `);
                previewWindow.document.close();
              }
            }}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview Product
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={() => {
              // Create export data
              const exportData = {
                extraction: {
                  title: extraction.title,
                  niche: extraction.niche,
                  targetAudience: extraction.targetAudience,
                  transformation: extraction.transformation,
                  currentStep: extraction.currentStep,
                  isComplete: extraction.isComplete,
                  sixPillars: extraction.sixPillars,
                  percMethod: extraction.percMethod,
                  resources: extraction.resources,
                  salesPage: extraction.salesPage,
                  createdAt: extraction.createdAt,
                  updatedAt: extraction.updatedAt
                },
                exportedAt: new Date().toISOString(),
                format: 'JSON'
              };
              
              // Create download link
              const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `extraction-${extraction.title.toLowerCase().replace(/\s+/g, '-')}-progress.json`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Current Progress
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
