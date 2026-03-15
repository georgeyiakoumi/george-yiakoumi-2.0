import { generatePageMetadata } from "@/lib/metadata";
import { getAboutPage, getTools, getBusinesses, getProjects } from "@/lib/strapi-queries";
import { HomeContent } from "@/components/home-content";

export const generateMetadata = async () => {
  return generatePageMetadata({
    title: "About",
    description: "Product Designer specializing in user experience, interface design, and digital product strategy. I've worked with leading companies to create intuitive digital experiences.",
    path: "/",
  });
};

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  // Fetch all data in parallel on the server
  const [aboutData, tools, businesses, projects] = await Promise.all([
    getAboutPage(),
    getTools(),
    getBusinesses(),
    getProjects({ limit: 1 }),
  ]);

  return <HomeContent aboutData={aboutData} tools={tools} businesses={businesses} latestProject={projects[0] ?? null} />;
}
