import { ProjectCard } from "@/components/project-card";
import type { ProjectData } from "@/lib/strapi-queries";

interface ProjectsGridProps {
  projects: ProjectData[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="grid w-full lg:grid-cols-2 2xl:grid-cols-3 auto-rows-[16rem] gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
