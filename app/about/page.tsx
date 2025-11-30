import Image from "next/image";
import { HandMetal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TOOLS } from "@/lib/constants";
import { LogoItem } from "@/components/logo-item";
import { Section } from "@/components/section";
import { getAboutPage } from "@/lib/strapi-queries";
import { ThemedLogo } from "./ThemedLogo";

export default async function About() {
  const aboutData = await getAboutPage();

  if (!aboutData) {
    return (
      <Section>
        <h1>Unable to load about page</h1>
        <p>Please try again later.</p>
      </Section>
    );
  }

  // Extract heading, avatar, and paragraphs from content
  const heading = aboutData.content.find(block => block.type === 'heading');
  const avatarBlock = aboutData.content.find(block => block.type === 'image');
  const paragraphs = aboutData.content.filter(block => block.type === 'paragraph');

  const headingText = heading?.children?.[0]?.text || "Hello there 👋🏼";
  const avatarUrl = avatarBlock?.image?.url;
  const avatarAlt = avatarBlock?.image?.alternativeText || "Profile photo";

  return (
    <>
      {/* Avatar and Bio Section */}
      <Section as="header">
        {avatarUrl && (
          <Image
            src={avatarUrl}
            alt={avatarAlt}
            width={128}
            height={128}
            className="size-32 rounded-full mx-auto object-cover"
            priority
          />
        )}
        <h1 className="text-center text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-100">
          {headingText}
        </h1>
        {paragraphs.map((para, index) => (
          <p key={index} className="text-center text-xl md:text-lg text-gray-600 dark:text-gray-400">
            {para.children?.[0]?.text || ''}
          </p>
        ))}
      </Section>

      {/* Companies Section */}
      <Section>
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Had the pleasure of working with
        </h2>
        
          <div className="w-full grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            {aboutData.businesses.map((business) => (
              <ThemedLogo key={business.id} data={business} />
            ))}
          </div>
        
      </Section>

      {/* Tools and Languages Section */}
      <Section>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
          I know my way around
        </h2>
        <div className="w-full grid gap-8 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
          {TOOLS.map((tool) => (
            <LogoItem
              key={tool.name}
              name={tool.name}
              logo={tool.logo}
              ariaLabel={tool.ariaLabel}
              className={tool.className}
            />
          ))}
        </div>
      </Section>

      {/* Contact CTA Section */}
      <Section>
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Ready to bring your ideas to life?
        </h2>
        <p className="text-center text-lg text-gray-600 dark:text-gray-400">
          I'd love to hear about your project and explore how we can work together.
        </p>
        <Button size="lg" href="/contact">
          <HandMetal />
          Get in touch
        </Button>
      </Section>
    </>
  );
}
