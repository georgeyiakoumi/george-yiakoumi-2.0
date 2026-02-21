import { generatePageMetadata } from "@/lib/metadata";
import { CVClient } from "@/components/cv-client";
import { getCVPage, getCareerChapters, getCertificates, getTools } from "@/lib/strapi-queries";

export const revalidate = 3600;

export const generateMetadata = async () => {
  return generatePageMetadata({
    title: "CV - George Yiakoumi",
    description: "Senior UX/UI Designer with expertise in creating intuitive digital experiences for leading companies.",
    path: "/cv",
  });
};

export default async function CVPage() {
  const [cvData, careerChapters, certificates, tools] = await Promise.all([
    getCVPage(),
    getCareerChapters(),
    getCertificates(),
    getTools(),
  ]);

  if (!cvData) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <p>CV data not available</p>
      </div>
    );
  }

  return <CVClient cvData={cvData} careerChapters={careerChapters} certificates={certificates} tools={tools} />;
}
