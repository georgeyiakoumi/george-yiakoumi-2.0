import { fetchAPI } from './strapi';
import type { StrapiMedia } from './strapi-types';

export interface AboutPageData {
  id: number;
  attributes: {
    title: string;
    description: string;
    bio?: string;
    avatar?: {
      data: StrapiMedia | null;
    };
    skills?: Array<{
      id: number;
      name: string;
      category: string;
    }>;
    experience?: Array<{
      id: number;
      company: string;
      position: string;
      startDate: string;
      endDate?: string;
      description: string;
      logo?: {
        data: StrapiMedia | null;
      };
    }>;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

interface StrapiRichTextBlock {
  id: number;
  content: Array<{
    type: string;
    children?: Array<{
      type: string;
      text?: string;
      bold?: boolean;
    }>;
    format?: string;
  }>;
  Image?: {
    id: number;
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  } | null;
}

export interface ProjectData {
  id: number;
  documentId: string;
  Title: string;
  slug: string;
  Date: string;
  Tags: Array<{
    name: string;
  }>;
  Description: string;
  Content?: string | Array<{id: string; content: string}>;
  FeaturedImage?: {
    id: number;
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
  Images?: Array<{
    id: number;
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  }>;
  ProjectURL?: string;
  GitHubURL?: string;
  Client?: string;
  Role?: StrapiRichTextBlock;
  Challenge?: StrapiRichTextBlock;
  Solution?: StrapiRichTextBlock;
  Impact?: StrapiRichTextBlock;
  Takeaway?: StrapiRichTextBlock;
  Tools?: Array<{
    id: number;
    documentId: string;
    Name: string;
    Slug: string;
  }>;
  Thumbnail?: {
    id: number;
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
  Banner?: {
    id: number;
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ContactInfoData {
  id: number;
  attributes: {
    email: string;
    phone?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    location?: string;
    availability?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface AboutRichTextChild {
  text: string;
  type: string;
}

export interface AboutRichTextBlock {
  type: string;
  level?: number;
  children?: AboutRichTextChild[];
  image?: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
}

export interface AboutBusiness {
  id: number;
  name: string;
  imageWidth?: number;
  ariaLabel: string;
  classes?: string | null;
  cssVariables?: Record<string, string> | null;
  cssVariablesDark?: Record<string, string> | null;
  image?: {
    id: number;
    documentId: string;
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
}

export interface AboutData {
  id: number;
  documentId: string;
  hero: AboutRichTextBlock[];
  heading_businesses: string;
  heading_tools: string;
  contact: AboutRichTextBlock[];
  businesses: AboutBusiness[];
  tools: AboutBusiness[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export async function getAboutPage() {
  try {
    const data = await fetchAPI<AboutData>({
      endpoint: '/about',
      query: {
        'populate[businesses][populate]': 'image',
        'populate[tools][populate]': 'image',
      },
      cache: 'no-store',
      tags: ['about'],
    });
    return data;
  } catch (error) {
    console.error('Error fetching about page:', error);
    return null;
  }
}

export async function getProjects(options?: {
  limit?: number;
  tag?: string;
}) {
  try {
    const query: Record<string, string | number | boolean> = {
      'populate': '*',
      'sort[0]': 'Date:desc',
    };

    if (options?.tag) {
      query['filters[Tags][name][$eq]'] = options.tag;
    }

    if (options?.limit) {
      query['pagination[pageSize]'] = options.limit;
    }

    const data = await fetchAPI<ProjectData[]>({
      endpoint: '/projects',
      query,
      cache: 'no-store',
      tags: ['projects'],
    });
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const data = await fetchAPI<ProjectData[]>({
      endpoint: '/projects',
      query: {
        'filters[slug][$eq]': slug,
        'populate[Banner]': '*',
        'populate[Thumbnail]': '*',
        'populate[FeaturedImage]': '*',
        'populate[Images]': '*',
        'populate[Tags]': '*',
        'populate[Tools]': '*',
        'populate[Challenge][populate]': 'Image',
        'populate[Solution][populate]': 'Image',
        'populate[Role][populate]': 'Image',
        'populate[Impact][populate]': 'Image',
        'populate[Takeaway][populate]': 'Image',
      },
      cache: 'no-store',
      tags: ['projects', `project-${slug}`],
    });
    return data[0] || null;
  } catch (error) {
    console.error(`Error fetching project with slug ${slug}:`, error);
    return null;
  }
}

export async function getContactInfo() {
  try {
    const data = await fetchAPI<ContactInfoData>({
      endpoint: '/contact-info',
      cache: 'no-store',
      tags: ['contact-info'],
    });
    return data;
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return null;
  }
}