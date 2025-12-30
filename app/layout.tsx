import { Mulish } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { SiteNavigation } from "@/components/site-navigation";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner";
import { ScrollProgressProvider, ScrollProgress, ScrollProgressContainer } from "@/components/animate-ui/primitives/animate/scroll-progress";

// Import safelist to ensure Tailwind scans it for dynamic Strapi classes
import "@/lib/tailwind-safelist";

const mulish = Mulish({
  subsets: ["latin"],
});

export const metadata = {
  title: "George Yiakoumi",
  description: "Portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${mulish.className} h-dvh overflow-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ScrollProgressProvider>
            <SiteNavigation />

            <ModeToggle />

            {/* Scroll progress indicator */}
            <ScrollProgress className="fixed top-0 left-0 h-1 bg-primary z-50 origin-left" />

            <ScrollProgressContainer asChild>
              <main className="h-dvh overflow-y-auto relative scrollbar-hide">
                {/* Top fade */}
                <div className="fixed top-0 left-0 w-full pointer-events-none z-[1] flex flex-col">
                  <div className="md:hidden h-24 bg-background"/>
                  <div className="h-8 md:h-24 bg-gradient-to-b from-background to-background/0"/>
                </div>

                {/* Bottom fade */}
                <div className="fixed bottom-0 left-0 w-full pointer-events-none z-[1] flex flex-col">
                  <div className="h-8 md:h-24 bg-gradient-to-t from-background to-background/0"/>
                  <div className="md:hidden h-28 bg-background"/>
                </div>

                {children}
              </main>
            </ScrollProgressContainer>

            <SiteFooter />
            <Toaster />
          </ScrollProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}