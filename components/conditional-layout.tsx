"use client";

import { usePathname } from "next/navigation";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { SiteNavigation } from "@/components/site-navigation";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgressProvider, ScrollProgress, ScrollProgressContainer } from "@/components/animate-ui/primitives/animate/scroll-progress";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCVPage = pathname === "/cv";

  if (isCVPage) {
    // Simple layout for CV page
    return <main>{children}</main>;
  }

  // Full layout with navigation for other pages
  return (
    <ScrollProgressProvider>
      <ProgressiveBlur height="10%" position="top" />
      <ProgressiveBlur height="15%" position="bottom" />

      <SiteNavigation />

      {/* Scroll progress indicator */}
      <ScrollProgress className="fixed top-0 left-0 h-1 bg-primary z-50 origin-left" />

      <ScrollProgressContainer asChild>
        <main className="h-dvh overflow-y-auto relative scrollbar-hide">
          {children}
        </main>
      </ScrollProgressContainer>

      <SiteFooter />
    </ScrollProgressProvider>
  );
}
