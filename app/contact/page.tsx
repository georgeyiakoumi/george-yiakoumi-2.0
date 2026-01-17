import { generatePageMetadata } from "@/lib/metadata";
import { ContactClient } from "@/components/contact-client";

export const generateMetadata = async () => {
  return generatePageMetadata({
    title: "Contact",
    description: "Get in touch to discuss your next project, collaboration opportunities, or just to say hello. I'm always interested in new challenges and creative partnerships.",
    path: "/contact",
  });
};

export default function Contact() {
  return <ContactClient />;
}
