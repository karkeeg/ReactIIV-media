
import { User, Extraction, Product, UserProgress, Template, Prompt } from '@prisma/client';

export interface ExtendedUser extends User {
  progress?: UserProgress;
  extractions?: Extraction[];
  products?: Product[];
}

export interface ExtractionWithRelations extends Extraction {
  user: User;
  products: Product[];
}

export interface ProductWithRelations extends Product {
  user: User;
  extraction: Extraction;
}

// Extraction Process Types
export interface ExtractionStep {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

export interface SixPillar {
  id: string;
  title: string;
  description: string;
  content: string;
  quickWin: string;
  whyItWorks: string;
  stepByStep: string[];
  resources: string[];
  example: string;
}

export interface PERCMethod {
  plan: string;
  eliminate: string;
  replace: string;
  create: string;
}

export interface ProductIdea {
  title: string;
  audience: string;
  problem: string;
  transformation: string;
  mechanism: string;
  timeframe: string;
}

export interface SalesPageData {
  headline: string;
  subheadline: string;
  problemAgitation: string;
  solution: string;
  benefits: string[];
  proof: string;
  pricing: {
    core: number;
    upsell1: number;
    upsell2: number;
  };
  guarantee: string;
  urgency: string;
  faqs: Array<{question: string; answer: string}>;
}

// Business Types
export type BusinessType = 'Coach' | 'Content Creator' | 'Entrepreneur' | 'Consultant';
export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';

// Template Types
export type TemplateCategory = 'sales-page' | 'email-sequence' | 'product-structure' | 'bonus-materials';
export type PromptStage = 'extraction' | 'pillar-expansion' | 'sales-page' | 'bonus-creation';

// API Response Types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface StreamingResponse {
  status: 'processing' | 'completed' | 'error';
  message?: string;
  result?: any;
  progress?: number;
}

// Export Types
export interface ExportData {
  extraction: Extraction;
  product?: Product;
  format: 'pdf' | 'docx' | 'json';
  sections: string[];
}

// Achievement Types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}
