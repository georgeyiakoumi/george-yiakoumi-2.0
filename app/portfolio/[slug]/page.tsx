import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { getProjectBySlug, getProjects } from "@/lib/strapi-queries";
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
      <div className="max-w-4xl mx-auto px-5 py-16 md:py-24">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        <article>
          <header className="mb-8">
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <time dateTime={project.Date}>
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
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {project.Title}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              {project.Description}
            </p>

            {project.Tags && project.Tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.Tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    {typeof tag === 'string' ? tag : tag?.name || JSON.stringify(tag)}
                  </span>
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
          </header>

          {bannerImageUrl && (
            <div className="aspect-video relative rounded-lg overflow-hidden mb-12 bg-gray-100 dark:bg-gray-900">
              <Image
                src={bannerImageUrl}
                alt={project.Banner?.alternativeText || project.Title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {project.Challenge && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Challenge
              </h2>
              {renderStrapiRichText(project.Challenge)}
            </section>
          )}

          {project.Solution && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Solution
              </h2>
              {renderStrapiRichText(project.Solution)}
            </section>
          )}

          {project.Role && typeof project.Role !== 'string' && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                My Role
              </h2>
              {renderStrapiRichText(project.Role)}
            </section>
          )}

          {project.Impact && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Impact
              </h2>
              {renderStrapiRichText(project.Impact)}
            </section>
          )}

          {project.Takeaway && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Key Takeaway
              </h2>
              {renderStrapiRichText(project.Takeaway)}
            </section>
          )}

          {project.Images && project.Images.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
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

        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            View all projects
          </Link>
        </footer>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
