import Image from "next/image";
import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import { getStrapiMediaURL } from "@/lib/strapi";
import type { ProjectData } from "@/lib/strapi-queries";

interface ProjectCardProps {
  project: ProjectData;
  disableHoverScale?: boolean;
}

export function ProjectCard({ project, disableHoverScale = false }: ProjectCardProps) {
  const thumbnailUrl = project.project_thumb
    ? getStrapiMediaURL(project.project_thumb.url)
    : null;

  return (
    <Link
      href={`/project/${project.slug}`}
      className={`group relative overflow-hidden rounded-3xl bg-background border-border border block h-full w-full motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out motion-safe:active:scale-[0.97] motion-reduce:transition-none ${!disableHoverScale ? 'motion-safe:xl:hover:scale-105 xl:will-change-transform' : ''}`}
      style={{ minHeight: '16rem' }}
    >
      {/* Background Image */}
      {thumbnailUrl ? (
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={project.project_thumb?.alternativeText || project.title || ''}
            fill
            className="object-cover lg:opacity-50 lg:blur-[2px] group-hover:opacity-100 group-hover:blur-0 motion-safe:transition-[opacity,filter] motion-safe:duration-300 motion-safe:ease-out motion-reduce:transition-none lg:will-change-[opacity,filter]"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-800" />
      )}

      {/* Content */}
      <div className="relative p-4 flex flex-col justify-center items-center h-full">
        <div className="pointer-events-none max-w-3xs">
          <div className="bg-primary !text-primary-foreground px-3 py-2 rounded-md motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out motion-reduce:transition-none motion-safe:xl:group-hover:bg-primary/90">
            <Typography variant="p" as="h3" className="text-center md:text-sm md:font-medium md:leading-5 !text-primary-foreground">
              {project.title}
            </Typography>
          </div>
        </div>
      </div>
    </Link>
  );
}