import { Metadata } from "next";

export const SITE_CONFIG = {
  name: "George Yiakoumi",
  title: "George Yiakoumi - Product Designer & UX/UI Specialist",
  description: "Product Designer specializing in user experience, interface design, and digital product strategy. View my portfolio of design work and case studies.",
  url: "https://georgeyiakoumi.com",
  author: {
    name: "George Yiakoumi",
    url: "https://georgeyiakoumi.com",
    linkedin: "https://linkedin.com/in/georgeyiakoumi",
    github: "https://github.com/georgeyiakoumi",
  },
  keywords: [
    "Product Designer",
    "UX Designer",
    "UI Designer",
    "User Experience",
    "Interface Design",
    "Product Design",
    "Design Portfolio",
    "Digital Product Design",
    "George Yiakoumi",
  ] as string[],
  ogImage: "/og-image.jpg", // We'll need to add this image
};

export function generateSiteMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
      default: SITE_CONFIG.title,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    keywords: SITE_CONFIG.keywords,
    authors: [
      {
        name: SITE_CONFIG.author.name,
        url: SITE_CONFIG.author.url,
      },
    ],
    creator: SITE_CONFIG.author.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: SITE_CONFIG.url,
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      images: [SITE_CONFIG.ogImage],
      creator: "@georgeyiakoumi", // Update if you have a Twitter handle
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

export function generatePageMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  const ogImage = image || SITE_CONFIG.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export function generatePersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.author.name,
    url: SITE_CONFIG.url,
    jobTitle: "Product Designer",
    description: SITE_CONFIG.description,
    sameAs: [
      SITE_CONFIG.author.linkedin,
      SITE_CONFIG.author.github,
    ],
  };
}

export function generateWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
    },
  };
}
