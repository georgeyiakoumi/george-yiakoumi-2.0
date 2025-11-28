import Link from "next/link";
import { getProjects } from "@/lib/strapi-queries";

import { SquareLibrary } from "lucide-react";

import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function Portfolio() {
  const projects = await getProjects();

  if (!projects || projects.length === 0) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center px-5">
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
      </div>
    );
  }

  return (
    <div className="w-full">
      <section className="flex flex-col gap-12 mx-auto px-8 py-24 xs:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl">
        <header className="flex flex-col gap-6 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-100">
            Portfolio
          </h1>
          <p className="text-xl md:text-lg text-gray-600 dark:text-gray-400">
            A collection of projects I've worked on
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-2 xl:auto-rows-fr 2xl:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link key={project.id} href={`/portfolio/${project.slug}`} className="xl:h-full">
              <Card className="xl:h-full flex flex-col">
                <CardHeader className="flex-1 !flex !flex-col gap-3">
                  <time dateTime={project.Date} className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(project.Date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </time>
                  <CardTitle className="leading-snug">
                    {project.Title}
                  </CardTitle>
                  <CardDescription>
                    {project.Description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex-wrap gap-1">
                {project.Tags.slice(0, 3).map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                  >
                    {tag.name}
                  </Badge>
                ))}
                {project.Tags.length > 3 && (
                  <Badge variant="secondary">
                    +{project.Tags.length - 3}
                  </Badge>
                )}
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export const dynamic = "force-dynamic";