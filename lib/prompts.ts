
export const EXTRACTION_PROMPTS = {
  NICHE_DISCOVERY: `
You are an expert business coach helping entrepreneurs discover their unique advantage and create profitable digital products. 

Based on the user's background information:
- Business Type: {businessType}
- Experience Level: {experience}
- Areas of Interest: {interests}
- Current Challenges: {challenges}

Please help them complete this niche discovery process:

1. **Personal Advantage Analysis**
   - What unique skills or knowledge do they likely possess based on their background?
   - What problems do people in their situation commonly help others solve?
   - What transformations could they realistically deliver?

2. **Target Audience Identification**
   - Who would benefit most from their knowledge?
   - What are the biggest pain points of this audience?
   - Where do these people typically look for solutions?

3. **Product Opportunity Assessment**
   - What specific transformation could be delivered in 15-30 minutes?
   - How could this be packaged into a low-ticket digital product ($17-$47)?
   - What quick wins could create immediate value?

Format your response as a structured analysis with clear recommendations for their next steps.
`,

  PRODUCT_EXTRACTION: `
You are an expert product creation coach. Help create a complete digital product using the 6-Pillar Framework.

Based on this product idea: {productIdea}
Target Audience: {targetAudience}
Transformation Promise: {transformation}

Create a comprehensive product structure with:

1. **Product Overview**
   - Clear title and tagline
   - Core promise and transformation
   - Target completion time (should be 15-60 minutes)

2. **6-Pillar Structure** - Each pillar must include:
   - **Pillar Title & Focus**: What it covers and why crucial
   - **Quick Win Action**: Immediate 2-5 minute task
   - **Why It Works**: Science/psychology backing
   - **Step-by-Step Plan**: Exact implementation (3-5 steps)
   - **Plug-and-Play Resources**: Templates or tools needed
   - **Real-Life Example**: Relatable story or case study

3. **PERC Method Integration** for each pillar:
   - **Plan**: Clear path forward
   - **Eliminate**: What to avoid or stop doing
   - **Replace**: Better alternatives or upgrades
   - **Create**: New systems or habits to build

4. **Supporting Materials**
   - Checklists and templates needed
   - Tracking tools or worksheets
   - Quick reference guides

Respond in JSON format with structured data for easy implementation.
`,

  PILLAR_EXPANSION: `
You are an expert content developer. Take this pillar outline and expand it into complete, actionable content:

Pillar: {pillarTitle}
Current Content: {currentContent}
Target Audience: {targetAudience}

Expand this pillar to include:

1. **Detailed Content** (200-400 words)
   - Clear explanation of the concept
   - Why it's crucial for transformation
   - Common mistakes to avoid

2. **Scientific Backing**
   - Research or psychological principles
   - Expert opinions or studies
   - Credible statistics if relevant

3. **Step-by-Step Implementation** (5-7 clear steps)
   - Specific, actionable instructions
   - Time estimates for each step
   - Tools or resources needed

4. **Templates and Resources**
   - Checklists or worksheets
   - Scripts or copy-paste materials
   - Tracking or measurement tools

5. **Real-World Examples**
   - 2-3 concrete scenarios
   - Before/after comparisons
   - Success stories or case studies

Format as detailed, ready-to-use content that delivers immediate value.
`,

  SALES_PAGE_GENERATION: `
You are an expert copywriter specializing in high-converting sales pages for digital products.

Create a complete sales page for:
Product: {productTitle}
Price: {price}
Target Audience: {targetAudience}
Transformation: {transformation}
6-Pillar Structure: {pillars}

Generate the following sections:

1. **Headline & Subheadline**
   - Attention-grabbing promise + timeframe
   - Address biggest objection upfront

2. **Problem Agitation** (150-200 words)
   - Identify specific pain points
   - Amplify frustration and urgency
   - Connect to target audience's daily struggle

3. **Solution Introduction** (100-150 words)
   - Position your product as the answer
   - Explain the unique mechanism
   - Promise specific outcome

4. **What You Get** (detailed breakdown)
   - All 6 pillars with benefits
   - Supporting materials and bonuses
   - Total value calculation

5. **Social Proof Section**
   - Success story framework
   - Testimonial templates
   - Results and outcomes

6. **Pricing & Guarantee**
   - Value stack presentation
   - Risk-free guarantee language
   - Urgency and scarcity elements

7. **FAQ Section** (8-10 common objections)
   - Address typical concerns
   - Overcome resistance points
   - Reinforce value and guarantee

8. **Final Call-to-Action**
   - Clear next steps
   - Urgency reinforcement
   - Risk reversal statement

Format as complete, copy-paste ready sales page content.
`
};

export const BONUS_CREATION_PROMPTS = {
  QUICK_START_GUIDE: `Create a "Quick Start Guide" bonus that helps users implement the main product in 15 minutes or less.`,
  IMPLEMENTATION_CALENDAR: `Generate a 30-day implementation calendar breaking down the product into daily actions.`,
  TEMPLATES_PACK: `Create a collection of 5-7 plug-and-play templates related to the main product transformation.`,
  CHECKLISTS: `Develop comprehensive checklists for each step of the product implementation process.`,
  SCRIPTS: `Write word-for-word scripts for the most challenging parts of the transformation process.`
};
