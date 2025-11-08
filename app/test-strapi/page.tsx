import { getProjects } from '@/lib/strapi-queries';

export default async function TestStrapiPage() {
  const projects = await getProjects({ limit: 3 });

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Strapi Integration Test</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Projects ({projects.length} found)
        </h2>

        {projects.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No projects found</p>
        ) : (
          <div className="space-y-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold mb-2">{project.Title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {project.Description}
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.Tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Date: {project.Date} | Slug: {project.slug}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <p className="text-green-800 dark:text-green-200 font-semibold">
          ✓ Strapi integration is working!
        </p>
        <p className="text-sm text-green-700 dark:text-green-300 mt-2">
          Your Next.js app is successfully fetching data from Strapi.
        </p>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
