"use client";

import Image from "next/image";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
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

  const featuredImageUrl = project.FeaturedImage
    ? getStrapiMediaURL(project.FeaturedImage.url)
    : null;

  const bannerImageUrl = project.Banner
    ? getStrapiMediaURL(project.Banner.url)
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
          <Typography
            variant="muted"
            as="time"
            dateTime={project.Date}
          >
            {new Date(project.Date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>

          <Typography variant="h1" className="max-w-xl text-center">
            {project.Title}
          </Typography>

          <Typography variant="lead" className="max-w-xl text-center">
            {project.Description}
          </Typography>

          {project.Tags && project.Tags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {project.Tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                >
                  {typeof tag === 'string' ? tag : tag?.name || JSON.stringify(tag)}
                </Badge>
              ))}
            </div>
          )}
      </header>

      {bannerImageUrl && (
        <div className="relative w-full h-[calc(100vh-17rem)] md:h-[calc(100vh-12rem)] aspect-[9/12] md:aspect-[10/9]">
          <Image
            src={bannerImageUrl}
            alt={project.Banner?.alternativeText || project.Title}
            fill
            
            className="object-cover md:border-border md:border"
            priority
          />
        </div>
      )}

      <article className="flex flex-col w-full">

        <ContentSection title="Challenge" content={project.Challenge} />
        <ContentSection title="Solution" content={project.Solution} />
        {project.Role && typeof project.Role !== 'string' && (
          <ContentSection title="My role" content={project.Role} />
        )}
        <ContentSection title="Impact" content={project.Impact} />
        <ContentSection title="Key takeaway" content={project.Takeaway} />

        {project.Images && project.Images.length > 0 && (
          <section className="flex flex-col gap-2 py-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Project gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.Images.map((image, index) => {
                const imageUrl = getStrapiMediaURL(image.url);
                if (!imageUrl) return null;

                return (
                  <div
                    key={image.id || index}
                    className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900"
                  >
                    <Image
                      src={imageUrl}
                      alt={image.alternativeText || `${project.Title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </article>
    </Section>
  );
}

export const dynamic = "force-dynamic";