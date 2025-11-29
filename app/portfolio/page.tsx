import Link from "next/link";
import { getProjects } from "@/lib/strapi-queries";

import { SquareLibrary } from "lucide-react";

import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/section";

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
      <header className="flex flex-col gap-6">
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
    </Section>
    
  );
}

export const dynamic = "force-dynamic";