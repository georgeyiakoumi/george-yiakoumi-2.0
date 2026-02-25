"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselPagination } from "@/components/ui/carousel";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

import { ArrowLeft } from "@/components/animate-ui/icons/arrow-left";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";

import { getStrapiMediaURL } from "@/lib/strapi";
import { Typography } from "@/components/ui/typography";
import { ProjectCard } from "@/components/project-card";
import { ProjectBlockRenderer } from "@/components/project-blocks";
import type { ProjectData } from "@/lib/strapi-queries";

interface ProjectClientProps {
  project: ProjectData;
  otherProjects: ProjectData[];
}

export function ProjectClient({ project, otherProjects }: ProjectClientProps) {

  const heroImageUrl = project.project_thumb
    ? getStrapiMediaURL(project.project_thumb.url)
    : null;

  const handleBack = () => {
    window.history.back();
  };

  return (
    <section className="place-items-center relative">
      <AnimateIcon animateOnHover asChild>
        <Button onClick={handleBack} variant="secondary" className="bg-background fixed cursor-pointer top-8 left-8 md:bottom-8 md:top-auto md:left-8 lg:left-16 z-20">
          <ArrowLeft />
          Back
        </Button>
      </AnimateIcon>

      <header className="flex flex-col gap-8 px-8 items-center justify-center w-full md:max-w-lg lg:max-w-2xl h-screen mx-auto">
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
            })}
          </time>
          {project.project_role && (
            <>
              <span>•</span>
              <span>{project.project_role}</span>
            </>
          )}
        </Typography>
      </header>

      {heroImageUrl && (
        <Image
          src={heroImageUrl}
          alt={project.project_thumb?.alternativeText || project.title || ''}
          width={1920}
          height={1080}
          sizes="100vw"
          className="project-image w-full h-auto md:rounded-lg md:max-w-lg lg:max-w-3xl mx-auto md:border-border md:border select-none"
          draggable={false}
          priority
        />
      )}

      <article className="flex flex-col w-full gap-8 my-16">
        {project.body && <ProjectBlockRenderer blocks={project.body} projectTitle={project.title} />}
      </article>

      {otherProjects.length > 0 && (
        <section className="flex flex-col gap-8 h-screen md:min-h-dvh items-center justify-center w-full mx-auto md:max-w-xl lg:max-w-2xl xl:max-w-4xl 2xl:max-w-7xl bg-muted md:bg-transparent">
          <Typography variant="h2" align="center">
            Other projects
          </Typography>

          <div className="relative w-full">
            <ProgressiveBlur orientation="horizontal" position="left" width="5%" className="hidden md:block z-[5]" />
            <ProgressiveBlur orientation="horizontal" position="right" width="5%" className="hidden md:block z-[5]" />

            {/* Gradient fade overlays */}
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-[15%] bg-gradient-to-r from-background to-background/0 pointer-events-none z-[5]" />
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[15%] bg-gradient-to-l from-background to-background/0 pointer-events-none z-[5]" />

            <div className="mx-auto w-full">
              <Carousel
                opts={{
                  align: "center",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="ml-0">
                  {otherProjects.map((otherProject) => (
                    <CarouselItem key={otherProject.id} className=" lg:basis-1/1 xl:basis-1/3 2xl:basis-1/3 px-4">
                      <ProjectCard project={otherProject} disableHoverScale />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex left-4 md:left-[-64] z-5 lg:cursor-pointer" />
                <CarouselNext className="hidden md:flex right-4 md:right-[-64] z-5 lg:cursor-pointer" />
                <CarouselPagination className="absolute left-0 right-0 bottom-[-48]" />
              </Carousel>
            </div>
          </div>
        </section>
      )}
    </section>
  );
}
