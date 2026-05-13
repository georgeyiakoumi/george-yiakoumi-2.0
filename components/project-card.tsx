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
import { Typography } from "@/components/ui/typography";
import type { ProjectData } from "@/lib/strapi-queries";

interface ProjectCardProps {
  project: ProjectData;
  scenario?: "carousel" | "list";
  background?: "muted" | "background";
}

export function ProjectCard({ project, scenario = "carousel", background = "muted" }: ProjectCardProps) {
  const primaryTag = project.tags?.[0]?.name;

  if (scenario === "list") {
    return (
      <Item
        asChild
        variant="outline"
        className={cn(
          "!p-0 overflow-hidden",
          background === "background" && "xl:bg-background xl:[a]:hover:bg-background xl:hover:border-foreground"
        )}
      >
        <Link href={`/project/${project.slug}`}>
          {project.project_thumb && (
            <ItemMedia variant="image" className="size-32 !rounded-none !translate-y-0 !self-center">
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
            <Typography variant="muted" as="div" className="!text-xs pb-2">
              {primaryTag}
            </Typography>
            )}
            <ItemTitle className="xl:text-foreground line-clamp-2">
              {project.title}
            </ItemTitle>
            {project.description && (
              <ItemDescription className="xl:text-muted-foreground">
                {project.description}
              </ItemDescription>
            )}
          </ItemContent>
          <ItemActions className="xl:text-foreground pr-4">
            <ChevronRight className="size-4" />
          </ItemActions>
        </Link>
      </Item>
    );
  }

  return (
    <Item
      variant="outline"
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
            <Typography variant="muted" as="div" className="!text-xs mb-1">
              {primaryTag}
            </Typography>
          )}
          <ItemTitle className="line-clamp-2">
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
