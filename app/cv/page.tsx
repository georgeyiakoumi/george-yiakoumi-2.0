import { generatePageMetadata } from "@/lib/metadata";
import { CVClient } from "@/components/cv-client";

export const generateMetadata = async () => {
  return generatePageMetadata({
    title: "CV - George Yiakoumi",
    description: "Senior UX/UI Designer with expertise in creating intuitive digital experiences for leading companies.",
    path: "/cv",
  });
};

export default function CVPage() {
  return <CVClient />;
}
