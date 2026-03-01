import { getProjects } from "@/lib/strapi-queries";
import { generatePageMetadata } from "@/lib/metadata";

import { SquareLibrary } from "lucide-react";

import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { Section } from "@/components/section";
import { Carousel, CarouselContent, CarouselItem, CarouselPagination } from "@/components/ui/carousel";
import { ProjectCard } from "@/components/project-card";
import { ItemGroup } from "@/components/ui/item";

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
    <Section className="px-0 py-32 md:py-24 lg:py-32 justify-center">
      <h1 className="z-10 inline-flex items-center justify-center rounded-md text-sm font-medium bg-background px-4 py-2 fixed top-8 left-8 md:hidden">
        / Projects
      </h1>

      {/* Mobile Carousel */}
      <Carousel className="w-full md:hidden">
        <CarouselContent className="mx-4">
          {projects.map((project) => (
            <CarouselItem key={project.id} className="px-4">
              <ProjectCard project={project} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPagination className="mt-4" />
      </Carousel>

      {/* Desktop List */}
      <ItemGroup className="hidden md:flex w-full max-w-3xl gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} scenario="list" />
        ))}
      </ItemGroup>
    </Section>
  );
}

export const revalidate = 3600;