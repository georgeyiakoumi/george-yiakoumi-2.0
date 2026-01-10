import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography";
import type { ProjectData } from "@/lib/strapi-queries";

interface ProjectCardProps {
  project: ProjectData;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/project/${project.slug}`} className="xl:h-full">
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
  );
}