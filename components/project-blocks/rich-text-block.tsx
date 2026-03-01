import { renderStrapiRichText } from "@/lib/strapi-blocks-renderer";
import type { RichTextBlock as RichTextBlockType } from "@/lib/strapi-queries";

interface RichTextBlockProps {
  block: RichTextBlockType;
}

export function RichTextBlock({ block }: RichTextBlockProps) {
  if (!block.content) return null;

  return (
    <div className="mx-auto w-full md:max-w-lg lg:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl pt-16 mt-16 first:mt-0 first:border-none border-border border-t">
      <section className="px-8 md:px-0 md:max-w-md lg:max-w-xl xl:max-w-2xl mx-auto ">
      {renderStrapiRichText(block.content)}
      </section>
    </div>
  );
}
