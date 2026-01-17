import { generatePageMetadata } from "@/lib/metadata";
import { HomeClient } from "@/components/home-client";

export const metadata = generatePageMetadata({
  title: "About",
  description: "Product Designer specializing in user experience, interface design, and digital product strategy. I've worked with leading companies to create intuitive digital experiences.",
  path: "/",
});

export default function Home() {
  return <HomeClient />;
}
