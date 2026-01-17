import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/lib/strapi-queries";
import { getStrapiMediaURL } from "@/lib/strapi";

import { SquareLibrary } from "lucide-react";

import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { Section } from "@/components/section";
import { Typography } from "@/components/ui/typography";
import { CursorProvider, CursorFollow } from "@/components/animate-ui/components/animate/cursor";
import { cn } from "@/lib/utils";

export default async function Portfolio() {
  const projects = await getProjects();

  if (!projects || projects.length === 0) {
    return (
      <Section>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="default">
              <SquareLibrary />
            </EmptyMedia>
            <EmptyTitle>
              No projects found
            </EmptyTitle>
            <EmptyDescription>
              Check back soon for updates!
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Section>
    );
  }

  return (
    <Section className="!h-auto !justify-start py-32 md:py-16">
      <Typography variant="h1" align="center" className="mb-8">
        Projects
      </Typography>

      <CursorProvider>
        <CursorFollow side="bottom" align="end">
          View project
        </CursorFollow>

        <div className="grid w-full xl:grid-cols-2 2xl:grid-cols-3 auto-rows-[16rem] gap-8">
          {projects.map((project) => {
            const thumbnailUrl = project.project_thumb
              ? getStrapiMediaURL(project.project_thumb.url)
              : null;

            return (
              <Link
                key={project.id}
                href={`/project/${project.slug}`}
                className="group relative overflow-hidden rounded-3xl bg-background border-border border"
              >
                {/* Background Image */}
                {thumbnailUrl ? (
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={thumbnailUrl}
                      alt={project.project_thumb?.alternativeText || project.project_title}
                      fill
                      className="object-cover lg:opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-800" />
                )}

                {/* Content */}
                <div className="relative p-4 flex flex-col justify-start items-start">
                  <div className="pointer-events-none z-10">
                    <div className="bg-muted p-2 border border-border rounded-lg">
                      <Typography variant="h6" as="h3">
                        {project.project_title}
                      </Typography>
                    </div>
                  </div>
                </div>

               
              </Link>
            );
          })}
        </div>
      </CursorProvider>
    </Section>
  );
}

export const dynamic = "force-dynamic";