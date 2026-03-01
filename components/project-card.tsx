import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  Item,
  ItemHeader,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";
import type { ProjectData } from "@/lib/strapi-queries";

interface ProjectCardProps {
  project: ProjectData;
  scenario?: "carousel" | "list";
  background?: "muted" | "background";
}

export function ProjectCard({ project, scenario = "carousel", background = "muted" }: ProjectCardProps) {
  const year = new Date(project.date).getFullYear();
  const primaryTag = project.tags?.[0]?.name;

  if (scenario === "list") {
    return (
      <Item
        asChild
        variant="outline"   
        className="p-px"     
      >
        <Link href={`/project/${project.slug}`}>
          {project.project_thumb && (
            <ItemMedia variant="image" className="size-32 !rounded-e-none ">
              <Image
                src={project.project_thumb.url}
                alt={project.project_thumb.alternativeText || project.title}
                fill
                className="object-cover"
                sizes="256px"
              />
            </ItemMedia>
          )}
          <ItemContent>
            {primaryTag && (
            <div className="text-xs text-muted-foreground pb-2">
              {year} · {primaryTag}
            </div>
            )}
            <ItemTitle>
              {project.title}
            </ItemTitle>
            {project.description && (
              <ItemDescription>
                {project.description}
              </ItemDescription>
            )}
          </ItemContent>
          <ItemActions className="pr-4">
            <ChevronRight className="size-4" />
          </ItemActions>
        </Link>
      </Item>
    );
  }

  return (
    <Item
      variant="muted"
      asChild
      className={cn(
        "p-0 rounded-xl overflow-hidden",
        background === "background" && "bg-background",
      )}
    >
      <Link href={`/project/${project.slug}`} className="pb-4">
        {project.project_thumb && (
          <ItemHeader className="relative aspect-video w-full overflow-hidden">
            <Image
              src={project.project_thumb.url}
              alt={project.project_thumb.alternativeText || project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </ItemHeader>
        )}
        <ItemContent className="px-4">
          {primaryTag && (
            <div className="text-xs text-muted-foreground mb-1">
              {year} · {primaryTag}
            </div>
          )}
          <ItemTitle>
            {project.title}
          </ItemTitle>
          {project.description && (
            <ItemDescription>{project.description}</ItemDescription>
          )}
        </ItemContent>
      </Link>
    </Item>
  );
}
