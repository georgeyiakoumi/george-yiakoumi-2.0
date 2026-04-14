"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselPagination } from "@/components/ui/carousel";
import { ItemGroup } from "@/components/ui/item";

import { ArrowLeft } from "@/components/animate-ui/icons/arrow-left";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { ExternalLink, Github } from "lucide-react";

import { getStrapiMediaURL } from "@/lib/strapi";
import { useScrollVisibility } from "@/hooks/use-scroll-visibility";
import { Typography } from "@/components/ui/typography";
import { ProjectCard } from "@/components/project-card";
import { ProjectBlockRenderer } from "@/components/project-blocks";
import { ShareBar } from "@/components/share-bar";
import type { ProjectData, ToolData } from "@/lib/strapi-queries";

interface ProjectClientProps {
  project: ProjectData;
  otherProjects: ProjectData[];
}

function ToolBadge({ tool }: { tool: ToolData }) {
  const { resolvedTheme } = useTheme();
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const imageUrl = tool.image?.url ? getStrapiMediaURL(tool.image.url) : null;
  const isSvg = tool.image?.ext === '.svg';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isSvg && imageUrl) {
      fetch(imageUrl)
        .then((res) => res.text())
        .then((svg) => setSvgContent(svg))
        .catch((err) => console.error('Failed to fetch SVG:', err));
    }
  }, [isSvg, imageUrl]);

  // Merge CSS variables based on current theme
  // Only apply theme-specific variables after mounting to prevent hydration mismatch
  const cssVariables = {
    ...(tool.cssVariables || {}),
    ...(mounted && resolvedTheme === 'dark' && tool.cssVariablesDark ? tool.cssVariablesDark : {}),
  } as React.CSSProperties;

  return (
    <Badge
      variant="secondary"
      className={`gap-2 ${tool.classes || ""}`}
      style={cssVariables}
    >
      {tool.image && (
        <>
          {isSvg && svgContent ? (
            <span
              className="size-4 [&>svg]:size-full [&>svg]:object-contain"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          ) : (
            <Image
              src={tool.image.url}
              alt={tool.image.alternativeText || tool.name}
              width={16}
              height={16}
              className="object-contain"
            />
          )}
        </>
      )}
      {tool.name}
    </Badge>
  );
}

export function ProjectClient({ project, otherProjects }: ProjectClientProps) {

  const heroImageUrl = project.project_thumb
    ? getStrapiMediaURL(project.project_thumb.url)
    : null;

  const scrollVisible = useScrollVisibility();

  const handleBack = () => {
    window.history.back();
  };

  return (
    <section className="place-items-center relative">
      <AnimateIcon animateOnHover asChild>
        <Button onClick={handleBack} variant="secondary" style={{ transform: scrollVisible ? 'translateY(0)' : 'translateY(-120%)' }} className={`bg-background fixed cursor-pointer top-8 left-8 md:bottom-8 md:top-auto md:left-8 lg:left-16 z-20 transition-[transform,opacity] duration-300 ease-out will-change-transform motion-reduce:transition-none md:!transform-none ${scrollVisible ? 'opacity-100' : 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto'}`}>
          <ArrowLeft />
          Back
        </Button>
      </AnimateIcon>

      <header className="flex flex-col gap-8 px-8 items-center justify-center w-full md:max-w-lg lg:max-w-2xl xl:max-w-3xl h-screen mx-auto">
        <Typography variant="h1" className="text-center">
          {project.title}
        </Typography>

        {project.description && (
          <Typography variant="lead" className="text-center">
            {project.description}
          </Typography>
        )}

        <Typography variant="muted" className="flex items-center gap-2 flex-wrap justify-center">
          {project.project_client && (
            <>
              <span>{project.project_client}</span>
              <span>•</span>
            </>
          )}
          <time dateTime={project.date}>
            {new Date(project.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              ...(project.type === "article" && { day: "numeric" }),
            })}
          </time>
          {project.project_role && (
            <>
              <span>•</span>
              <span>{project.project_role}</span>
            </>
          )}
        </Typography>

        {(project.website_url || project.github_url) && (
          <div className="flex items-center gap-3">
            {project.website_url && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={project.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit website"
                >
                  <ExternalLink className="size-4" />
                  Visit website
                </a>
              </Button>
            )}
            {project.github_url && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View source on GitHub"
                >
                  <Github className="size-4" />
                  GitHub
                </a>
              </Button>
            )}
          </div>
        )}

        {project.tools && project.tools.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {project.tools.map((tool) => (
              <ToolBadge key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </header>

      {heroImageUrl && (
        <Image
          src={heroImageUrl}
          alt={project.project_thumb?.alternativeText || project.title || ''}
          width={1920}
          height={1080}
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 32rem, 48rem"
          className="h-auto md:max-w-md lg:max-w-xl xl:max-w-3xl mx-auto md:border-border md:border md:rounded-lg select-none"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjEwODAiIGZpbGw9IiNlZWUiLz48L3N2Zz4="
          draggable={false}
        />
      )}

      <article className="flex flex-col w-full py-16">
        {project.body && <ProjectBlockRenderer blocks={project.body} projectTitle={project.title} />}
        <ShareBar type={project.type} />
      </article>

      {otherProjects.length > 0 && (
        <section className="flex flex-col gap-8 h-screen md:h-auto md:py-16 items-center justify-center w-full bg-muted px-0 md:px-8">
          <Typography variant="h2" align="center">
            Other projects
          </Typography>

          {/* Mobile Carousel */}
          <Carousel className="w-full md:hidden">
            <CarouselContent className="mx-4">
              {otherProjects.map((otherProject) => (
                <CarouselItem key={otherProject.id} className="px-4">
                  <ProjectCard project={otherProject} background="background" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPagination className="mt-4" />
          </Carousel>

          {/* Desktop List */}
          <ItemGroup className="hidden md:flex w-full md:max-w-md lg:max-w-xl xl:max-w-3xl gap-4">
            {otherProjects.map((otherProject) => (
              <ProjectCard key={otherProject.id} project={otherProject} scenario="list" background="background" />
            ))}
          </ItemGroup>
        </section>
      )}
    </section>
  );
}
