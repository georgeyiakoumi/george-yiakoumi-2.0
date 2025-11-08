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

    // Create ScrollSmoother instance
    smootherRef.current = ScrollSmoother.create({
      wrapper: containerRef.current,
      content: contentRef.current,
      smooth: 1.5,
      effects: true,
      normalizeScroll: true
    });

    const sections = contentRef.current.querySelectorAll("section");

    if (!sections || sections.length === 0) return;

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
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (smootherRef.current) {
        smootherRef.current.kill();
      }
    };
  }, [children]);

  return (
    <div
      ref={containerRef}
      id="smooth-wrapper"
      className="h-full overflow-hidden"
      style={{
        mask: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMask: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)"
      }}
    >
      <div ref={contentRef} id="smooth-content" className="w-full mx-auto">
        {children}
      </div>
    </div>
  );
}