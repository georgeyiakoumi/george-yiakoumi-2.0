import { getProjects } from "@/lib/strapi-queries";
import { generatePageMetadata } from "@/lib/metadata";

import { SquareLibrary } from "lucide-react";

import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { Section } from "@/components/section";
import { Typography } from "@/components/ui/typography";
import { CursorProvider, CursorFollow } from "@/components/animate-ui/components/animate/cursor";
import { ProjectCard } from "@/components/project-card";

export const generateMetadata = async () => {
  return generatePageMetadata({
    title: "Projects",
    description: "Explore my portfolio of design projects, case studies, and UX/UI work. See how I solve complex problems through thoughtful design and user-centered solutions.",
    path: "/projects",
  });
};

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
    <Section className="!h-auto !justify-start py-32 md:py-24 lg:py-32 2xl:py-0 2xl:!justify-center">
      <Typography variant="h1" align="center" className="mb-8">
        Projects
      </Typography>

      <CursorProvider>
        <CursorFollow side="bottom" align="end">
          View project
        </CursorFollow>

        <div className="grid w-full lg:grid-cols-2 2xl:grid-cols-3 auto-rows-[16rem] gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </CursorProvider>
    </Section>
  );
}

export const revalidate = 3600;