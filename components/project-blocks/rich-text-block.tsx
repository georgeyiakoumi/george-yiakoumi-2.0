import { renderStrapiRichText } from "@/lib/strapi-blocks-renderer";
import type { RichTextBlock as RichTextBlockType } from "@/lib/strapi-queries";

interface RichTextBlockProps {
  block: RichTextBlockType;
}

export function RichTextBlock({ block }: RichTextBlockProps) {
  if (!block.content) return null;

  return (
    <div className="px-8 md:px-0 md:max-w-md lg:max-w-xl xl:max-w-2xl mx-auto">
      {renderStrapiRichText(block.content)}
    </div>
  );
}
