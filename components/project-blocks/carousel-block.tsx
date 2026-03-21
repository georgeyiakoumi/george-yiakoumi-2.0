import Image from "next/image";
import { getStrapiMediaURL } from "@/lib/strapi";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselPagination } from "@/components/ui/carousel";
import { Typography } from "@/components/ui/typography";
import type { CarouselBlock as CarouselBlockType } from "@/lib/strapi-queries";

interface CarouselBlockProps {
  block: CarouselBlockType;
  projectTitle: string;
}

export function CarouselBlock({ block, projectTitle }: CarouselBlockProps) {
  if (!block.slides || block.slides.length === 0) return null;

  return (
    <figure className="flex flex-col gap-12 items-center w-full md:max-w-md lg:max-w-xl xl:max-w-2xl px-8 lg:px-0 mx-auto my-12">
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full border border-border rounded-lg"
      >
        
        <CarouselContent>
          {block.slides.map((slide) => {
            const slideUrl = getStrapiMediaURL(slide.url);
            const isVideo = slide.mime?.startsWith('video/');

            return (
              <CarouselItem key={slide.id}>
                {isVideo ? (
                  <video
                    src={slideUrl || ''}
                    className="w-full h-auto"
                    controls
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    src={slideUrl || ''}
                    alt={slide.alternativeText || projectTitle}
                    width={slide.width || 1920}
                    height={slide.height || 1080}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 32rem, 48rem"
                    className="w-full h-auto rounded-lg overflow-hidden"
                  />
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-4 lg:cursor-pointer" />
        <CarouselNext className="right-4 lg:cursor-pointer" />
      <CarouselPagination className="absolute left-0 right-0 bottom-[-32]" />
    </Carousel>
    {block.caption && (
      <Typography variant="figcaption" className="max-w-2xl">
        {block.caption}
      </Typography>
    )}
    </figure>
  );
}
