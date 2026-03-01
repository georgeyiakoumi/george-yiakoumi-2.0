"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { Typography } from "@/components/ui/typography";
import { type ToolData, type BusinessData } from "@/lib/strapi-queries";
import { ThemedLogo } from "@/components/themed-logo";
import { useState } from "react";

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
            className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground gap-1"
            role="group"
            aria-label="Filter tools by category"
          >
            <Button
              variant={activeCategory === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveCategory("all")}
              aria-pressed={activeCategory === "all"}
              className="h-7"
            >
              All
            </Button>
            <Button
              variant={activeCategory === "design" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveCategory("design")}
              aria-pressed={activeCategory === "design"}
              className="h-7"
            >
              Design
            </Button>
            <Button
              variant={activeCategory === "development" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveCategory("development")}
              aria-pressed={activeCategory === "development"}
              className="h-7"
            >
              Development
            </Button>
            <Button
              variant={activeCategory === "tools" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveCategory("tools")}
              aria-pressed={activeCategory === "tools"}
              className="h-7"
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
