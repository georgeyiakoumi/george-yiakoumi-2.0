import Image from "next/image";
import { getStrapiMediaURL } from "@/lib/strapi";
import { Typography } from "@/components/ui/typography";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselPagination } from "@/components/ui/carousel";
import type { CarouselBlock as CarouselBlockType } from "@/lib/strapi-queries";

interface CarouselBlockProps {
  block: CarouselBlockType;
  projectTitle: string;
}

export function CarouselBlock({ block, projectTitle }: CarouselBlockProps) {
  if (!block.slides || block.slides.length === 0) return null;

  return (
    <figure className="flex flex-col gap-4 items-center w-full my-8">
      <div className="w-full md:max-w-lg lg:max-w-2xl mx-auto px-8">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full"
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
                      className="project-image w-full h-auto rounded-lg"
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
                      sizes="100vw"
                      className="project-image w-full h-auto rounded-lg"
                    />
                  )}
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
          <CarouselPagination className="mt-4" />
        </Carousel>
      </div>
      {block.caption && (
        <Typography variant="muted" className="text-center px-8 max-w-2xl">
          {block.caption}
        </Typography>
      )}
    </figure>
  );
}
