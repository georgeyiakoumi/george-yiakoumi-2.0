"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function ScrollBlurEffect({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    // Kill any existing ScrollSmoother instances first
    const existingSmoother = ScrollSmoother.get();
    if (existingSmoother) {
      existingSmoother.kill();
    }

    // Create ScrollSmoother instance
    smootherRef.current = ScrollSmoother.create({
      wrapper: containerRef.current,
      content: contentRef.current,
      smooth: 1.5,
      effects: true,
      normalizeScroll: true
    });

    const sections = contentRef.current.querySelectorAll("section");

    if (!sections || sections.length === 0) {
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
      return;
    }

    sections.forEach((section) => {
      gsap.set(section, { opacity: 0, filter: 'blur(15px)' });

      ScrollTrigger.create({
        trigger: section,
        start: "center 100%",
        end: "center 0%",
        scrub: 1,

        onUpdate: (self) => {
          const progress = self.progress;
          let blur: number, opacity: number;

          if (progress < 0.1) {
            const localProgress = progress / 0.1;
            blur = 15 * (1 - localProgress);
            opacity = localProgress;
          } else if (progress > 0.9) {
            const localProgress = (progress - 0.9) / 0.1;
            blur = 15 * localProgress;
            opacity = 1 - localProgress;
          } else {
            blur = 0;
            opacity = 1;
          }

          gsap.set(section, {
            filter: `blur(${blur}px)`,
            opacity: opacity
          });
        }
      });
    });

    return () => {
      // Reset all sections to default state before cleanup
      const sections = contentRef.current?.querySelectorAll("section");
      if (sections) {
        sections.forEach(section => {
          gsap.set(section, { clearProps: "all" });
        });
      }

      // Kill all ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      // Kill ScrollSmoother
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }

      // Additional cleanup: kill any lingering ScrollSmoother instance
      const existingSmoother = ScrollSmoother.get();
      if (existingSmoother) {
        existingSmoother.kill();
      }

      // Refresh ScrollTrigger to ensure clean state
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="smooth-wrapper"
      className="h-full overflow-hidden relative"
    >
      {/* Top fade */}
      <div className="fixed top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-background/0 pointer-events-none z-10" />

      {/* Bottom fade */}
      <div className="fixed bottom-0 left-0 w-full pointer-events-none z-10 flex flex-col">
        <div className="h-24 bg-gradient-to-t from-background to-background/0"/>
        <div className="md:hidden h-24 bg-background"/>
      </div>

      <div ref={contentRef} id="smooth-content" className="w-full mx-auto">
        {children}
      </div>
    </div>
  );
}