import { getProjects } from "@/lib/strapi-queries";

import { SquareLibrary } from "lucide-react";

import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { Section } from "@/components/section";
import { Typography } from "@/components/ui/typography";
import { ProjectCard } from "@/components/project-card";

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
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
    
  );
}

export const dynamic = "force-dynamic";