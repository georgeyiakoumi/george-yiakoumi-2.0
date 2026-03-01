"use client";

import { usePathname } from "next/navigation";
import { SiteNavigation } from "@/components/site-navigation";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgressProvider, ScrollProgress, ScrollProgressContainer } from "@/components/animate-ui/primitives/animate/scroll-progress";
import { useEffect, useState } from "react";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCVSubdomain, setIsCVSubdomain] = useState(false);

  useEffect(() => {
    setIsCVSubdomain(window.location.hostname === 'cv.georgeyiakoumi.com');
  }, []);

  const isCVPage = pathname === "/cv" || isCVSubdomain;

  // Only show scroll progress on pages with long-form content
  const showScrollProgress = pathname === "/" || pathname.startsWith("/project/");

  if (isCVPage) {
    // Simple layout for CV page
    return <main>{children}</main>;
  }

  // Full layout with navigation for other pages
  return (
    <ScrollProgressProvider>
      <SiteNavigation />

      {/* Scroll progress indicator - only on index and project detail pages */}
      {showScrollProgress && (
        <ScrollProgress className="fixed top-0 left-0 h-1 bg-primary z-50 origin-left" />
      )}

      <ScrollProgressContainer asChild>
        <main className="h-dvh overflow-y-auto relative scrollbar-hide">
          {children}
        </main>
      </ScrollProgressContainer>

      <SiteFooter />
    </ScrollProgressProvider>
  );
}
