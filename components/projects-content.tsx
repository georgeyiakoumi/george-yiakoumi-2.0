"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselPagination } from "@/components/ui/carousel";
import { ProjectCard } from "@/components/project-card";
import { ItemGroup } from "@/components/ui/item";
import type { ProjectData } from "@/lib/strapi-queries";

type ProjectFilter = "client" | "personal" | "article";

interface ProjectsContentProps {
  projects: ProjectData[];
}

export function ProjectsContent({ projects }: ProjectsContentProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("client");
  const [clipPath, setClipPath] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clientCount = projects.filter((p) => (p.type || "client") === "client").length;
  const personalCount = projects.filter((p) => p.type === "personal").length;
  const articleCount = projects.filter((p) => p.type === "article").length;
  const hasPersonal = personalCount > 0;
  const hasArticles = articleCount > 0;
  const hasFilters = hasPersonal || hasArticles;

  const filteredProjects = hasFilters
    ? projects.filter((p) => (p.type || "client") === activeFilter)
    : projects;

  const updateClipPath = useCallback(() => {
    const container = containerRef.current;
    const activeButton = buttonRefs.current[activeFilter];

    if (!container || !activeButton) return;

    setIsAnimating(true);

    requestAnimationFrame(() => {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      const left = buttonRect.left - containerRect.left;
      const right = containerRect.width - (buttonRect.right - containerRect.left);
      const top = buttonRect.top - containerRect.top;
      const bottom = containerRect.height - (buttonRect.bottom - containerRect.top);

      setClipPath(`inset(${top}px ${right}px ${bottom}px ${left}px round 0.375rem)`);

      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, 200);
    });
  }, [activeFilter]);

  useEffect(() => {
    updateClipPath();

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

  return (
    <>
      {hasFilters && (
        <div
          ref={containerRef}
          className="relative inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground gap-1"
          role="group"
          aria-label="Filter projects by type"
        >
          <div
            className="absolute inset-0 bg-background shadow-sm transition-[clip-path] duration-200 ease-out motion-reduce:transition-none"
            style={{
              clipPath,
              willChange: isAnimating ? 'clip-path' : 'auto'
            }}
            aria-hidden="true"
          />

          <Button
            ref={(el) => { buttonRefs.current["client"] = el; }}
            variant="ghost"
            size="sm"
            onClick={() => setActiveFilter("client")}
            aria-pressed={activeFilter === "client"}
            className="h-7 cursor-pointer relative z-10 hover:bg-transparent gap-1.5"
          >
            Client work
            <Badge variant="secondary" className="h-4 px-1 text-xs">{clientCount}</Badge>
          </Button>
          {hasPersonal && (
            <Button
              ref={(el) => { buttonRefs.current["personal"] = el; }}
              variant="ghost"
              size="sm"
              onClick={() => setActiveFilter("personal")}
              aria-pressed={activeFilter === "personal"}
              className="h-7 cursor-pointer relative z-10 hover:bg-transparent gap-1.5"
            >
              Personal Projects
              <Badge variant="secondary" className="h-4 px-1 text-xs">{personalCount}</Badge>
            </Button>
          )}
          {hasArticles && (
            <Button
              ref={(el) => { buttonRefs.current["article"] = el; }}
              variant="ghost"
              size="sm"
              onClick={() => setActiveFilter("article")}
              aria-pressed={activeFilter === "article"}
              className="h-7 cursor-pointer relative z-10 hover:bg-transparent gap-1.5"
            >
              Articles
              <Badge variant="secondary" className="h-4 px-1 text-xs">{articleCount}</Badge>
            </Button>
          )}
        </div>
      )}

      {/* Mobile Carousel */}
      <Carousel className="w-full md:hidden">
        <CarouselContent className="mx-4">
          {filteredProjects.map((project) => (
            <CarouselItem key={project.id} className="px-4">
              <ProjectCard project={project} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {filteredProjects.length > 1 && <CarouselPagination className="mt-4" />}
      </Carousel>

      {/* Tablet Grid */}
      <div className="hidden md:flex md:flex-col lg:hidden w-full max-w-3xl gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Desktop List */}
      <ItemGroup className="hidden lg:flex w-full max-w-3xl gap-4">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} scenario="list" />
        ))}
      </ItemGroup>
    </>
  );
}
