"use client"

import React from "react"

import { cn } from "@/lib/utils"

export interface ProgressiveBlurProps {
  className?: string
  height?: string
  width?: string
  position?: "top" | "bottom" | "both" | "left" | "right"
  orientation?: "vertical" | "horizontal"
  blurLevels?: number[]
  children?: React.ReactNode
}

export function ProgressiveBlur({
  className,
  height = "30%",
  width = "30%",
  position = "bottom",
  orientation = "vertical",
  blurLevels = [0.5, 1, 2, 4, 8, 16, 32, 64],
}: ProgressiveBlurProps) {
  // Create array with length equal to blurLevels.length - 2 (for before/after pseudo elements)
  const divElements = Array(blurLevels.length - 2).fill(null)

  const isHorizontal = orientation === "horizontal"
  const isVertical = orientation === "vertical"

  return (
    <div
      className={cn(
        "gradient-blur pointer-events-none absolute z-10",
        className,
        isVertical && "inset-x-0",
        isHorizontal && "inset-y-0",
        position === "top" && "top-0",
        position === "bottom" && "bottom-0",
        position === "left" && "left-0",
        position === "right" && "right-0",
        position === "both" && (isVertical ? "inset-y-0" : "inset-x-0")
      )}
      style={{
        height: isVertical ? (position === "both" ? "100%" : height) : "100%",
        width: isHorizontal ? (position === "both" ? "100%" : width) : "100%",
      }}
    >
      {/* First blur layer (pseudo element) */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          backdropFilter: `blur(${blurLevels[0]}px)`,
          WebkitBackdropFilter: `blur(${blurLevels[0]}px)`,
          maskImage:
            isVertical && position === "bottom"
              ? `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)`
              : isVertical && position === "top"
                ? `linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)`
                : isVertical && position === "both"
                  ? `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`
                  : isHorizontal && position === "right"
                    ? `linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)`
                    : isHorizontal && position === "left"
                      ? `linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)`
                      : `linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`,
          WebkitMaskImage:
            isVertical && position === "bottom"
              ? `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)`
              : isVertical && position === "top"
                ? `linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)`
                : isVertical && position === "both"
                  ? `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`
                  : isHorizontal && position === "right"
                    ? `linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)`
                    : isHorizontal && position === "left"
                      ? `linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)`
                      : `linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`,
        }}
      />

      {/* Middle blur layers */}
      {divElements.map((_, index) => {
        const blurIndex = index + 1
        const startPercent = blurIndex * 12.5
        const midPercent = (blurIndex + 1) * 12.5
        const endPercent = (blurIndex + 2) * 12.5

        const maskGradient =
          isVertical && position === "bottom"
            ? `linear-gradient(to bottom, rgba(0,0,0,0) ${startPercent}%, rgba(0,0,0,1) ${midPercent}%, rgba(0,0,0,1) ${endPercent}%, rgba(0,0,0,0) ${endPercent + 12.5}%)`
            : isVertical && position === "top"
              ? `linear-gradient(to top, rgba(0,0,0,0) ${startPercent}%, rgba(0,0,0,1) ${midPercent}%, rgba(0,0,0,1) ${endPercent}%, rgba(0,0,0,0) ${endPercent + 12.5}%)`
              : isVertical && position === "both"
                ? `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`
                : isHorizontal && position === "right"
                  ? `linear-gradient(to right, rgba(0,0,0,0) ${startPercent}%, rgba(0,0,0,1) ${midPercent}%, rgba(0,0,0,1) ${endPercent}%, rgba(0,0,0,0) ${endPercent + 12.5}%)`
                  : isHorizontal && position === "left"
                    ? `linear-gradient(to left, rgba(0,0,0,0) ${startPercent}%, rgba(0,0,0,1) ${midPercent}%, rgba(0,0,0,1) ${endPercent}%, rgba(0,0,0,0) ${endPercent + 12.5}%)`
                    : `linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`

        return (
          <div
            key={`blur-${index}`}
            className="absolute inset-0"
            style={{
              zIndex: index + 2,
              backdropFilter: `blur(${blurLevels[blurIndex]}px)`,
              WebkitBackdropFilter: `blur(${blurLevels[blurIndex]}px)`,
              maskImage: maskGradient,
              WebkitMaskImage: maskGradient,
            }}
          />
        )
      })}

      {/* Last blur layer (pseudo element) */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: blurLevels.length,
          backdropFilter: `blur(${blurLevels[blurLevels.length - 1]}px)`,
          WebkitBackdropFilter: `blur(${blurLevels[blurLevels.length - 1]}px)`,
          maskImage:
            isVertical && position === "bottom"
              ? `linear-gradient(to bottom, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)`
              : isVertical && position === "top"
                ? `linear-gradient(to top, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)`
                : isVertical && position === "both"
                  ? `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`
                  : isHorizontal && position === "right"
                    ? `linear-gradient(to right, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)`
                    : isHorizontal && position === "left"
                      ? `linear-gradient(to left, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)`
                      : `linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`,
          WebkitMaskImage:
            isVertical && position === "bottom"
              ? `linear-gradient(to bottom, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)`
              : isVertical && position === "top"
                ? `linear-gradient(to top, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)`
                : isVertical && position === "both"
                  ? `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`
                  : isHorizontal && position === "right"
                    ? `linear-gradient(to right, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)`
                    : isHorizontal && position === "left"
                      ? `linear-gradient(to left, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)`
                      : `linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`,
        }}
      />
    </div>
  )
}
