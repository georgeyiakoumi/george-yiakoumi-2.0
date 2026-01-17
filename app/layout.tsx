import { Mulish } from "next/font/google";
import "./globals.css";
import { ProgressiveBlur } from "@/components/ui/progressive-blur"
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { SiteNavigation } from "@/components/site-navigation";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner";
import { ScrollProgressProvider, ScrollProgress, ScrollProgressContainer } from "@/components/animate-ui/primitives/animate/scroll-progress";
import { GoogleAnalytics } from '@/components/google-analytics';
import { generateSiteMetadata, generatePersonJsonLd, generateWebsiteJsonLd } from "@/lib/metadata";

// Import safelist to ensure Tailwind scans it for dynamic Strapi classes
import "@/lib/tailwind-safelist";

const mulish = Mulish({
  subsets: ["latin"],
});

export const metadata = generateSiteMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([generatePersonJsonLd(), generateWebsiteJsonLd()]),
          }}
        />
      </head>
      <body className={`${mulish.className} h-dvh overflow-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ScrollProgressProvider>
            <ProgressiveBlur height="10%" position="top" />
            <ProgressiveBlur height="15%" position="bottom" />

            <SiteNavigation />

            <ModeToggle />

            {/* Scroll progress indicator */}
            <ScrollProgress className="fixed top-0 left-0 h-1 bg-primary z-50 origin-left" />

            <ScrollProgressContainer asChild>
              <main className="h-dvh overflow-y-auto relative scrollbar-hide">
                {children}
              </main>
            </ScrollProgressContainer>

            <SiteFooter />
            <Toaster />
          </ScrollProgressProvider>
        </ThemeProvider>
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}