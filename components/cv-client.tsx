"use client";

import { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Item, ItemMedia, ItemContent, ItemTitle, ItemActions } from "@/components/ui/item";
import { Mail, Globe, Linkedin, ExternalLink } from "lucide-react";
import { CVExportControls } from "@/components/cv-export-controls";
import { getStrapiMediaURL } from "@/lib/strapi";
import type { CVPageData, CareerChapterData, CertificateData, ToolData } from "@/lib/strapi-queries";

interface CVClientProps {
  cvData: CVPageData;
  careerChapters: CareerChapterData[];
  certificates: CertificateData[];
  tools: ToolData[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function renderRichText(content: Array<{ type: string; children?: Array<{ type: string; text?: string }> }>): string {
  return content
    .map((block) =>
      block.children?.map((child) => child.text || "").join("") || ""
    )
    .join("\n");
}

function ToolBadge({ tool }: { tool: ToolData }) {
  const { resolvedTheme } = useTheme();
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const imageUrl = tool.image?.url ? getStrapiMediaURL(tool.image.url) : null;
  const isSvg = tool.image?.ext === '.svg';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!imageUrl || !isSvg) return;

    fetch(imageUrl)
      .then(res => res.text())
      .then(setSvgContent)
      .catch(console.error);
  }, [imageUrl, isSvg]);

  // Merge CSS variables based on current theme
  // Only apply theme-specific variables after mounting to prevent hydration mismatch
  const cssVariables = {
    ...(tool.cssVariables || {}),
    ...(mounted && resolvedTheme === 'dark' && tool.cssVariablesDark ? tool.cssVariablesDark : {}),
  } as React.CSSProperties;

  return (
    <Badge
      variant="secondary"
      className={`gap-2 ${tool.classes || ""}`}
      style={cssVariables}
    >
      {tool.image && (
        <>
          {isSvg && svgContent ? (
            <span
              className="size-4 [&>svg]:size-full [&>svg]:object-contain"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          ) : (
            <Image
              src={tool.image.url}
              alt={tool.image.alternativeText || tool.name}
              width={16}
              height={16}
              className="object-contain"
            />
          )}
        </>
      )}
      {tool.name}
    </Badge>
  );
}

export function CVClient({ cvData, careerChapters, certificates, tools }: CVClientProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const description = renderRichText(cvData.description);
  const sortedChapters = [...careerChapters].sort((a, b) => {
    const aDate = a.Chapter[0]?.start_date || "";
    const bDate = b.Chapter[0]?.start_date || "";
    return new Date(bDate).getTime() - new Date(aDate).getTime();
  });

  return (
    <div className="min-h-screen bg-background">
      <CVExportControls contentRef={contentRef} />

      <div ref={contentRef} className="container max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Header Section */}
        <div className="space-y-8">
          {/* Profile Section - Centered */}
          <div className="flex flex-col items-center space-y-4">
            {/* Avatar */}
            {cvData.avatar && (
              <Avatar className="size-32">
                <AvatarImage
                  src={cvData.avatar.formats?.medium?.url || cvData.avatar.url}
                  alt={cvData.avatar.alternativeText || cvData.heading}
                />
                <AvatarFallback>
                  {cvData.heading.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
            )}

            {/* Name and Tagline */}
            <div className="flex flex-col items-center space-y-2">
              <Typography variant="h1" className="text-4xl text-center">
                {cvData.heading}
              </Typography>
              <Typography variant="muted" className="uppercase tracking-wider text-xs text-center">
                {cvData.tagline}
              </Typography>
            </div>

            {/* Contact Icon Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                asChild
              >
                <a
                  href={`mailto:${cvData.email}`}
                  aria-label="Email"
                >
                  <Mail className="size-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
              >
                <a
                  href={`https://linkedin.com/in/${cvData.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="size-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
              >
                <a
                  href={`https://${cvData.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Website"
                >
                  <Globe className="size-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-3 max-w-3xl mx-auto">
            {cvData.description.map((paragraph, idx) => (
              <Typography key={idx} variant="p" className="text-muted-foreground text-center">
                {paragraph.children?.map((child) => child.text || "").join("")}
              </Typography>
            ))}
          </div>
        </div>

        {/* Skills / Tools Section */}
        {tools && tools.length > 0 && (
          <div className="space-y-6">
            <h2 className="uppercase font-bold tracking-widest text-xs text-center">
              Skills / Tools
            </h2>
            <div className="flex flex-wrap items-center gap-3 justify-center">
              {tools.map((tool) => (
                <ToolBadge key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        )}

        {/* Career History Section */}
        <div className="space-y-6">
          <h2 className="uppercase font-bold tracking-widest text-xs text-center">
            Career History
          </h2  >
          <div className="space-y-4">
            {sortedChapters.map((chapter) => (
              <div key={chapter.id} className="border border-border rounded-2xl p-4 space-y-4">
                {/* Company Header - Item-like appearance */}
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  {chapter.thumbnail && (
                    <div className="size-10 rounded-sm overflow-hidden bg-muted flex items-center justify-center shrink-0 border">
                      <Image
                        src={chapter.thumbnail.url}
                        alt={chapter.business_name}
                        width={40}
                        height={40}
                        className="object-cover size-full"
                      />
                    </div>
                  )}

                  {/* Title and Description */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h3 className="text-lg font-medium">
                        {chapter.business_name}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {chapter.city}, {chapter.country}
                        {chapter.remote && " • Remote"}
                        {chapter.hybrid && " • Hybrid"}
                      </span>
                    </div>
                    {chapter.description && (
                      <Typography variant="muted" className="text-sm leading-normal">
                        {chapter.description}
                      </Typography>
                    )}
                  </div>
                </div>

                {/* Roles within the company */}
                {chapter.Chapter.sort((a, b) =>
                  new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
                ).map((role) => (
                  <div key={role.id} className="bg-muted/50 p-4 space-y-3 rounded-md">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                      <h4 className="text-s font-medium">
                        {role.role}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(role.start_date)} - {role.end_date ? formatDate(role.end_date) : "Present"}
                      </span>
                    </div>

                    {/* Experience list */}
                    {role.experience.map((exp, idx) => {
                      if (exp.type === "list" && exp.children) {
                        return (
                          <ul key={idx} className="space-y-2 list-disc list-inside">
                            {exp.children.map((item, itemIdx) => {
                              const text = item.children?.map((child) => child.text || "").join("") || "";
                              return (
                                <li key={itemIdx} className="text-sm text-muted-foreground">
                                  {text}
                                </li>
                              );
                            })}
                          </ul>
                        );
                      }
                      return null;
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        {certificates && certificates.length > 0 && (
          <div className="space-y-6">
            <h2 className="uppercase font-bold tracking-widest text-xs text-center">
              Certifications
            </h2>
            <div className="space-y-4">
              {certificates.map((cert) => (
                <Item key={cert.id} variant="outline" className="rounded-2xl" asChild>
                  <a href={cert.url} target="_blank" rel="noopener noreferrer">
                    {cert.certificate_supplier?.thumbnail && (
                      <ItemMedia variant="image">
                        <Image
                          src={cert.certificate_supplier.thumbnail.formats?.thumbnail?.url || cert.certificate_supplier.thumbnail.url}
                          alt={cert.certificate_supplier.thumbnail.alternativeText || cert.certificate_supplier.name}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </ItemMedia>
                    )}
                    <ItemContent>
                      <ItemTitle>{cert.name}</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                      <ExternalLink className="size-4" />
                    </ItemActions>
                  </a>
                </Item>
              ))}
            </div>
          </div>
        )}

        {/* Languages Section */}
        {cvData.language && cvData.language.length > 0 && (
          <div className="space-y-3">
            <Typography variant="muted" className="uppercase tracking-widest text-xs text-center">
              Languages
            </Typography>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 justify-center">
              {cvData.language.map((language) => (
                <div key={language.id} className="flex items-center gap-2">
                  <Typography variant="p" className="text-sm">
                    {language.region}
                  </Typography>
                  <Badge variant="secondary" className="text-xs">
                    {language.level}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}