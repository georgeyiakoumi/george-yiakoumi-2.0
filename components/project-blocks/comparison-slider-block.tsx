"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";
import { getStrapiMediaURL } from "@/lib/strapi";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import type { ComparisonSliderBlock as ComparisonSliderBlockType } from "@/lib/strapi-queries";

interface ComparisonSliderBlockProps {
  block: ComparisonSliderBlockType;
  projectTitle: string;
}

export function ComparisonSliderBlock({ block, projectTitle }: ComparisonSliderBlockProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  if (!block.before_image || !block.after_image) return null;

  const beforeImageUrl = getStrapiMediaURL(block.before_image.url);
  const afterImageUrl = getStrapiMediaURL(block.after_image.url);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    handleMove(clientX);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleStart(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);

  return (
    <figure className="flex flex-col gap-4 items-center w-full my-8">
      <div className="relative w-full md:max-w-lg lg:max-w-2xl mx-auto px-8">
        <div
          ref={containerRef}
          className="relative w-full aspect-video cursor-ew-resize select-none"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Image container with overflow hidden */}
          <div className="absolute inset-0 rounded-lg overflow-hidden border-border border">
            {/* Before Image (full) */}
            <Image
              src={beforeImageUrl || ''}
              alt={block.before_label || 'Before'}
              fill
              sizes="100vw"
              className="object-cover pointer-events-none select-none"
              draggable={false}
            />

            {/* After Image (clipped) */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              }}
            >
              <Image
                src={afterImageUrl || ''}
                alt={block.after_label || 'After'}
                fill
                sizes="100vw"
                className="object-cover select-none"
                draggable={false}
              />
            </div>
          </div>

          {/* Slider Handle - outside overflow-hidden container */}
          <div
            className="absolute top-0 bottom-0"
            style={{ left: `${sliderPosition}%` }}
          >
            <Button
              size="icon-sm"
              variant="secondary"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
            >
              <ChevronsLeftRight />
            </Button>
          </div>

        </div>

        {/* Labels */}
        <div className="flex justify-between items-start mt-2">
          {block.before_label && (
            <Typography variant="small" className="text-muted-foreground">
              {block.before_label}
            </Typography>
          )}
          {block.after_label && (
            <Typography variant="small" className="text-muted-foreground">
              {block.after_label}
            </Typography>
          )}
        </div>
      </div>
    </figure>
  );
}
