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
      query: {
        'populate[businesses][populate]': 'image',
        'populate[tools][populate]': 'image',
      },
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
      },
      tags: ['tools'],
    });
    return data;
  } catch (error) {
    console.error('Error fetching tools:', error);
    return [];
  }
}
