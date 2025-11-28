import Image from "next/image";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio"

import { ArrowLeft, ExternalLink, AlertCircle, CheckCircle, Wrench, TrendingUp, Lightbulb  } from "lucide-react";

import { getProjects } from "@/lib/strapi-queries";
import { getStrapiMediaURL } from "@/lib/strapi";
import { renderStrapiRichText } from "@/lib/strapi-blocks-renderer";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
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
    <div className="w-full">
      <section className="flex flex-col gap-8 mx-auto px-8 py-24 items-start xs:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl">
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

            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-100">
              {project.Title}
            </h1>

            <p className="text-xl md:text-lg text-gray-600 dark:text-gray-400">
              {project.Description}
            </p>

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

        <article className="flex flex-col gap-8">
          {project.Challenge && (

            <section className="flex flex-col gap-2">
              <AlertCircle/>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Challenge
              </h2>
              {renderStrapiRichText(project.Challenge)}
            </section>
          )}

          {project.Solution && (
            <section className="flex flex-col gap-2">
              <CheckCircle/>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Solution
              </h2>
              {renderStrapiRichText(project.Solution)}
            </section>
          )}

          {project.Role && typeof project.Role !== 'string' && (
            <section className="flex flex-col gap-2">
              <Wrench/>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                My role
              </h2>
              {renderStrapiRichText(project.Role)}
            </section>
          )}

          {project.Impact && (
            <section className="flex flex-col gap-2">
              <TrendingUp/>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Impact
              </h2>
              {renderStrapiRichText(project.Impact)}
            </section>
          )}

          {project.Takeaway && (
            <section className="flex flex-col gap-2">
              <Lightbulb/>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Key Takeaway
              </h2>
              {renderStrapiRichText(project.Takeaway)}
            </section>
          )}

          {project.Images && project.Images.length > 0 && (
            <section className="flex flex-col gap-2">
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
      </section>
    </div>
  );
}

export const dynamic = "force-dynamic";