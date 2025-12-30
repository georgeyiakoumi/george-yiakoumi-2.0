"use client";

import { useTheme } from "next-themes";
import { Item, ItemMedia } from "@/components/ui/item";
import { getStrapiMediaURL } from "@/lib/strapi";
import { useEffect, useState } from "react";

interface LogoItemData {
  id: number;
  name: string;
  ariaLabel: string;
  imageWidth?: number;
  classes?: string | null;
  cssVariables?: Record<string, string> | null;
  cssVariablesDark?: Record<string, string> | null;
  image?: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
    ext?: string;
  };
}

interface ThemedLogoProps {
  data: LogoItemData;
}

export function ThemedLogo({ data }: ThemedLogoProps) {
  const { resolvedTheme } = useTheme();
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const imageUrl = data.image?.url ? getStrapiMediaURL(data.image.url) : null;
  const isSvg = data.image?.ext === '.svg';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!imageUrl || !isSvg) return;

    // Fetch and inline SVG for CSS variable support
    fetch(imageUrl)
      .then(res => res.text())
      .then(setSvgContent)
      .catch(console.error);
  }, [imageUrl, isSvg]);

  if (!imageUrl) return null;

  // Merge CSS variables based on current theme
  // Only apply theme-specific variables after mounting to prevent hydration mismatch
  const cssVariables = {
    ...(data.cssVariables || {}),
    ...(mounted && resolvedTheme === 'dark' && data.cssVariablesDark ? data.cssVariablesDark : {}),
  } as React.CSSProperties;

  return (
    <Item
      variant="outline"
      className="size-full justify-center aspect-square"
      role="img"
      aria-label={`Logo for ${data.name}`}
      style={cssVariables}
    >
      <ItemMedia
        className={`w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain ${data.classes || ""}`}
        dangerouslySetInnerHTML={svgContent ? { __html: svgContent } : undefined}
      />
    </Item>
  );
}
