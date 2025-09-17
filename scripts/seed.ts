
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create test user (admin account as specified)
  const hashedPassword = await bcrypt.hash('johndoe123', 12);
  
  const testUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      password: hashedPassword,
      name: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      businessType: 'Entrepreneur',
      experience: 'Advanced',
      onboardingCompleted: true,
      progress: {
        create: {
          currentStep: 'extraction',
          completedExtractions: 0,
          completedProducts: 0,
          achievements: JSON.stringify([
            {
              id: 'admin-account',
              title: 'System Administrator',
              description: 'Admin test account',
              unlocked: true,
              unlockedAt: new Date()
            }
          ]),
          timeInSystem: 0
        }
      }
    }
  });

  console.log('Test user created:', testUser.email);

  // Create template gallery data
  const templates = [
    {
      title: 'High-Converting Sales Page Template',
      description: 'Proven sales page structure that converts visitors into customers',
      category: 'sales-page',
      template: JSON.stringify({
        sections: [
          {
            name: 'headline',
            content: '[Problem] + [Solution] + [Timeframe] + [Objection Crusher]'
          },
          {
            name: 'subheadline', 
            content: 'Expand on the promise and add credibility'
          },
          {
            name: 'problem_agitation',
            content: 'Identify and amplify the pain points your audience faces daily'
          },
          {
            name: 'solution_intro',
            content: 'Position your product as the perfect solution'
          },
          {
            name: 'social_proof',
            content: 'Testimonials, reviews, and success stories'
          },
          {
            name: 'product_breakdown',
            content: 'Detailed explanation of what they get'
          },
          {
            name: 'pricing',
            content: 'Value stack and pricing strategy'
          },
          {
            name: 'guarantee',
            content: 'Risk reversal and money-back guarantee'
          },
          {
            name: 'urgency',
            content: 'Scarcity and time-sensitive elements'
          },
          {
            name: 'faq',
            content: 'Address common objections and concerns'
          }
        ]
      }),
      tags: ['sales', 'conversion', 'marketing'],
      isPopular: true,
      usageCount: 1250
    },
    {
      title: '6-Pillar Product Structure Framework',
      description: 'Complete framework for structuring any digital product',
      category: 'product-structure',
      template: JSON.stringify({
        pillars: [
          {
            name: 'Foundation Pillar',
            description: 'Core concept and mindset shift',
            components: ['quick_win', 'why_it_works', 'step_by_step', 'resources', 'example']
          },
          {
            name: 'Implementation Pillar',
            description: 'Practical application steps',
            components: ['quick_win', 'why_it_works', 'step_by_step', 'resources', 'example']
          },
          {
            name: 'Optimization Pillar',
            description: 'Improving and refining the process',
            components: ['quick_win', 'why_it_works', 'step_by_step', 'resources', 'example']
          },
          {
            name: 'Scaling Pillar',
            description: 'Growing and expanding results',
            components: ['quick_win', 'why_it_works', 'step_by_step', 'resources', 'example']
          },
          {
            name: 'Maintenance Pillar',
            description: 'Sustaining long-term success',
            components: ['quick_win', 'why_it_works', 'step_by_step', 'resources', 'example']
          },
          {
            name: 'Mastery Pillar',
            description: 'Advanced techniques and next level',
            components: ['quick_win', 'why_it_works', 'step_by_step', 'resources', 'example']
          }
        ]
      }),
      tags: ['structure', 'framework', 'product'],
      isPopular: true,
      usageCount: 890
    },
    {
      title: '7-Email Launch Sequence',
      description: 'Complete email sequence for launching digital products',
      category: 'email-sequence',
      template: JSON.stringify({
        emails: [
          {
            day: 1,
            subject: 'Welcome! Here\'s what happens next...',
            purpose: 'Welcome and set expectations'
          },
          {
            day: 2,
            subject: 'The #1 mistake that\'s costing you [specific result]',
            purpose: 'Problem agitation and awareness'
          },
          {
            day: 3,
            subject: 'Why [common solution] doesn\'t work (and what does)',
            purpose: 'Debunk alternatives, position your solution'
          },
          {
            day: 4,
            subject: 'Behind the scenes: How I discovered [method]',
            purpose: 'Story and credibility building'
          },
          {
            day: 5,
            subject: 'Proof it works: [specific case study]',
            purpose: 'Social proof and results'
          },
          {
            day: 6,
            subject: 'Last chance: [Product] closes tomorrow',
            purpose: 'Urgency and final sales push'
          },
          {
            day: 7,
            subject: 'Cart closing in 2 hours...',
            purpose: 'Final urgency and close'
          }
        ]
      }),
      tags: ['email', 'launch', 'sequence'],
      isPopular: false,
      usageCount: 456
    },
    {
      title: 'Bonus Materials Pack Template',
      description: 'Collection of high-value bonuses to increase perceived value',
      category: 'bonus-materials',
      template: JSON.stringify({
        bonuses: [
          {
            name: 'Quick Start Guide',
            description: '15-minute implementation checklist',
            type: 'pdf'
          },
          {
            name: 'Templates & Checklists',
            description: 'Ready-to-use resources and tools',
            type: 'bundle'
          },
          {
            name: 'Video Training Series',
            description: 'Step-by-step video walkthroughs',
            type: 'video'
          },
          {
            name: 'Private Community Access',
            description: 'Exclusive member community',
            type: 'access'
          },
          {
            name: '30-Day Implementation Calendar',
            description: 'Daily action plan for success',
            type: 'planner'
          }
        ]
      }),
      tags: ['bonus', 'value', 'materials'],
      isPopular: true,
      usageCount: 723
    }
  ];

  for (const template of templates) {
    const existingTemplate = await prisma.template.findFirst({
      where: { title: template.title }
    });
    
    if (!existingTemplate) {
      await prisma.template.create({
        data: template
      });
    }
  }

  console.log('Templates seeded');

  // Create prompt library data
  const prompts = [
    {
      title: 'Product Extraction Prompt - Health & Wellness',
      description: 'Extract digital products in the health and wellness niche',
      stage: 'extraction',
      category: 'Health & Wellness',
      prompt: `You are an expert product creation coach specializing in health and wellness. 

Based on the following information:
- Product Idea: {productIdea}
- Target Audience: {targetAudience} 
- Transformation Promise: {transformation}

Create a comprehensive 6-pillar digital product structure. Each pillar should focus on a specific aspect of the health/wellness transformation and include:

1. **Pillar Title & Focus**: Clear, compelling title and what it covers
2. **Quick Win Action**: A 5-minute action that delivers immediate value
3. **Why It Works**: Scientific backing or health principles
4. **Step-by-Step Plan**: 5-7 specific, actionable steps
5. **Plug-and-Play Resources**: Tools, templates, or trackers needed
6. **Real-Life Example**: Relatable health/wellness scenario

Make the content immediately actionable and transformation-focused. Respond in JSON format.`,
      variables: JSON.stringify(['productIdea', 'targetAudience', 'transformation']),
      isActive: true,
      usageCount: 89
    },
    {
      title: 'Business Sales Page Generator',
      description: 'Generate converting sales pages for business products',
      stage: 'sales-page',
      category: 'Business & Entrepreneurship',
      prompt: `You are an expert copywriter specializing in business and entrepreneurship products.

Create a complete sales page for:
- Product: {productTitle}
- Price: {price}  
- Target: {targetAudience}
- Promise: {transformation}

Generate these sections with compelling copy:

1. **Headline**: Problem + Solution + Timeframe + Authority
2. **Subheadline**: Expand promise and add credibility
3. **Problem Agitation**: Identify business pain points (150-200 words)
4. **Solution Introduction**: Position as the answer (100-150 words)
5. **What You Get**: Detailed product breakdown with benefits
6. **Social Proof**: Success stories and testimonials framework
7. **Pricing & Value**: Stack value and justify price
8. **Guarantee**: Risk reversal for business results
9. **FAQ**: Address 8 common business owner objections
10. **Final CTA**: Compelling close with urgency

Focus on business results, ROI, and professional growth. Respond in JSON format.`,
      variables: JSON.stringify(['productTitle', 'price', 'targetAudience', 'transformation']),
      isActive: true,
      usageCount: 134
    }
  ];

  for (const prompt of prompts) {
    const existingPrompt = await prisma.prompt.findFirst({
      where: { title: prompt.title }
    });
    
    if (!existingPrompt) {
      await prisma.prompt.create({
        data: prompt
      });
    }
  }

  console.log('Prompts seeded');

  // Create sample extraction for the test user
  const sampleExtraction = await prisma.extraction.create({
    data: {
      userId: testUser.id,
      title: 'The 15-Minute Morning Productivity System',
      niche: 'Productivity & Time Management',
      targetAudience: 'Busy professionals who struggle with morning routines and want to start their day with more energy and focus',
      transformation: 'Transform from chaotic, stressful mornings to energized, focused, productive days in just 15 minutes',
      currentStep: 1,
      isComplete: false,
      productIdea: 'The 15-Minute Morning Productivity System — A digital product that helps busy professionals go from chaotic, stressful mornings to energized, focused, productive days in 15 minutes.',
      sixPillars: JSON.stringify({
        timeframe: '15',
        expertise: 'Productivity coaching and morning routine optimization',
        pillars: []
      })
    }
  });

  console.log('Sample extraction created:', sampleExtraction.title);

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
