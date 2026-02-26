import { renderStrapiRichText } from "@/lib/strapi-blocks-renderer";
import type { RichTextBlock as RichTextBlockType } from "@/lib/strapi-queries";

interface RichTextBlockProps {
  block: RichTextBlockType;
}

export function RichTextBlock({ block }: RichTextBlockProps) {
  if (!block.content) return null;

  return (
    <div className="max-w-2xl mx-auto px-8">
      {renderStrapiRichText(block.content)}
    </div>
  );
}
