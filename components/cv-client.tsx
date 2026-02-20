"use client";

import { useRef } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Globe, Linkedin, MapPin } from "lucide-react";
import { CVExportControls } from "@/components/cv-export-controls";
import type { CVPageData, CareerChapterData, CertificateData } from "@/lib/strapi-queries";

interface CVClientProps {
  cvData: CVPageData;
  careerChapters: CareerChapterData[];
  certificates: CertificateData[];
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

export function CVClient({ cvData, careerChapters, certificates }: CVClientProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const description = renderRichText(cvData.description);
  const sortedChapters = [...careerChapters].sort((a, b) => {
    const aDate = a.Chapter[0]?.start_date || "";
    const bDate = b.Chapter[0]?.start_date || "";
    return new Date(bDate).getTime() - new Date(aDate).getTime();
  });

  return (
    <div className="min-h-screen bg-muted/30">
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

        {/* Languages Section */}
        {cvData.language && cvData.language.length > 0 && (
          <Card>
            <div className="p-8 space-y-6">
              <Typography variant="h3" className="uppercase tracking-wider text-sm">
                Languages
              </Typography>
              <div className="flex flex-wrap gap-2">
                {cvData.language.map((language) => (
                  <Badge key={language.id} variant="secondary" className="text-sm py-2 px-4">
                    {language.region} - {language.level}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Certifications Section */}
        {certificates && certificates.length > 0 && (
          <Card>
            <div className="p-8 space-y-6">
              <Typography variant="h3" className="uppercase tracking-wider text-sm">
                Certifications
              </Typography>
              <ul className="space-y-3">
                {certificates.map((cert) => (
                  <li key={cert.id} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <div className="flex-1">
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:text-primary transition-colors"
                      >
                        {cert.name}
                      </a>
                      {cert.certificate_supplier && (
                        <Typography variant="muted" className="text-xs mt-0.5">
                          {cert.certificate_supplier.name}
                        </Typography>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        )}

        {/* Career History Section */}
        <div className="space-y-6">
          <Typography variant="h3" className="uppercase tracking-wider text-sm px-2">
            Career History
          </Typography>

          {sortedChapters.map((chapter) => (
            <Card key={chapter.id}>
              <div className="p-8 space-y-6">
                {/* Company Header */}
                <div className="flex items-start gap-4 pb-2 border-b">
                  {chapter.thumbnail && (
                    <div className="size-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center shrink-0">
                      <Image
                        src={chapter.thumbnail.url}
                        alt={chapter.business_name}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                  )}

                  <div className="flex-1 space-y-1">
                    <Typography variant="large" className="font-semibold">
                      {chapter.business_name}
                    </Typography>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="size-3" />
                      <span>
                        {chapter.city}, {chapter.country}
                        {chapter.remote && " • Remote"}
                        {chapter.hybrid && " • Hybrid"}
                      </span>
                    </div>
                    {chapter.description && (
                      <Typography variant="muted" className="text-xs pt-1">
                        {chapter.description}
                      </Typography>
                    )}
                  </div>
                </div>

                {/* Roles within the company */}
                {chapter.Chapter.sort((a, b) =>
                  new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
                ).map((role) => (
                  <div key={role.id} className="space-y-3">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                      <Typography variant="large" className="font-medium">
                        {role.role}
                      </Typography>
                      <Typography variant="small" className="text-muted-foreground">
                        {formatDate(role.start_date)} - {role.end_date ? formatDate(role.end_date) : "Present"}
                      </Typography>
                    </div>

                    {/* Experience list */}
                    {role.experience.map((exp, idx) => {
                      if (exp.type === "list" && exp.children) {
                        return (
                          <ul key={idx} className="space-y-2">
                            {exp.children.map((item, itemIdx) => {
                              const text = item.children?.map((child) => child.text || "").join("") || "";
                              return (
                                <li key={itemIdx} className="flex items-start gap-3">
                                  <span className="text-primary mt-1.5 text-xs">•</span>
                                  <Typography variant="p" className="text-sm text-muted-foreground">
                                    {text}
                                  </Typography>
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
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}