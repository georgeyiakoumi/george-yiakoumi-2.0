import Image from "next/image";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio"

import { ArrowLeft, ExternalLink, AlertCircle, CheckCircle, Wrench, TrendingUp, Lightbulb, Github  } from "lucide-react";

import { getProjects } from "@/lib/strapi-queries";
import { getStrapiMediaURL } from "@/lib/strapi";
import { renderStrapiRichText } from "@/lib/strapi-blocks-renderer";
import { Section } from "@/components/section";
import { Typography } from "@/components/ui/typography";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function ContentSection({ title, content }: { title: string; content: any }) {
  if (!content) return null;

  return (
    <Section>
      <Typography variant="h2">
        {title}
      </Typography>
      {renderStrapiRichText(content)}
    </Section>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug} = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const featuredImageUrl = project.FeaturedImage
    ? getStrapiMediaURL(project.FeaturedImage.url)
    : null;

  const bannerImageUrl = project.Banner
    ? getStrapiMediaURL(project.Banner.url)
    : null;

  return (
    <Section className="!h-auto !justify-start !items-start py-32 md:py-16 md:pb-0">
      <Button href="/portfolio" variant="link">
        <ArrowLeft />
        Back to portfolio
      </Button>

        <header className="flex flex-col gap-4">
            <time 
              dateTime={project.Date}
              className="text-sm text-gray-500 dark:text-gray-400"
              >
              {new Date(project.Date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
              
              {project.Client && (
                <>
                  <span>•</span>
                  <span>{project.Client}</span>
                </>
              )}
              {project.Role && typeof project.Role === 'string' && (
                <>
                  <span>•</span>
                  <span>{project.Role}</span>
                </>
              )}

            <Typography variant="h1">
              {project.Title}
            </Typography>

            <Typography variant="lead">
              {project.Description}
            </Typography>

            {project.Tags && project.Tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
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

            {(project.ProjectURL || project.GitHubURL) && (
              <div className="flex flex-wrap gap-3">
                {project.ProjectURL && (
                  <a
                    href={project.ProjectURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Project
                  </a>
                )}
                {project.GitHubURL && (
                  <a
                    href={project.GitHubURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                )}
              </div>
            )}

            {bannerImageUrl && (
            
              <AspectRatio ratio={16 / 4}>
                <Image
                  src={bannerImageUrl}
                  alt={project.Banner?.alternativeText || project.Title}
                  fill
                  
                  className="object-cover border-border border"
                  priority
                />
              </AspectRatio>
            
          )}
        </header>

        <article className="flex flex-col">

          <ContentSection title="Challenge" content={project.Challenge} />
          <ContentSection title="Solution" content={project.Solution} />
          {project.Role && typeof project.Role !== 'string' && (
            <ContentSection title="My role" content={project.Role} />
          )}
          <ContentSection title="Impact" content={project.Impact} />
          <ContentSection title="Key Takeaway" content={project.Takeaway} />

          {project.Images && project.Images.length > 0 && (
            <section className="flex flex-col gap-2 py-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Project Gallery
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