"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselPagination } from "@/components/ui/carousel";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

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

function MediaItem({ media, title }: { media: any; title: string }) {
  const mediaUrl = getStrapiMediaURL(media.url);
  const isVideo = media.mime?.startsWith('video/');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isVideo || !videoRef.current) return;

    const video = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Auto-play was prevented, user interaction required
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 } // Play when 50% visible
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [isVideo]);

  if (isVideo) {
    return (
      <div className="relative w-full h-screen aspect-[9/12] md:aspect-[10/9] z-1">
        <video
          ref={videoRef}
          src={mediaUrl || ''}
          className="project-image object-cover md:border-border md:border w-full h-full"
          loop
          muted
          playsInline
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return (
    <Image
      src={mediaUrl || ''}
      alt={media?.alternativeText || title || ''}
      width={1920}
      height={1080}
      sizes="100vw"
      className="project-image w-full h-auto md:max-w-lg lg:max-w-2xl mx-auto md:border-border md:border"
    />
  );
}

export function ProjectClient({ project, otherProjects }: ProjectClientProps) {

  const heroImageUrl = project.project_thumb
    ? getStrapiMediaURL(project.project_thumb.url)
    : null;

  const handleBack = () => {
    window.history.back();
  };

  // Only use first 5 media items
  const displayMedia = project.media ? project.media.slice(0, 5) : [];

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
        <Image
          src={heroImageUrl}
          alt={project.project_thumb?.alternativeText || project.title || ''}
          width={1920}
          height={1080}
          sizes="100vw"
          className="project-image w-full h-auto md:rounded-lg md:max-w-lg lg:max-w-3xl mx-auto md:border-border md:border"
          priority
        />
      )}

      <article className="flex flex-col w-full">

        <ContentSection title="Challenge" content={project.challenge} />

        {displayMedia[0] && (
          <MediaItem media={displayMedia[0]} title={project.title} />
        )}

        <ContentSection title="Solution" content={project.solution} />

        {displayMedia[1] && (
          <MediaItem media={displayMedia[1]} title={project.title} />
        )}

        {project.role && typeof project.role !== 'string' && (
          <>
            <ContentSection title="My role" content={project.role} />

            {displayMedia[2] && (
              <MediaItem media={displayMedia[2]} title={project.title} />
            )}
          </>
        )}

        <ContentSection title="Impact" content={project.impact} />

        {displayMedia[3] && (
          <MediaItem media={displayMedia[3]} title={project.title} />
        )}

        <ContentSection title="Key takeaway" content={project.takeaway} />

      </article>

      {otherProjects.length > 0 && (
        <section className="flex flex-col gap-8 min-h-dvh items-center justify-center w-full mx-auto md:max-w-xl lg:max-w-2xl xl:max-w-4xl 2xl:max-w-7xl">
          <Typography variant="h2" align="center" className="mb-8">
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
                      <ProjectCard project={otherProject} />
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
