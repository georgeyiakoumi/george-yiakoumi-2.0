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
  title: string;
  description?: string;
  slug: string;
  date: string;
  tags: Array<{
    name: string;
  }>;
  project_thumb?: {
    id: number;
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
  project_hero_image?: {
    id: number;
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
  project_client?: string;
  project_role?: string;
  role?: Array<{
    type: string;
    children?: Array<{
      type: string;
      text?: string;
    }>;
  }>;
  challenge?: Array<{
    type: string;
    children?: Array<{
      type: string;
      text?: string;
    }>;
  }>;
  solution?: Array<{
    type: string;
    children?: Array<{
      type: string;
      text?: string;
    }>;
  }>;
  impact?: Array<{
    type: string;
    children?: Array<{
      type: string;
      text?: string;
    }>;
  }>;
  takeaway?: Array<{
    type: string;
    children?: Array<{
      type: string;
      text?: string;
    }>;
  }>;
  tools?: Array<{
    id: number;
    documentId: string;
    name: string;
    slug: string;
  }>;
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
      'sort[0]': 'date:desc',
    };

    if (options?.tag) {
      query['filters[tags][name][$eq]'] = options.tag;
    }

    if (options?.limit) {
      query['pagination[pageSize]'] = options.limit;
    }

    const data = await fetchAPI<ProjectData[]>({
      endpoint: '/projects',
      query,
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
        'populate': '*',
      },
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
      tags: ['contact-info'],
    });
    return data;
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return null;
  }
}

// Global SEO
export interface GlobalSEOData {
  id: number;
  documentId: string;
  siteName: string;
  siteTitle: string;
  siteDescription: string;
  keywords?: string;
  authorName?: string;
  authorJobTitle?: string;
  authorBio?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  twitterHandle?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: {
    id: number;
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
  twitterCard?: 'summary' | 'summary_large_image';
  gtagId?: string;
  favIcon?: {
    id: number;
    url: string;
  };
  appleTouchIcon?: {
    id: number;
    url: string;
  };
}

export async function getGlobalSEO() {
  try {
    const data = await fetchAPI<GlobalSEOData>({
      endpoint: '/global-seo',
      query: {
        'populate[ogImage][fields][0]': 'url',
        'populate[ogImage][fields][1]': 'alternativeText',
        'populate[ogImage][fields][2]': 'width',
        'populate[ogImage][fields][3]': 'height',
        'populate[favIcon][fields][0]': 'url',
        'populate[appleTouchIcon][fields][0]': 'url',
      },
      tags: ['global-seo'],
    });
    return data;
  } catch (error) {
    console.error('Error fetching global SEO:', error);
    return null;
  }
}

export interface ToolData {
  id: number;
  documentId: string;
  name: string;
  ariaLabel: string;
  imageWidth?: number;
  url?: string;
  description?: string;
  cssVariables?: Record<string, string> | null;
  cssVariablesDark?: Record<string, string> | null;
  classes?: string | null;
  image?: {
    id: number;
    documentId: string;
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
    ext?: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export async function getTools() {
  try {
    const data = await fetchAPI<ToolData[]>({
      endpoint: '/tools',
      query: {
        'populate': '*',
        'pagination[pageSize]': 1000,
      },
      cache: 'no-store',
      tags: ['tools'],
    });
    return data;
  } catch (error) {
    console.error('Error fetching tools:', error);
    return [];
  }
}

export interface BusinessData {
  id: number;
  documentId: string;
  name: string;
  ariaLabel: string;
  imageWidth?: number;
  classes?: string | null;
  cssVariables?: Record<string, string> | null;
  cssVariablesDark?: Record<string, string> | null;
  description?: string;
  url?: string;
  image?: {
    id: number;
    documentId: string;
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
    ext?: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export async function getBusinesses() {
  try {
    const data = await fetchAPI<BusinessData[]>({
      endpoint: '/businesses',
      query: {
        'populate': '*',
        'pagination[pageSize]': 1000,
      },
      cache: 'no-store',
      tags: ['businesses'],
    });
    return data;
  } catch (error) {
    console.error('Error fetching businesses:', error);
    return [];
  }
}

export interface CVPageData {
  id: number;
  documentId: string;
  heading: string;
  tagline: string;
  email: string;
  linkedin: string;
  website: string;
  description: Array<{
    type: string;
    children?: Array<{
      type: string;
      text?: string;
    }>;
  }>;
  avatar?: {
    id: number;
    documentId: string;
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
    formats?: {
      small?: { url: string };
      medium?: { url: string };
      thumbnail?: { url: string };
    };
  };
  language?: Array<{
    id: number;
    region: string;
    level: string;
  }>;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface CareerChapterData {
  id: number;
  documentId: string;
  business_name: string;
  country: string;
  city: string;
  hybrid: boolean;
  remote: boolean;
  description: string;
  Chapter: Array<{
    id: number;
    role: string;
    start_date: string;
    end_date: string | null;
    experience: Array<{
      type: string;
      format?: string;
      children?: Array<{
        type: string;
        children?: Array<{
          type: string;
          text?: string;
        }>;
      }>;
    }>;
  }>;
  thumbnail?: {
    id: number;
    documentId: string;
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface CertificateData {
  id: number;
  documentId: string;
  name: string;
  url: string;
  certificate_supplier?: {
    id: number;
    documentId: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export async function getCVPage() {
  try {
    const data = await fetchAPI<CVPageData>({
      endpoint: '/cv-page',
      query: {
        'populate': '*',
      },
      tags: ['cv-page'],
    });
    return data;
  } catch (error) {
    console.error('Error fetching CV page:', error);
    return null;
  }
}

export async function getCareerChapters() {
  try {
    const data = await fetchAPI<CareerChapterData[]>({
      endpoint: '/career-chapters',
      query: {
        'populate': '*',
        'pagination[pageSize]': 1000,
      },
      tags: ['career-chapters'],
    });
    return data;
  } catch (error) {
    console.error('Error fetching career chapters:', error);
    return [];
  }
}

export async function getCertificates() {
  try {
    const data = await fetchAPI<CertificateData[]>({
      endpoint: '/certificates',
      query: {
        'populate': '*',
        'pagination[pageSize]': 1000,
      },
      tags: ['certificates'],
    });
    return data;
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return [];
  }
}
