import Image from "next/image";
import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import { getStrapiMediaURL } from "@/lib/strapi";
import type { ProjectData } from "@/lib/strapi-queries";

interface ProjectCardProps {
  project: ProjectData;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const thumbnailUrl = project.project_thumb
    ? getStrapiMediaURL(project.project_thumb.url)
    : null;

  return (
    <Link
      href={`/project/${project.slug}`}
      className="group relative overflow-hidden rounded-3xl bg-background border-border border block h-full w-full"
      style={{ minHeight: '16rem' }}
    >
      {/* Background Image */}
      {thumbnailUrl ? (
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={project.project_thumb?.alternativeText || project.title || ''}
            fill
            className="object-cover lg:opacity-50 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-800" />
      )}

      {/* Content */}
      <div className="relative p-4 flex flex-col justify-center items-center h-full">
        <div className="pointer-events-none max-w-3xs">
          <div className="bg-muted/80 backdrop-blur-sm px-3 py-2 border border-border rounded-lg">
            <Typography variant="small" as="h3" className="text-center">
              {project.title}
            </Typography>
          </div>
        </div>
      </div>
    </Link>
  );
}