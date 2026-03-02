"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { Typography } from "@/components/ui/typography";
import { type ToolData, type BusinessData } from "@/lib/strapi-queries";
import { ThemedLogo } from "@/components/themed-logo";
import { useState, useRef, useEffect, useCallback } from "react";

// Lazy load animation components
const AnimateIcon = dynamic(() => import("@/components/animate-ui/icons/icon").then(mod => ({ default: mod.AnimateIcon })), { ssr: false });
const MessageCircleMore = dynamic(() => import("@/components/animate-ui/icons/message-circle-more").then(mod => ({ default: mod.MessageCircleMore })), { ssr: false });

interface AboutData {
  hero: Array<{
    type: string;
    children?: Array<{ text?: string }>;
    image?: {
      url: string;
      alternativeText?: string;
    };
  }>;
  heading_businesses: string;
  heading_tools: string;
  contact: Array<{
    type: string;
    children?: Array<{ text?: string }>;
  }>;
}

interface HomeContentProps {
  aboutData: AboutData | null;
  tools: ToolData[];
  businesses: BusinessData[];
}

export function HomeContent({ aboutData, tools, businesses }: HomeContentProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [clipPath, setClipPath] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateClipPath = useCallback(() => {
    const container = containerRef.current;
    const activeButton = buttonRefs.current[activeCategory];

    if (!container || !activeButton) return;

    // Set animating state
    setIsAnimating(true);

    // Use requestAnimationFrame to batch with browser paint
    requestAnimationFrame(() => {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      const left = buttonRect.left - containerRect.left;
      const right = containerRect.width - (buttonRect.right - containerRect.left);
      const top = buttonRect.top - containerRect.top;
      const bottom = containerRect.height - (buttonRect.bottom - containerRect.top);

      setClipPath(`inset(${top}px ${right}px ${bottom}px ${left}px round 0.375rem)`);

      // Remove willChange after animation completes
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, 200); // Match transition duration
    });
  }, [activeCategory]);

  useEffect(() => {
    updateClipPath();

    // Debounced resize handler
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(() => {
        updateClipPath();
      }, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [updateClipPath]);

  if (!aboutData) {
    return null;
  }

  const heading = aboutData.hero.find(block => block.type === 'heading');
  const avatarBlock = aboutData.hero.find(block => block.type === 'image');
  const paragraphs = aboutData.hero.filter(block => block.type === 'paragraph');

  const headingText = heading?.children?.[0]?.text;
  const avatarUrl = avatarBlock?.image?.url;
  const avatarAlt = avatarBlock?.image?.alternativeText || "Profile photo";

  const contactHeading = aboutData.contact.find(block => block.type === 'heading');
  const contactParagraph = aboutData.contact.find(block => block.type === 'paragraph');

  const contactHeadingText = contactHeading?.children?.[0]?.text;
  const contactDescription = contactParagraph?.children?.[0]?.text;

  return (
    <>
      <Section as="header">
        {avatarUrl && (
          <Image
            src={avatarUrl}
            alt={avatarAlt}
            width={128}
            height={128}
            className="size-32 rounded-full mx-auto object-cover"
            priority
            fetchPriority="high"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgZmlsbD0iI2VlZSIvPjwvc3ZnPg=="
          />
        )}
        <Typography variant="h1">
          {headingText}
        </Typography>
        {paragraphs.map((para, index) => (
          <Typography key={index} variant="lead" align="center" className="max-w-xl">
            {para.children?.[0]?.text || ''}
          </Typography>
        ))}
      </Section>

      <Section>
        <Typography variant="h2" align="center">
          {aboutData.heading_businesses}
        </Typography>

          <div className="w-full grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {businesses.map((business, index) => (
              <div key={business.id} className={index > 5 ? "lazy-load" : ""}>
                <ThemedLogo data={business} />
              </div>
            ))}
          </div>

      </Section>

      <Section>
        <Typography variant="h2" align="center">
          {aboutData.heading_tools}
        </Typography>

        <div className="flex flex-col items-center gap-8 w-full">
          <div
            ref={containerRef}
            className="relative inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground gap-1"
            role="group"
            aria-label="Filter tools by category"
          >
            {/* Animated background */}
            <div
              className="absolute inset-0 bg-background shadow-sm transition-[clip-path] duration-200 ease-out motion-reduce:transition-none"
              style={{
                clipPath,
                willChange: isAnimating ? 'clip-path' : 'auto'
              }}
              aria-hidden="true"
            />

            <Button
              ref={(el) => { buttonRefs.current["all"] = el; }}
              variant="ghost"
              size="sm"
              onClick={() => setActiveCategory("all")}
              aria-pressed={activeCategory === "all"}
              className="h-7 cursor-pointer relative z-10 hover:bg-transparent"
            >
              All
            </Button>
            <Button
              ref={(el) => { buttonRefs.current["design"] = el; }}
              variant="ghost"
              size="sm"
              onClick={() => setActiveCategory("design")}
              aria-pressed={activeCategory === "design"}
              className="h-7 cursor-pointer relative z-10 hover:bg-transparent"
            >
              Design
            </Button>
            <Button
              ref={(el) => { buttonRefs.current["development"] = el; }}
              variant="ghost"
              size="sm"
              onClick={() => setActiveCategory("development")}
              aria-pressed={activeCategory === "development"}
              className="h-7 cursor-pointer relative z-10 hover:bg-transparent"
            >
              Development
            </Button>
            <Button
              ref={(el) => { buttonRefs.current["tools"] = el; }}
              variant="ghost"
              size="sm"
              onClick={() => setActiveCategory("tools")}
              aria-pressed={activeCategory === "tools"}
              className="h-7 cursor-pointer relative z-10 hover:bg-transparent"
            >
              Tools
            </Button>
          </div>

          <div className="w-full grid gap-8 grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8">
            {tools.map((tool) => {
              const isActive = activeCategory === "all" || tool.category === activeCategory;
              return (
                <div
                  key={tool.id}
                  data-category={tool.category}
                  className={`transition-all duration-300 ease-out motion-reduce:transition-none ${
                    !isActive ? "opacity-50 blur-sm pointer-events-none scale-90 saturate-50" : "scale-100 saturate-100 opacity-100 blur-0"
                  }`}
                  style={{ willChange: isActive ? 'auto' : 'opacity, filter, transform' }}
                >
                  <ThemedLogo data={tool} />
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <Section>
        <Typography variant="h2" align="center">
          {contactHeadingText}
        </Typography>
        <Typography variant="lead" align="center">
          {contactDescription}
        </Typography>
        <AnimateIcon animateOnHover asChild>
          <Button size="lg" href="/contact">
            <MessageCircleMore />
            Get in touch
          </Button>
        </AnimateIcon>
      </Section>
    </>
  );
}
