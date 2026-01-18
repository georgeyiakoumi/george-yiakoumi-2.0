import React from 'react';
import Image from 'next/image';
import { getStrapiMediaURL } from './strapi';
import { cn } from './utils';

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
    content = <code key={index} className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">{content}</code>;
  }

  return <React.Fragment key={index}>{content}</React.Fragment>;
}

function renderBlock(block: RichTextBlock, index: number): React.ReactNode {
  switch (block.type) {
    case 'paragraph':
      const paragraphChildren = block.children?.map((child, i) => renderChild(child, i));
      return <p key={index} className="text-gray-600 dark:text-gray-400 mb-4 last:mb-0">{paragraphChildren}</p>;

    case 'heading':
      const headingChildren = block.children?.map((child, i) => renderChild(child, i));
      const HeadingTag = `h${block.level || 2}` as keyof React.JSX.IntrinsicElements;
      return <HeadingTag key={index} className="text-gray-600 dark:text-gray-400">{headingChildren}</HeadingTag>;

    case 'list':
      const listItems = block.children?.map((child, i) => renderChild(child, i));
      const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
      return <ListTag key={index} className={`text-gray-600 dark:text-gray-400 ${block.format === 'ordered' ? 'list-decimal list-inside' : 'list-disc list-inside'}`}>{listItems}</ListTag>;

    case 'list-item':
      // This shouldn't normally be rendered directly as it's handled by renderChild
      const listItemChildren = block.children?.map((child, i) => renderChild(child, i));
      return <li key={index} className="text-gray-600 dark:text-gray-400">{listItemChildren}</li>;

    case 'quote':
      const quoteChildren = block.children?.map((child, i) => renderChild(child, i));
      return <blockquote key={index} className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic text-gray-600 dark:text-gray-400">{quoteChildren}</blockquote>;

    case 'code':
      const codeChildren = block.children?.map((child, i) => renderChild(child, i));
      return <pre key={index} className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-gray-600 dark:text-gray-400"><code>{codeChildren}</code></pre>;

    case 'link':
      const linkChildren = block.children?.map((child, i) => renderChild(child, i));
      return <a key={index} href={block.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">{linkChildren}</a>;

    default:
      const defaultChildren = block.children?.map((child, i) => renderChild(child, i));
      return <p key={index} className="text-gray-600 dark:text-gray-400">{defaultChildren}</p>;
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
  const imageUrl = hasImage ? getStrapiMediaURL(richTextBlock.Image.url) : null;

  return (
    <>
      <div className={cn("prose prose-lg prose-gray dark:prose-invert max-w-none", className)}>
        {richTextBlock.content.map((block, index) => renderBlock(block, index))}
      </div>

      {imageUrl && (
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900">
          <Image
            src={imageUrl}
            alt={richTextBlock.Image?.alternativeText || 'Section image'}
            fill
            className="object-cover"
          />
        </div>
      )}
    </>
  );
}