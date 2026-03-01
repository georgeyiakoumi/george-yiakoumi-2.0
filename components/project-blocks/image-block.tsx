import Image from "next/image";
import { getStrapiMediaURL } from "@/lib/strapi";
import type { ImageBlock as ImageBlockType } from "@/lib/strapi-queries";

interface ImageBlockProps {
  block: ImageBlockType;
  projectTitle: string;
}

export function ImageBlock({ block, projectTitle }: ImageBlockProps) {
  if (!block.image) return null;

  const imageUrl = getStrapiMediaURL(block.image.url);

  const sizes =
    block.size === 'full' ? '100vw' :
    block.size === 'small' ? '(max-width: 768px) 100vw, 28rem' :
    '(max-width: 768px) 100vw, (max-width: 1024px) 32rem, 48rem'; // contained (default)

  return (
    <figure className="flex flex-col gap-4 items-center w-full px-8 my-8">
      <Image
        src={imageUrl || ''}
        alt={block.image.alternativeText || projectTitle}
        width={block.image.width || 1920}
        height={block.image.height || 1080}
        sizes={sizes}
        className="h-auto md:max-w-md lg:max-w-xl xl:max-w-2xl mx-auto border-border border rounded-lg select-none"
        draggable={false}
      />
      {block.caption && (
        <figcaption className="text-center px-8 max-w-2xl text-sm text-muted-foreground">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}
