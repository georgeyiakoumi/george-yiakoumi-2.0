"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselPagination } from "@/components/ui/carousel";
import { ProjectCard } from "@/components/project-card";
import { ItemGroup } from "@/components/ui/item";
import type { ProjectData } from "@/lib/strapi-queries";

type ProjectFilter = "client" | "concept" | "article";

interface ProjectsContentProps {
  projects: ProjectData[];
}

export function ProjectsContent({ projects }: ProjectsContentProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("client");

  const clientCount = projects.filter((p) => (p.type || "client") === "client").length;
  const conceptCount = projects.filter((p) => p.type === "concept").length;
  const articleCount = projects.filter((p) => p.type === "article").length;
  const hasConcepts = conceptCount > 0;
  const hasArticles = articleCount > 0;
  const hasFilters = hasConcepts || hasArticles;

  const filteredProjects = hasFilters
    ? projects.filter((p) => (p.type || "client") === activeFilter)
    : projects;

  return (
    <>
      {hasFilters && (
        <div className="flex gap-1 bg-muted p-1 rounded-lg">
          <Button
            variant="ghost"
            size="sm"
            className={`h-7 cursor-pointer gap-1.5 ${activeFilter === "client" ? "bg-background shadow-sm" : ""}`}
            onClick={() => setActiveFilter("client")}
            aria-pressed={activeFilter === "client"}
          >
            Client work
            <Badge variant="secondary" className="h-4 px-1 text-xs">{clientCount}</Badge>
          </Button>
          {hasConcepts && (
            <Button
              variant="ghost"
              size="sm"
              className={`h-7 cursor-pointer gap-1.5 ${activeFilter === "concept" ? "bg-background shadow-sm" : ""}`}
              onClick={() => setActiveFilter("concept")}
              aria-pressed={activeFilter === "concept"}
            >
              Concepts
              <Badge variant="secondary" className="h-4 px-1 text-xs">{conceptCount}</Badge>
            </Button>
          )}
          {hasArticles && (
            <Button
              variant="ghost"
              size="sm"
              className={`h-7 cursor-pointer gap-1.5 ${activeFilter === "article" ? "bg-background shadow-sm" : ""}`}
              onClick={() => setActiveFilter("article")}
              aria-pressed={activeFilter === "article"}
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
        <CarouselPagination className="mt-4" />
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
