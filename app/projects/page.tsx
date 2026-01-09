import Link from "next/link";
import { getProjects } from "@/lib/strapi-queries";

import { SquareLibrary } from "lucide-react";

import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/section";
import { Typography } from "@/components/ui/typography";

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
      <Typography variant="h1" align="center">
        Projects
      </Typography>

      <div className="w-full grid grid-cols-1 xl:grid-cols-2 xl:auto-rows-fr 2xl:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Link key={project.id} href={`/project/${project.slug}`} className="xl:h-full">
            <Card className="xl:h-full flex flex-col">
              <CardHeader className="flex-1 !flex !flex-col gap-3">
                <Typography
                  variant="muted"
                  as="time"
                  dateTime={project.date}
                >
                  {new Date(project.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </Typography>
                <CardTitle className="leading-snug">
                  {project.project_title}
                </CardTitle>
                <CardDescription>
                  {project.project_description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex-wrap gap-1">
              {project.tags.slice(0, 3).map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                >
                  {tag.name}
                </Badge>
              ))}
              {project.tags.length > 3 && (
                <Badge variant="secondary">
                  +{project.tags.length - 3}
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