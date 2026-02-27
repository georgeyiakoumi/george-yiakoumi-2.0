import { Metadata } from "next";
import { getProjects, getProjectBySlug } from "@/lib/strapi-queries";
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

  const projectImageUrl = project.project_thumb
    ? getStrapiMediaURL(project.project_thumb.url)
    : undefined;

  return generatePageMetadata({
    title: project.title,
    description: project.description,
    path: `/project/${slug}`,
    image: projectImageUrl || SITE_CONFIG.ogImage,
  });
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projects = await getProjects();
  const otherProjects = projects.filter((p) => p.slug !== slug);

  return <ProjectClient project={project} otherProjects={otherProjects} />;
}

export const revalidate = 3600;
