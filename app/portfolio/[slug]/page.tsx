"use client";

import Image from "next/image";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { ArrowLeft } from "@/components/animate-ui/icons/arrow-left";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";

import { getProjects } from "@/lib/strapi-queries";
import { getStrapiMediaURL } from "@/lib/strapi";
import { renderStrapiRichText } from "@/lib/strapi-blocks-renderer";
import { Section } from "@/components/section";
import { Typography } from "@/components/ui/typography";
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
    <Section>
      <Typography variant="small" as="h2" align="center" className="uppercase">
        {title}
      </Typography>
      {renderStrapiRichText(content, "align-center max-w-2xl")}
    </Section>
  );
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const [slug, setSlug] = useState<string>("");
  const [project, setProject] = useState<any>(null);
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

  return (
    <Section className="!h-auto !justify-start !items-start !p-0 relative">
      <AnimateIcon animateOnHover asChild>
        <Button href="/portfolio" variant="link" className="fixed top-8 left-8 md:bottom-8 md:top-auto md:left-8 lg:left-16 z-20">
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

          <dl className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-muted-foreground">
            {project.project_client && (
              <div className="flex gap-2">
                <dt className="font-medium">Client:</dt>
                <dd>{project.project_client}</dd>
              </div>
            )}
            <div className="flex gap-2">
              <dt className="font-medium">Date:</dt>
              <dd>
                <time dateTime={project.date}>
                  {new Date(project.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </time>
              </dd>
            </div>
            {project.project_role && (
              <div className="flex gap-2">
                <dt className="font-medium">Role:</dt>
                <dd>{project.project_role}</dd>
              </div>
            )}
          </dl>
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
    </Section>
  );
}

export const dynamic = "force-dynamic";