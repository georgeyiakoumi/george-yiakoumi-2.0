"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, Globe, Linkedin } from "lucide-react";

export function CVClient() {
  // TODO: Replace with CMS data
  const cvData = {
    profile: {
      name: "George Yiakoumi",
      title: "Senior UX/UI Designer",
      location: "London, UK",
      image: "/profile.jpg", // TODO: Replace with actual image path
      phone: "+44 7123 456789",
      email: "hello@georgeyiakoumi.com",
      linkedin: "linkedin.com/in/georgeyiakoumi",
      portfolio: "georgeyiakoumi.com"
    },
    summary: "Experienced UX/UI Designer with a proven track record of creating intuitive, user-centered digital experiences for leading companies. Specializing in product design, design systems, and cross-functional collaboration. Passionate about solving complex problems through thoughtful design and research-driven insights.",
    skills: [
      { name: "Figma", icon: "figma" },
      { name: "Sketch", icon: "sketch" },
      { name: "Adobe XD", icon: "adobe-xd" },
      { name: "Prototyping", icon: "prototype" },
      { name: "User Research", icon: "research" },
      { name: "Design Systems", icon: "system" },
      { name: "HTML/CSS", icon: "code" },
      { name: "React", icon: "react" },
    ],
    languages: [
      { name: "English", level: "Native" },
      { name: "Greek", level: "Native" },
    ],
    education: [
      {
        institution: "University of Arts London",
        degree: "BA (Hons) Graphic Design",
        year: "2015 - 2018",
        location: "London, UK"
      }
    ],
    certifications: [
      "Google UX Design Professional Certificate",
      "Interaction Design Foundation - UX Management"
    ],
    experience: [
      {
        company: "Tech Company Ltd",
        logo: "/logos/company1.png", // TODO: Replace with actual logo
        role: "Senior UX/UI Designer",
        period: "2021 - Present",
        location: "London, UK",
        responsibilities: [
          "Led end-to-end design for multiple product features serving 1M+ users",
          "Established and maintained comprehensive design system used across 15+ products",
          "Collaborated with product managers and engineers to define product roadmaps",
          "Conducted user research sessions and usability testing to inform design decisions"
        ]
      },
      {
        company: "Digital Agency",
        logo: "/logos/company2.png", // TODO: Replace with actual logo
        role: "UX/UI Designer",
        period: "2019 - 2021",
        location: "London, UK",
        responsibilities: [
          "Designed responsive web and mobile applications for diverse clients",
          "Created wireframes, prototypes, and high-fidelity mockups",
          "Worked closely with developers to ensure accurate implementation",
          "Presented design concepts to stakeholders and clients"
        ]
      },
      {
        company: "Startup Inc",
        logo: "/logos/company3.png", // TODO: Replace with actual logo
        role: "Junior Designer",
        period: "2018 - 2019",
        location: "London, UK",
        responsibilities: [
          "Assisted in the redesign of the company's flagship product",
          "Created marketing materials and social media assets",
          "Participated in design critiques and team workshops",
          "Conducted competitive analysis and user research"
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Header Section */}
        <Card className="overflow-hidden">
          <div className="p-8 space-y-6">
            {/* Profile Image and Name */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="size-32">
                <AvatarImage src={cvData.profile.image} alt={cvData.profile.name} />
                <AvatarFallback>GY</AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left space-y-2">
                <Typography variant="h1" className="text-4xl">
                  {cvData.profile.name}
                </Typography>
                <Typography variant="muted" className="uppercase tracking-wider text-xs">
                  {cvData.profile.title}, {cvData.profile.location}
                </Typography>
              </div>
            </div>

            {/* Contact Links */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm">
              <a
                href={`tel:${cvData.profile.phone}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="size-4" />
                <span>{cvData.profile.phone}</span>
              </a>
              <a
                href={`mailto:${cvData.profile.email}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="size-4" />
                <span>{cvData.profile.email}</span>
              </a>
              <a
                href={`https://${cvData.profile.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="size-4" />
                <span>{cvData.profile.linkedin}</span>
              </a>
              <a
                href={`https://${cvData.profile.portfolio}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Globe className="size-4" />
                <span>{cvData.profile.portfolio}</span>
              </a>
            </div>

            {/* Professional Summary */}
            <div className="pt-4">
              <Typography variant="p" className="text-muted-foreground">
                {cvData.summary}
              </Typography>
            </div>
          </div>
        </Card>

        {/* Skills Section */}
        <Card>
          <div className="p-8 space-y-6">
            <Typography variant="h3" className="uppercase tracking-wider text-sm">
              Technical Skills
            </Typography>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {cvData.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center gap-3 p-4 rounded-lg border bg-background/50 hover:bg-background transition-colors"
                >
                  <div className="size-12 rounded-full bg-muted flex items-center justify-center">
                    {/* TODO: Replace with actual skill icons */}
                    <span className="text-2xl">🎨</span>
                  </div>
                  <Typography variant="small" className="text-center">
                    {skill.name}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Languages Section */}
        <Card>
          <div className="p-8 space-y-6">
            <Typography variant="h3" className="uppercase tracking-wider text-sm">
              Languages
            </Typography>
            <div className="flex flex-wrap gap-2">
              {cvData.languages.map((language) => (
                <Badge key={language.name} variant="secondary" className="text-sm py-2 px-4">
                  {language.name} - {language.level}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Education & Certifications Section */}
        <Card>
          <div className="p-8 space-y-6">
            <Typography variant="h3" className="uppercase tracking-wider text-sm">
              Education & Certifications
            </Typography>

            {/* Education */}
            <div className="space-y-4">
              {cvData.education.map((edu, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                    <Typography variant="large">
                      {edu.degree}
                    </Typography>
                    <Typography variant="muted" className="text-xs">
                      {edu.year}
                    </Typography>
                  </div>
                  <Typography variant="muted">
                    {edu.institution}, {edu.location}
                  </Typography>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="space-y-2 pt-4">
              <Typography variant="h5" className="text-sm font-semibold">
                Certifications
              </Typography>
              <ul className="space-y-2">
                {cvData.certifications.map((cert, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <Typography variant="p" className="text-sm">
                      {cert}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Career History Section */}
        <div className="space-y-6">
          <Typography variant="h3" className="uppercase tracking-wider text-sm px-2">
            Career History
          </Typography>

          {cvData.experience.map((job, index) => (
            <Card key={index}>
              <div className="p-8 space-y-4">
                {/* Job Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Company Logo Placeholder */}
                    <div className="size-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <span className="text-xl">🏢</span>
                    </div>

                    <div className="space-y-1">
                      <Typography variant="large">
                        {job.role}
                      </Typography>
                      <Typography variant="muted">
                        {job.company}
                      </Typography>
                    </div>
                  </div>

                  <div className="text-left md:text-right space-y-1">
                    <Typography variant="small" className="text-muted-foreground">
                      {job.period}
                    </Typography>
                    <Typography variant="muted" className="text-xs">
                      {job.location}
                    </Typography>
                  </div>
                </div>

                {/* Responsibilities */}
                <ul className="space-y-2 pt-2">
                  {job.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 text-xs">•</span>
                      <Typography variant="p" className="text-sm text-muted-foreground">
                        {responsibility}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
