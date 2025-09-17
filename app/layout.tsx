
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Extraction Operating System | Reactiiv Media",
  description: "Transform your expertise into profitable digital products using AI-powered extraction prompts. From zero to sellable product in 60 minutes.",
  keywords: "AI, product creation, digital products, extraction, prompts, business, entrepreneurs",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
