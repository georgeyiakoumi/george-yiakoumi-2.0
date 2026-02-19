import { Mulish } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics } from '@/components/google-analytics';
import { generateSiteMetadata } from "@/lib/metadata";
import { SEOScripts } from "@/components/seo-scripts";
import { ConditionalLayout } from "@/components/conditional-layout";

// Import safelist to ensure Tailwind scans it for dynamic Strapi classes
import "@/lib/tailwind-safelist";

const mulish = Mulish({
  subsets: ["latin"],
});

export const generateMetadata = generateSiteMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SEOScripts />
      </head>
      <body className={`${mulish.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ModeToggle />

          <ConditionalLayout>
            {children}
          </ConditionalLayout>

          <Toaster />
        </ThemeProvider>
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}