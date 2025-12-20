import Image from "next/image";
import { HandMetal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { Typography } from "@/components/ui/typography";
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
        <Typography variant="h1">
          {headingText}
        </Typography>
        {paragraphs.map((para, index) => (
          <p key={index} className="text-center text-xl md:text-lg text-muted-foreground">
            {para.children?.[0]?.text || ''}
          </p>
        ))}
      </Section>

      {/* Companies Section */}
      <Section>
        <Typography variant="h2" align="center">
          Had the pleasure of working with
        </Typography>
        
          <div className="w-full grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {aboutData.businesses.map((business) => (
              <ThemedLogo key={business.id} data={business} />
            ))}
          </div>
        
      </Section>

      {/* Tools and Languages Section */}
      <Section>
        <Typography variant="h2" align="center">
          I know my way around
        </Typography>
        <div className="w-full grid gap-8 grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
          {aboutData.tools.map((tool) => (
            <ThemedLogo key={tool.id} data={tool} />
          ))}
        </div>
      </Section>

      {/* Contact CTA Section */}
      <Section>
        <Typography variant="h2" align="center">
          Ready to bring your ideas to life?
        </Typography>
        <Typography variant="lead" align="center">
          I'd love to hear about your project and explore how we can work together.
        </Typography>
        <Button size="lg" href="/contact">
          <HandMetal />
          Get in touch
        </Button>
      </Section>
    </>
  );
}
