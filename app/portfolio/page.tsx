import Link from "next/link";
import { getProjects } from "@/lib/strapi-queries";

export default async function Portfolio() {
  const projects = await getProjects();

  if (!projects || projects.length === 0) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center px-5">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">No projects found</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Check back soon for updates!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-5 py-16 md:py-24">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Portfolio
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of projects I've worked on
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              className="group block rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
            >
              <div className="p-6">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {new Date(project.Date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </div>

                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.Title}
                </h2>

                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {project.Description}
                </p>

                {project.Tags && project.Tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.Tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      >
                        {tag.name}
                      </span>
                    ))}
                    {project.Tags.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        +{project.Tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
