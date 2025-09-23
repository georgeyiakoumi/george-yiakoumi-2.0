"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollBlurEffect({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const sections = contentRef.current.querySelectorAll("section");

    if (!sections || sections.length === 0) return;

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        scroller: container,
        start: "center 100%",
        end: "center 0%",
        scrub: 1,
        markers: true,
        onUpdate: (self) => {
          const progress = self.progress;
          let blur: number, opacity: number;

          if (progress < 0.1) {
            // Bottom fade zone (center between 100% and 90%)
            const localProgress = progress / 0.1;
            blur = 15 * (1 - localProgress);
            opacity = localProgress;
          } else if (progress > 0.9) {
            // Top fade zone (center between 10% and 0%)
            const localProgress = (progress - 0.9) / 0.1;
            blur = 15 * localProgress;
            opacity = 1 - localProgress;
          } else {
            // Clear zone (center between 90% and 10%)
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
    };
  }, [children]);

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto px-16 py-16"
      style={{
        mask: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMask: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)"
      }}
    >
      <div ref={contentRef} className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}