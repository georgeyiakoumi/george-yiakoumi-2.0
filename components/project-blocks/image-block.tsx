import Image from "next/image";
import { getStrapiMediaURL } from "@/lib/strapi";
import { Typography } from "@/components/ui/typography";
import type { ImageBlock as ImageBlockType } from "@/lib/strapi-queries";

interface ImageBlockProps {
  block: ImageBlockType;
  projectTitle: string;
}

export function ImageBlock({ block, projectTitle }: ImageBlockProps) {
  if (!block.image) return null;

  const imageUrl = getStrapiMediaURL(block.image.url);
  const sizeClass =
    block.size === 'full' ? 'w-full' :
    block.size === 'small' ? 'w-full md:max-w-md' :
    'w-full md:max-w-lg lg:max-w-2xl'; // contained (default)

  return (
    <figure className="flex flex-col gap-4 items-center w-full my-8">
      <Image
        src={imageUrl || ''}
        alt={block.image.alternativeText || projectTitle}
        width={block.image.width || 1920}
        height={block.image.height || 1080}
        sizes="100vw"
        className={`project-image h-auto ${sizeClass} mx-auto md:border-border md:border md:rounded-lg`}
      />
      {block.caption && (
        <Typography variant="muted" className="text-center px-8 max-w-2xl">
          {block.caption}
        </Typography>
      )}
    </figure>
  );
}
