import { renderStrapiRichText } from "@/lib/strapi-blocks-renderer";
import type { RichTextBlock as RichTextBlockType } from "@/lib/strapi-queries";

interface RichTextBlockProps {
  block: RichTextBlockType;
}

export function RichTextBlock({ block }: RichTextBlockProps) {
  if (!block.content) return null;

  const startsWithH2 = Array.isArray(block.content) && block.content[0]?.type === 'heading' && block.content[0]?.level === 2;

  return (
    <div className={`mx-auto w-full md:max-w-lg lg:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl px-8 lg:px-0 ${startsWithH2 ? 'mt-16 pt-16 border-border border-t first:mt-0 first:border-none' : ''}`}>
      <section className="md:max-w-md lg:max-w-xl xl:max-w-2xl mx-auto">
      {renderStrapiRichText(block.content)}
      </section>
    </div>
  );
}
