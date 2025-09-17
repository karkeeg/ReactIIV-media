# AI Extraction OS

A comprehensive platform for managing and extracting value from digital content through AI-powered workflows and tools.

## 🚀 Features

- **User Authentication**: Secure sign-up and sign-in with JWT
- **Content Extraction**: AI-powered content analysis and extraction
- **Product Generation**: Transform extractions into structured products
- **Dashboard**: Track your extractions and products
- **Templates**: Reusable templates for common workflows
- **Responsive Design**: Works on desktop and mobile devices

## 🛠 Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom theming
- **Database**: PostgreSQL with Supabase
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **UI Components**: Radix UI, Shadcn/ui
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: Jotai, React Query
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
app/
├── api/                    # API routes
├── app/                    # App router pages
│   ├── auth/               # Authentication pages
│   │   ├── signin/         # Sign in page
│   │   └── signup/         # Sign up page
│   ├── dashboard/          # User dashboard
│   ├── extract/            # Content extraction flows
│   └── ...
├── components/             # Reusable components
│   ├── auth/               # Auth components
│   ├── dashboard/          # Dashboard components
│   ├── extraction/         # Extraction workflow components
│   ├── ui/                 # UI primitives
│   └── ...
├── lib/                    # Shared utilities
│   ├── auth-options.ts     # NextAuth configuration
│   ├── db.ts               # Database client
│   └── ...
├── prisma/                 # Database schema
│   └── schema.prisma       # Prisma schema
├── public/                 # Static assets
└── styles/                 # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (Supabase recommended)

### Installation

1. Clone the repository:

   ```bash
   git clone [your-repository-url]
   cd [project-name]
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Update the `.env.local` file with your database credentials and API keys.

4. Set up the database:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/dbname?pgbouncer=true"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# AI Services
OPENAI_API_KEY="your-openai-api-key"
```

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to a GitHub/GitLab/Bitbucket repository
2. Import your project on Vercel
3. Add your environment variables
4. Deploy!

### Other Platforms

For other platforms, refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [Supabase](https://supabase.com/)
- [Shadcn/ui](https://ui.shadcn.com/)

---

<div align="center">
  Made with ❤️ by Bibek karki
</div>
