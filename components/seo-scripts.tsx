import { generatePersonJsonLd, generateWebsiteJsonLd } from "@/lib/metadata";

export async function SEOScripts() {
  const personSchema = await generatePersonJsonLd();
  const websiteSchema = await generateWebsiteJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([personSchema, websiteSchema]),
      }}
    />
  );
}
