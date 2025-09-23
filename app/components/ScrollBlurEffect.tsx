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

    // Define background colors for each section
    const backgroundColors = [
      "rgb(239, 246, 255)", // blue-50
      "rgb(240, 253, 244)", // green-50
      "rgb(250, 245, 255)", // purple-50
      "rgb(254, 252, 232)", // yellow-50
      "rgb(254, 242, 242)"  // red-50
    ];

    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        scroller: container,
        start: "center 100%",
        end: "center 0%",
        scrub: 1,

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

      // Create background color animation
      ScrollTrigger.create({
        trigger: section,
        scroller: container,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onUpdate: (self) => {
          const currentColor = backgroundColors[index];
          const nextColor = backgroundColors[index + 1] || backgroundColors[index];

          if (self.progress < 0.5) {
            // Fade in current color
            gsap.set(document.body, {
              backgroundColor: currentColor
            });
          } else {
            // Start transitioning to next color
            gsap.set(document.body, {
              backgroundColor: gsap.utils.interpolate(currentColor, nextColor, (self.progress - 0.5) * 2)
            });
          }
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
      className="h-full overflow-y-auto"
      style={{
        mask: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMask: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)"
      }}
    >
      <div ref={contentRef} className="w-full mx-auto">
        {children}
      </div>
    </div>
  );
}