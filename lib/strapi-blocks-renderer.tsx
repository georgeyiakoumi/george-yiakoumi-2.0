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
  url?: string;
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

// Custom tag regex: matches {{tagname:content}} patterns
const CUSTOM_TAG_REGEX = /\{\{(\w+):(.+?)\}\}/g;

// Inline effects map: tag name → className
const INLINE_EFFECTS: Record<string, string> = {
  highlight: 'bg-primary/15 text-primary px-1 py-0.5 rounded-sm font-medium',
  underline: 'underline decoration-primary decoration-2 underline-offset-4',
};

/**
 * Check if a paragraph block is a block-level custom tag (e.g. {{eyebrow:text}}).
 * Returns the tag name and content if it matches, null otherwise.
 */
function extractBlockTag(block: RichTextBlock): { tag: string; content: string } | null {
  if (block.type !== 'paragraph') return null;
  if (!block.children || block.children.length !== 1) return null;

  const child = block.children[0];
  if (!child.text) return null;

  const trimmed = child.text.trim();
  const match = trimmed.match(/^\{\{(\w+):(.+?)\}\}$/);
  if (!match) return null;

  return { tag: match[1].toLowerCase(), content: match[2].trim() };
}

/**
 * Parse inline custom tags within a text string.
 * Returns an array of React nodes with tags replaced by styled elements.
 */
function parseInlineTags(text: string, keyPrefix: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let matchIndex = 0;

  const regex = new RegExp(CUSTOM_TAG_REGEX.source, 'g');
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const tagName = match[1].toLowerCase();
    const tagContent = match[2];
    const effectClass = INLINE_EFFECTS[tagName];

    if (effectClass) {
      parts.push(
        <span key={`${keyPrefix}-tag-${matchIndex}`} className={effectClass}>
          {tagContent}
        </span>
      );
    } else {
      // Unknown inline tag — render as plain text
      parts.push(match[0]);
    }

    lastIndex = match.index + match[0].length;
    matchIndex++;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

/**
 * Check if a text string contains any custom tag patterns.
 */
function hasInlineTags(text: string): boolean {
  return CUSTOM_TAG_REGEX.test(text);
}

function renderChild(child: RichTextChild, index: number): React.ReactNode {
  if (!child.text && !child.children) return null;

  // If this child has nested children (like in list-item), render them recursively
  if (child.children) {
    const nestedContent = child.children.map((nestedChild, i) => renderChild(nestedChild, i));

    switch (child.type) {
      case 'list-item':
        return <li key={index}>{nestedContent}</li>;
      case 'link':
        return <a key={index} href={child.url} target="_blank" rel="noopener noreferrer" className="!underline hover:!no-underline !text-primary">{nestedContent}</a>;
      default:
        return <span key={index}>{nestedContent}</span>;
    }
  }

  // Handle text with formatting
  if (!child.text) return null;

  // Check for inline custom tags
  let content: React.ReactNode;
  if (hasInlineTags(child.text)) {
    const parsed = parseInlineTags(child.text, `child-${index}`);
    content = parsed.length === 1 ? parsed[0] : <>{parsed}</>;
  } else {
    content = child.text;
  }

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

function renderBlock(block: RichTextBlock, index: number, followsEyebrow?: boolean): React.ReactNode {
  switch (block.type) {
    case 'paragraph': {
      const paragraphChildren = block.children?.map((child, i) => renderChild(child, i));
      return <Typography key={index} variant="muted" className="!text-base leading-7 mb-4 last:mb-0">{paragraphChildren}</Typography>;
    }

    case 'heading': {
      const headingChildren = block.children?.map((child, i) => renderChild(child, i));
      const headingVariant = `h${block.level || 2}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      return (
        <Typography
          key={index}
          variant={headingVariant}
          className={cn(
            "mb-4 last:mb-0",
            followsEyebrow ? "mt-0" : "mt-8 first:mt-0"
          )}
        >
          {headingChildren}
        </Typography>
      );
    }

    case 'list': {
      const listItems = block.children?.map((child, i) => renderChild(child, i));
      const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
      return <ListTag key={index} className={`text-muted-foreground mb-4 last:mb-0 pl-5 space-y-2 ${block.format === 'ordered' ? 'list-decimal list-outside' : 'list-disc list-outside'}`}>{listItems}</ListTag>;
    }

    case 'list-item': {
      // This shouldn't normally be rendered directly as it's handled by renderChild
      const listItemChildren = block.children?.map((child, i) => renderChild(child, i));
      return <li key={index} className="text-muted-foreground">{listItemChildren}</li>;
    }

    case 'quote': {
      const quoteChildren = block.children?.map((child, i) => renderChild(child, i));
      return <Typography key={index} variant="blockquote" className="mb-4 last:mb-0">{quoteChildren}</Typography>;
    }

    case 'code': {
      const codeChildren = block.children?.map((child, i) => renderChild(child, i));
      return <pre key={index} className="bg-muted p-4 rounded-lg overflow-x-auto text-muted-foreground mb-4 last:mb-0"><code>{codeChildren}</code></pre>;
    }

    case 'link': {
      const linkChildren = block.children?.map((child, i) => renderChild(child, i));
      return <a key={index} href={block.url} target="_blank" rel="noopener noreferrer" className="!underline hover:!no-underline !text-primary">{linkChildren}</a>;
    }

    default: {
      const defaultChildren = block.children?.map((child, i) => renderChild(child, i));
      return <Typography key={index} variant="muted" className="!text-base leading-7">{defaultChildren}</Typography>;
    }
  }
}

/**
 * Render an eyebrow label — a small uppercase tag that sits above a heading.
 */
function renderEyebrow(text: string, key: number): React.ReactNode {
  return (
    <Typography
      key={key}
      variant="overline"
      as="span"
      className="mb-2 block text-xs font-bold uppercase tracking-widest text-foreground/80"
    >
      {text}
    </Typography>
  );
}

/**
 * Render blocks with custom tag awareness.
 * Block-level tags (eyebrow) are extracted and rendered separately,
 * with the following heading getting tightened spacing.
 */
function renderBlocksWithCustomTags(blocks: RichTextBlock[]): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  let eyebrowPending = false;

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const blockTag = extractBlockTag(block);

    if (blockTag) {
      switch (blockTag.tag) {
        case 'eyebrow':
          elements.push(renderEyebrow(blockTag.content, i));
          eyebrowPending = true;
          continue;
        default:
          // Unknown block-level tag — render as normal paragraph
          break;
      }
    }

    elements.push(renderBlock(block, i, eyebrowPending));
    eyebrowPending = false;
  }

  return elements;
}

/**
 * Check if any blocks contain custom tag patterns.
 */
function blocksHaveCustomTags(blocks: RichTextBlock[]): boolean {
  for (const block of blocks) {
    if (extractBlockTag(block)) return true;
    if (block.children) {
      for (const child of block.children) {
        if (child.text && hasInlineTags(child.text)) return true;
      }
    }
  }
  return false;
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
    const useCustomTags = blocksHaveCustomTags(richTextBlock);
    return (
      <div className={cn("prose prose-lg prose-gray dark:prose-invert max-w-none", className)}>
        {useCustomTags
          ? renderBlocksWithCustomTags(richTextBlock)
          : richTextBlock.map((block, index) => renderBlock(block, index))
        }
      </div>
    );
  }

  // Handle old component-based format (object with content and Image)
  if (!richTextBlock.content) {
    return null;
  }

  const hasImage = richTextBlock.Image && richTextBlock.Image.url;
  const imageUrl = hasImage ? getStrapiMediaURL(richTextBlock.Image?.url) : null;
  const useCustomTags = blocksHaveCustomTags(richTextBlock.content);

  return (
    <>
      <div className={cn("prose prose-lg prose-gray dark:prose-invert max-w-none", className)}>
        {useCustomTags
          ? renderBlocksWithCustomTags(richTextBlock.content)
          : richTextBlock.content.map((block, index) => renderBlock(block, index))
        }
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