"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { getStrapiMediaURL } from "@/lib/strapi";
import { Typography } from "@/components/ui/typography";
import type { ComparisonSliderBlock as ComparisonSliderBlockType } from "@/lib/strapi-queries";

interface ComparisonSliderBlockProps {
  block: ComparisonSliderBlockType;
  projectTitle: string;
}

export function ComparisonSliderBlock({ block, projectTitle }: ComparisonSliderBlockProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

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

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <figure className="flex flex-col gap-4 items-center w-full my-8">
      <div
        ref={containerRef}
        className="relative w-full md:max-w-lg lg:max-w-2xl mx-auto px-8 cursor-ew-resize select-none"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <div className="relative w-full aspect-video rounded-lg overflow-hidden md:border-border md:border">
          {/* Before Image (full) */}
          <Image
            src={beforeImageUrl || ''}
            alt={block.before_label || 'Before'}
            fill
            sizes="100vw"
            className="object-cover"
          />

          {/* After Image (clipped) */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            }}
          >
            <Image
              src={afterImageUrl || ''}
              alt={block.after_label || 'After'}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-foreground">
                <path d="M7 4l-4 6 4 6M13 4l4 6-4 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Labels */}
          {block.before_label && (
            <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-md">
              <Typography variant="small">{block.before_label}</Typography>
            </div>
          )}
          {block.after_label && (
            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-md">
              <Typography variant="small">{block.after_label}</Typography>
            </div>
          )}
        </div>
      </div>
    </figure>
  );
}
