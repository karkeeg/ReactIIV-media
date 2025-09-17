
'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Zap, Target, Clock, DollarSign, Users, CheckCircle, Sparkles, Brain, Rocket, TrendingUp } from 'lucide-react';

export function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { label: 'Revenue Generated', value: '$6M+', icon: DollarSign },
    { label: 'Products Created', value: '15,000+', icon: Target },
    { label: 'Time to Product', value: '60 min', icon: Clock },
    { label: 'Success Rate', value: '90%+', icon: TrendingUp }
  ];

  const features = [
    {
      title: '7-Figure Product Extraction',
      description: 'Use our proven 8-step system to extract sellable products from your expertise',
      icon: Brain,
      benefits: ['AI-powered prompts', 'Step-by-step guidance', 'Instant product ideas']
    },
    {
      title: 'PERC Method Framework',
      description: 'Plan, Eliminate, Replace, Create - the systematic approach to transformation',
      icon: Target,
      benefits: ['Clear methodology', 'Proven results', 'Easy implementation']
    },
    {
      title: '6-Pillar Product Structure',
      description: 'Build comprehensive products with our battle-tested framework',
      icon: Rocket,
      benefits: ['Complete structure', 'Professional quality', 'Market-ready format']
    },
    {
      title: 'Template Gallery',
      description: 'Access hundreds of templates, scripts, and ready-to-use materials',
      icon: Sparkles,
      benefits: ['Sales pages', 'Email sequences', 'Marketing materials']
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Business Coach',
      content: 'Went from idea to $10K in sales in just 30 days. The system works exactly as promised.',
      revenue: '$47K in 90 days'
    },
    {
      name: 'Mike Chen',
      role: 'Content Creator',
      content: 'Finally turned my expertise into a scalable business. The templates saved me months of work.',
      revenue: '$23K first month'
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Consultant',
      content: 'The 6-pillar framework helped me create my best-selling course. Clear, actionable, profitable.',
      revenue: '$85K launch'
    }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center px-4"
        style={{ y: y1 }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJtLTEwIDMwaDYwdjJoLTYweiIgZmlsbD0iIzMzMzM0NCIgZmlsbC1vcGFjaXR5PSIwLjAzIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')] opacity-20"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              Powered by Reactiiv Media
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                AI Extraction
              </span>
              <br />
              <span className="text-white">Operating System</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Transform from <span className="text-purple-400 font-semibold">zero to sellable digital product</span> in 60 minutes using our proven AI-powered extraction system
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button asChild size="xl" className="group">
              <Link href="/auth/signup">
                Start Your Extraction Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link href="/auth/signin">
                Sign In
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/20 mb-2">
                  <stat.icon className="h-6 w-6 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-24 px-4"
        style={{ y: y2 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need to <span className="text-purple-400">Succeed</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our comprehensive system provides all the tools, templates, and guidance you need to create profitable digital products
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full group hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 mr-4">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Real Results from <span className="text-purple-400">Real People</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of entrepreneurs who have transformed their expertise into profitable products
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-4">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                    <Badge variant="success" className="w-fit mb-4">
                      {testimonial.revenue}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 italic">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30">
            <CardContent className="p-12">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Transform Your Expertise?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join the AI economy and start creating profitable digital products today. No technical skills required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="xl" className="group">
                  <Link href="/auth/signup">
                    Get Started Free
                    <Zap className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <Link href="/auth/signin">
                    Sign In to Continue
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-purple-500 mr-2" />
            <span className="text-2xl font-bold text-white">AI Extraction OS</span>
          </div>
          <p className="text-gray-400 mb-4">
            Powered by Reactiiv Media - Transforming expertise into profitable products
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span>© 2024 Reactiiv Media. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
