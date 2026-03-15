"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselPagination } from "@/components/ui/carousel";
import { ProjectCard } from "@/components/project-card";
import { ItemGroup } from "@/components/ui/item";
import type { ProjectData } from "@/lib/strapi-queries";

type ProjectFilter = "all" | "client" | "concept";

interface ProjectsContentProps {
  projects: ProjectData[];
}

export function ProjectsContent({ projects }: ProjectsContentProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((p) => (p.type || "client") === activeFilter);

  return (
    <>
      <div className="flex gap-1 bg-muted p-1 rounded-lg">
        <Button
          variant="ghost"
          size="sm"
          className={`h-7 cursor-pointer ${activeFilter === "all" ? "bg-background shadow-sm" : ""}`}
          onClick={() => setActiveFilter("all")}
          aria-pressed={activeFilter === "all"}
        >
          All
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`h-7 cursor-pointer ${activeFilter === "client" ? "bg-background shadow-sm" : ""}`}
          onClick={() => setActiveFilter("client")}
          aria-pressed={activeFilter === "client"}
        >
          Client work
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`h-7 cursor-pointer ${activeFilter === "concept" ? "bg-background shadow-sm" : ""}`}
          onClick={() => setActiveFilter("concept")}
          aria-pressed={activeFilter === "concept"}
        >
          Concept work
        </Button>
      </div>

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
