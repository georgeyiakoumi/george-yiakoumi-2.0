"use client";

import Image from "next/image";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import { ArrowLeft } from "@/components/animate-ui/icons/arrow-left";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";

import { getProjects } from "@/lib/strapi-queries";
import { getStrapiMediaURL } from "@/lib/strapi";
import { renderStrapiRichText } from "@/lib/strapi-blocks-renderer";
import { Section } from "@/components/section";
import { Typography } from "@/components/ui/typography";
import { ProjectCard } from "@/components/project-card";
import { useEffect, useState } from "react";
import ProjectLoading from "./loading";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function ContentSection({ title, content }: { title: string; content: any }) {
  if (!content) return null;

  return (
    <Section className="relative">
      <Typography variant="h2">
        {title}
      </Typography>
      {renderStrapiRichText(content, "align-center max-w-2xl")}
    </Section>
  );
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const [slug, setSlug] = useState<string>("");
  const [project, setProject] = useState<any>(null);
  const [otherProjects, setOtherProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(({ slug: resolvedSlug }) => {
      setSlug(resolvedSlug);
      getProjects().then((projects) => {
        const foundProject = projects.find((p) => p.slug === resolvedSlug);
        if (!foundProject) {
          notFound();
        }
        setProject(foundProject);
        // Filter out the current project from the list
        setOtherProjects(projects.filter((p) => p.slug !== resolvedSlug));
        setLoading(false);
      });
    });
  }, [params]);

  if (loading) {
    return <ProjectLoading />;
  }

  if (!project) {
    return null;
  }

  const heroImageUrl = project.project_hero_image
    ? getStrapiMediaURL(project.project_hero_image.url)
    : null;

  const handleBack = () => {
    window.history.back();
  };

  return (
    <Section className="!h-auto !justify-start !items-start !p-0 relative">
      <AnimateIcon animateOnHover asChild>
        <Button onClick={handleBack} variant="link" className="fixed top-8 left-8 md:bottom-8 md:top-auto md:left-8 lg:left-16 z-20">
          <ArrowLeft />
          Back
        </Button>
      </AnimateIcon>

      <header className="flex flex-col gap-8 px-8 place-items-center justify-center w-full h-screen">
          <Typography variant="h1" className="max-w-xl text-center">
            {project.project_title}
          </Typography>

          <Typography variant="lead" className="max-w-xl text-center">
            {project.project_description}
          </Typography>

          <Typography variant="muted" className="text-center flex items-center gap-2 flex-wrap justify-center">
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
        <div className="relative w-full h-[calc(100vh-17rem)] md:h-[calc(100vh-12rem)] aspect-[9/12] md:aspect-[10/9]">
          <Image
            src={heroImageUrl}
            alt={project.project_hero_image?.alternativeText || project.project_title}
            fill

            className="object-cover md:border-border md:border"
            priority
          />
        </div>
      )}

      <article className="flex flex-col w-full">

        <ContentSection title="Challenge" content={project.challenge} />
        <ContentSection title="Solution" content={project.solution} />
        {project.role && typeof project.Role !== 'string' && (
          <ContentSection title="My role" content={project.role} />
        )}
        <ContentSection title="Impact" content={project.impact} />
        <ContentSection title="Key takeaway" content={project.takeaway} />

      </article>

      {otherProjects.length > 0 && (
        <Section className="!max-w-none !w-full px-16 md:px-16 lg:px-24">
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
        </Section>
      )}
    </Section>
  );
}

export const dynamic = "force-dynamic";