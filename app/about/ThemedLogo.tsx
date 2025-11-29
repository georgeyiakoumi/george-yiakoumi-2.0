"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { Item, ItemMedia } from "@/components/ui/item";
import { getStrapiMediaURL } from "@/lib/strapi";

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
  };
}

interface ThemedLogoProps {
  data: LogoItemData;
}

export function ThemedLogo({ data }: ThemedLogoProps) {
  const { resolvedTheme } = useTheme();
  const imageUrl = data.image?.url ? getStrapiMediaURL(data.image.url) : null;

  if (!imageUrl) return null;

  // Merge CSS variables based on current theme
  const inlineStyles = {
    ...(data.cssVariables || {}),
    ...(resolvedTheme === 'dark' && data.cssVariablesDark ? data.cssVariablesDark : {}),
    width: data.imageWidth ? `${data.imageWidth}rem` : 'auto',
    height: 'auto',
  } as React.CSSProperties;

  return (
    <Item
      variant="outline"
      className="size-full justify-center aspect-square"
      aria-label={data.ariaLabel}
      style={inlineStyles}
    >
      <ItemMedia>
        <Image
          src={imageUrl}
          alt={data.image?.alternativeText || data.name}
          width={data.image?.width || 100}
          height={data.image?.height || 100}
          className={data.classes || ""}
        />
      </ItemMedia>
    </Item>
  );
}
