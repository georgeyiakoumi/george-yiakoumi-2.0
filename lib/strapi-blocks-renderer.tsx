import React from 'react';
import Image from 'next/image';
import { getStrapiMediaURL } from './strapi';
import { cn } from './utils';
import { Typography } from '@/components/ui/typography';

interface RichTextChild {
  type: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  children?: RichTextChild[];
}

interface RichTextBlock {
  type: string;
  children?: RichTextChild[];
  format?: string;
  level?: number;
  url?: string;
}

interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

interface StrapiRichTextBlock {
  id: number;
  content: RichTextBlock[];
  Image?: StrapiImage | null;
}

function renderChild(child: RichTextChild, index: number): React.ReactNode {
  if (!child.text && !child.children) return null;

  // If this child has nested children (like in list-item), render them recursively
  if (child.children) {
    const nestedContent = child.children.map((nestedChild, i) => renderChild(nestedChild, i));

    switch (child.type) {
      case 'list-item':
        return <li key={index}>{nestedContent}</li>;
      default:
        return <span key={index}>{nestedContent}</span>;
    }
  }

  // Handle text with formatting
  if (!child.text) return null;

  let content: React.ReactNode = child.text;

  if (child.bold) {
    content = <strong key={index}>{content}</strong>;
  }
  if (child.italic) {
    content = <em key={index}>{content}</em>;
  }
  if (child.underline) {
    content = <u key={index}>{content}</u>;
  }
  if (child.strikethrough) {
    content = <s key={index}>{content}</s>;
  }
  if (child.code) {
    content = <Typography key={index} variant="code" as="code">{content}</Typography>;
  }

  return <React.Fragment key={index}>{content}</React.Fragment>;
}

function renderBlock(block: RichTextBlock, index: number): React.ReactNode {
  switch (block.type) {
    case 'paragraph':
      const paragraphChildren = block.children?.map((child, i) => renderChild(child, i));
      return <Typography key={index} variant="muted" className="!text-base leading-7 mb-4 last:mb-0">{paragraphChildren}</Typography>;

    case 'heading':
      const headingChildren = block.children?.map((child, i) => renderChild(child, i));
      const headingVariant = `h${block.level || 2}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      return <Typography key={index} variant={headingVariant} className="mt-8 first:mt-0 mb-4 last:mb-0">{headingChildren}</Typography>;

    case 'list':
      const listItems = block.children?.map((child, i) => renderChild(child, i));
      const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
      return <ListTag key={index} className={`text-muted-foreground mb-4 last:mb-0 pl-5 space-y-2 ${block.format === 'ordered' ? 'list-decimal list-outside' : 'list-disc list-outside'}`}>{listItems}</ListTag>;

    case 'list-item':
      // This shouldn't normally be rendered directly as it's handled by renderChild
      const listItemChildren = block.children?.map((child, i) => renderChild(child, i));
      return <li key={index} className="text-muted-foreground">{listItemChildren}</li>;

    case 'quote':
      const quoteChildren = block.children?.map((child, i) => renderChild(child, i));
      return <Typography key={index} variant="blockquote" className="mb-4 last:mb-0">{quoteChildren}</Typography>;

    case 'code':
      const codeChildren = block.children?.map((child, i) => renderChild(child, i));
      return <pre key={index} className="bg-muted p-4 rounded-lg overflow-x-auto text-muted-foreground mb-4 last:mb-0"><code>{codeChildren}</code></pre>;

    case 'link':
      const linkChildren = block.children?.map((child, i) => renderChild(child, i));
      return <a key={index} href={block.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{linkChildren}</a>;

    default:
      const defaultChildren = block.children?.map((child, i) => renderChild(child, i));
      return <Typography key={index} variant="muted" className="!text-base leading-7">{defaultChildren}</Typography>;
  }
}

export function renderStrapiRichText(
  richTextBlock: StrapiRichTextBlock | RichTextBlock[] | undefined,
  className?: string
): React.ReactNode {
  if (!richTextBlock) {
    return null;
  }

  // Handle new blocks format (direct array)
  if (Array.isArray(richTextBlock)) {
    return (
      <div className={cn("prose prose-lg prose-gray dark:prose-invert max-w-none", className)}>
        {richTextBlock.map((block, index) => renderBlock(block, index))}
      </div>
    );
  }

  // Handle old component-based format (object with content and Image)
  if (!richTextBlock.content) {
    return null;
  }

  const hasImage = richTextBlock.Image && richTextBlock.Image.url;
  const imageUrl = hasImage ? getStrapiMediaURL(richTextBlock.Image?.url) : null;

  return (
    <>
      <div className={cn("prose prose-lg prose-gray dark:prose-invert max-w-none", className)}>
        {richTextBlock.content.map((block, index) => renderBlock(block, index))}
      </div>

      {imageUrl && (
        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={richTextBlock.Image?.alternativeText || 'Section image'}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}
    </>
  );
}