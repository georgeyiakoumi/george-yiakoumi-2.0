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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ProjectData } from "@/lib/strapi-queries";

interface ProjectCardProps {
  project: ProjectData;
  variant?: "carousel" | "list";
  background?: "muted" | "background";
}

export function ProjectCard({ project, variant = "carousel", background = "muted" }: ProjectCardProps) {
  const year = new Date(project.date).getFullYear();
  const primaryTag = project.tags?.[0]?.name;

  if (variant === "list") {
    return (
      <Item
        asChild
        variant={undefined}
        size={undefined}
        className={cn(
          "!p-0 !gap-0 rounded-xl overflow-hidden !border-0 flex items-center",
          background === "background" && "md:!bg-background xl:!bg-primary xl:hover:!bg-primary/90"
        )}
      >
        <Link href={`/project/${project.slug}`}>
          {project.project_thumb && (
            <ItemMedia variant="image" className="size-32 !rounded-s-xl !rounded-e-none !border-0">
              <Image
                src={project.project_thumb.url}
                alt={project.project_thumb.alternativeText || project.title}
                fill
                className="object-cover"
                sizes="256px"
              />
            </ItemMedia>
          )}
          <ItemContent className="px-4 py-4">
            {primaryTag && (
            <div className="text-xs xl:text-primary-foreground/70 mb-1">
              {year} · {primaryTag}
            </div>
            )}
            <ItemTitle className={cn(background === "background" && "xl:text-primary-foreground")}>
              {project.title}
            </ItemTitle>
            {project.description && (
              <ItemDescription className={cn(background === "background" && "xl:text-primary-foreground/70")}>
                {project.description}
              </ItemDescription>
            )}
          </ItemContent>
          <ItemActions className="pr-4">
            <ChevronRight className="size-4 text-muted-foreground" />
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
