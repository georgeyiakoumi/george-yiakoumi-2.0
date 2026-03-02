// import { Mulish } from "next/font/google";
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

// const mulish = Mulish({
//   subsets: ["latin"],
//   display: 'swap',
//   preload: true,
//   fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
//   adjustFontFallback: true,
// });

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
        {/* Preconnect to external resources for faster loading */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://region1.google-analytics.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className="font-sans">
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