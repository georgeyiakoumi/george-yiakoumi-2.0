import { Metadata } from "next";
import { getProjects } from "@/lib/strapi-queries";
import { getStrapiMediaURL } from "@/lib/strapi";
import { generatePageMetadata, SITE_CONFIG } from "@/lib/metadata";
import { ProjectClient } from "@/components/project-client";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return generatePageMetadata({
      title: "Project Not Found",
      description: "The project you're looking for could not be found.",
      path: `/project/${slug}`,
      noIndex: true,
    });
  }

  const projectImageUrl = project.project_hero_image
    ? getStrapiMediaURL(project.project_hero_image.url)
    : undefined;

  return generatePageMetadata({
    title: project.title,
    description: project.description,
    path: `/project/${slug}`,
    image: projectImageUrl || SITE_CONFIG.ogImage,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  return <ProjectClient slug={slug} />;
}

export const dynamic = "force-dynamic";
