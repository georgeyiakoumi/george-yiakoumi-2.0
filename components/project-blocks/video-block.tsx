"use client";

import { useRef, useEffect } from "react";
import { getStrapiMediaURL } from "@/lib/strapi";
import { Typography } from "@/components/ui/typography";
import type { VideoBlock as VideoBlockType } from "@/lib/strapi-queries";

interface VideoBlockProps {
  block: VideoBlockType;
}

export function VideoBlock({ block }: VideoBlockProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Auto-play when scrolled into view
  useEffect(() => {
    if (!block.file || !videoRef.current) return;

    const video = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Auto-play was prevented
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [block.file]);

  // Embedded URL (YouTube/Vimeo)
  if (block.url) {
    return (
      <figure className="flex flex-col gap-4 items-center w-full my-8">
        <div className="w-full md:max-w-lg lg:max-w-2xl mx-auto px-8">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden md:border-border md:border">
            <iframe
              src={block.url}
              title="Project video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
        {block.caption && (
          <Typography variant="muted" className="text-center px-8 max-w-2xl">
            {block.caption}
          </Typography>
        )}
      </figure>
    );
  }

  // Self-hosted video file
  if (block.file) {
    const videoUrl = getStrapiMediaURL(block.file.url);

    return (
      <figure className="flex flex-col gap-4 items-center w-full my-8">
        <div className="w-full md:max-w-lg lg:max-w-2xl mx-auto px-8">
          <video
            ref={videoRef}
            src={videoUrl || ''}
            className="project-image w-full h-auto rounded-lg md:border-border md:border"
            loop
            muted
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        </div>
        {block.caption && (
          <Typography variant="muted" className="text-center px-8 max-w-2xl">
            {block.caption}
          </Typography>
        )}
      </figure>
    );
  }

  return null;
}
