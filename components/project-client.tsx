"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import { ArrowLeft } from "@/components/animate-ui/icons/arrow-left";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";

import { getStrapiMediaURL } from "@/lib/strapi";
import { renderStrapiRichText } from "@/lib/strapi-blocks-renderer";
import { Section } from "@/components/section";
import { Typography } from "@/components/ui/typography";
import { ProjectCard } from "@/components/project-card";

interface ProjectClientProps {
  project: any;
  otherProjects: any[];
}

function ContentSection({ title, content }: { title: string; content: any }) {
  if (!content) return null;

  return (
    <Section className="xl:grid xl:grid-cols-[auto_auto_1fr] xl:gap-x-16 [&:nth-child(even)>h2]:xl:order-2 [&:nth-child(even)>div:last-child]:xl:order-0">
      <Typography variant="h2" className="xl:text-center xl:order-0">
        {title}
      </Typography>
      <Separator orientation="vertical" className="xl:h-full xl:order-1" />
      <div className="xl:order-2">
        {renderStrapiRichText(content, "align-center max-w-2xl")}
      </div>
    </Section>
  );
}

export function ProjectClient({ project, otherProjects }: ProjectClientProps) {

  const heroImageUrl = project.project_hero_image
    ? getStrapiMediaURL(project.project_hero_image.url)
    : null;

  const handleBack = () => {
    window.history.back();
  };

  return (
    <section className="place-items-center relative">
      <AnimateIcon animateOnHover asChild>
        <Button onClick={handleBack} variant="secondary" className="bg-background fixed top-8 left-8 md:bottom-8 md:top-auto md:left-8 lg:left-16 z-20">
          <ArrowLeft />
          Back
        </Button>
      </AnimateIcon>

      <header className="flex flex-col gap-8 px-8 items-center justify-center w-full md:max-w-lg lg:max-w-2xl h-screen mx-auto">
        <Typography variant="h1" className="text-center">
          {project.title}
        </Typography>

        <Typography variant="lead" className="text-center">
          {project.description}
        </Typography>

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
        <div className="relative w-full h-screen aspect-[9/12] md:aspect-[10/9] z-1">
          <Image
            src={heroImageUrl}
            alt={project.project_hero_image?.alternativeText || project.title || ''}
            fill

            className="project-image object-cover md:border-border md:border"
            priority
          />
        </div>
      )}

      <article className="flex flex-col w-full">

        <ContentSection title="Challenge" content={project.challenge} />
        <ContentSection title="Solution" content={project.solution} />
        {project.role && typeof project.role !== 'string' && (
          <ContentSection title="My role" content={project.role} />
        )}
        <ContentSection title="Impact" content={project.impact} />
        <ContentSection title="Key takeaway" content={project.takeaway} />

      </article>

      {otherProjects.length > 0 && (
        <section className="flex flex-col mx-auto gap-8 md:max-w-sm lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl min-h-dvh items-center justify-center md:px-0 py-32 w-full px-16 lg:px-24">
          <Typography variant="h2" align="center" className="mb-8">
            Other projects
          </Typography>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {otherProjects.map((otherProject) => (
                <CarouselItem key={otherProject.id} className="xl:basis-1/2 2xl:basis-1/3">
                  <ProjectCard project={otherProject} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      )}
    </section>
  );
}
