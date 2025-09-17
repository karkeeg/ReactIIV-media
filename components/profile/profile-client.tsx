
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DashboardNav } from '@/components/dashboard/dashboard-nav';
import { useToast } from '@/hooks/use-toast';
import { useSession } from 'next-auth/react';
import { User, Star, Target, Brain, Calendar, Save } from 'lucide-react';
import { User as PrismaUser, UserProgress, Extraction, Product } from '@prisma/client';
import { getBusinessTypeColor, getExperienceLevel, formatDate, formatTime } from '@/lib/utils';

interface ExtendedUserWithAll extends PrismaUser {
  progress?: UserProgress | null;
  extractions: Array<Extraction & { products: Product[] }>;
  products: Product[];
}

interface ProfileClientProps {
  user: ExtendedUserWithAll;
}

export function ProfileClient({ user }: ProfileClientProps) {
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    businessType: user.businessType || 'Entrepreneur',
    experience: user.experience || 'Beginner'
  });
  const { data: session, update } = useSession();
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Profile updated!',
          description: 'Your profile has been saved successfully',
          variant: 'default'
        });
        setIsEditing(false);
        
        // Update session
        await update({
          ...session,
          user: {
            ...session?.user,
            name: `${formData.firstName} ${formData.lastName}`,
            businessType: formData.businessType,
            experience: formData.experience
          }
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast({
        title: 'Update failed',
        description: 'Please try again',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
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

  const stats = [
    {
      label: 'Extractions Completed',
      value: user.progress?.completedExtractions || 0,
      icon: Brain,
      color: 'text-purple-500'
    },
    {
      label: 'Products Created',
      value: user.products.length,
      icon: Target,
      color: 'text-blue-500'
    },
    {
      label: 'Time in System',
      value: formatTime(user.progress?.timeInSystem || 0),
      icon: Calendar,
      color: 'text-green-500'
    },
    {
      label: 'Success Rate',
      value: `${Math.round((user.progress?.completedExtractions || 0) / Math.max(1, user.extractions.length) * 100)}%`,
      icon: Star,
      color: 'text-yellow-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <DashboardNav user={session?.user as any} />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
              <p className="text-gray-300">Manage your account and preferences</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your profile details</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getBusinessTypeColor(user.businessType || '')}>
                      {user.businessType}
                    </Badge>
                    <Badge variant="outline">
                      {getExperienceLevel(user.experience || '')} {user.experience}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user.email || ''}
                    disabled
                    className="opacity-50"
                  />
                  <p className="text-xs text-gray-400">Email cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select 
                    value={formData.businessType}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, businessType: value }))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Entrepreneur">Entrepreneur</SelectItem>
                      <SelectItem value="Coach">Coach</SelectItem>
                      <SelectItem value="Content Creator">Content Creator</SelectItem>
                      <SelectItem value="Consultant">Consultant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level</Label>
                  <Select 
                    value={formData.experience}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-2">
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button onClick={handleSave} disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            firstName: user.firstName || '',
                            lastName: user.lastName || '',
                            businessType: user.businessType || 'Entrepreneur',
                            experience: user.experience || 'Beginner'
                          });
                        }}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {stats.map((stat, index) => (
              <Card key={index}>
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
            ))}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Member Since</span>
                    <span className="text-sm text-white">{formatDate(user.createdAt)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Last Active</span>
                    <span className="text-sm text-white">
                      {user.progress?.lastActiveAt ? formatDate(user.progress.lastActiveAt) : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Onboarding</span>
                    <Badge variant={user.onboardingCompleted ? 'success' : 'secondary'}>
                      {user.onboardingCompleted ? 'Complete' : 'Pending'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
