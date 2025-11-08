# Strapi CMS Integration Guide

This guide explains how to integrate your Next.js portfolio with your Strapi headless CMS.

## Setup Steps

### 1. Configure Environment Variables

Create a `.env.local` file in your project root (see `.env.local.example`):

```bash
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token-here
```

**Getting your API Token:**
1. Log into your Strapi admin panel
2. Go to Settings > API Tokens
3. Create a new token with "Read" permissions
4. Copy the token to your `.env.local` file

### 2. Project Structure

The integration includes:

- `lib/strapi.ts` - Core API client with fetch utilities
- `lib/strapi-types.ts` - TypeScript type definitions for Strapi responses
- `lib/strapi-queries.ts` - Pre-built query functions for your content types

### 3. Strapi Content Types

Create these content types in your Strapi admin:

#### About Page (Single Type)
- `title` (Text)
- `description` (Long Text)
- `bio` (Rich Text)
- `avatar` (Media - Single)
- `skills` (Component - Repeatable)
  - `name` (Text)
  - `category` (Text)
- `experience` (Component - Repeatable)
  - `company` (Text)
  - `position` (Text)
  - `startDate` (Date)
  - `endDate` (Date)
  - `description` (Long Text)
  - `logo` (Media - Single)

#### Projects (Collection Type)
- `title` (Text)
- `slug` (UID)
- `description` (Long Text)
- `content` (Rich Text)
- `thumbnail` (Media - Single)
- `gallery` (Media - Multiple)
- `technologies` (Component - Repeatable)
  - `name` (Text)
- `projectUrl` (Text)
- `githubUrl` (Text)
- `featured` (Boolean)

#### Contact Info (Single Type)
- `email` (Email)
- `phone` (Text)
- `linkedinUrl` (Text)
- `githubUrl` (Text)
- `location` (Text)
- `availability` (Text)

### 4. Usage Examples

#### Fetch data in Server Components (Recommended)

```tsx
import { getAboutPage, getProjects } from '@/lib/strapi-queries';

export default async function AboutPage() {
  const aboutData = await getAboutPage();

  if (!aboutData) {
    return <div>Unable to load content</div>;
  }

  return (
    <div>
      <h1>{aboutData.attributes.title}</h1>
      <p>{aboutData.attributes.description}</p>

      {aboutData.attributes.experience?.map((exp) => (
        <div key={exp.id}>
          <h3>{exp.position} at {exp.company}</h3>
          <p>{exp.description}</p>
        </div>
      ))}
    </div>
  );
}
```

#### Fetch data in Client Components

```tsx
"use client";

import { useEffect, useState } from 'react';
import { getProjects } from '@/lib/strapi-queries';
import type { ProjectData } from '@/lib/strapi-queries';

export default function ProjectsList() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects({ featured: true, limit: 6 })
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {projects.map((project) => (
        <div key={project.id}>
          <h2>{project.attributes.title}</h2>
          <p>{project.attributes.description}</p>
        </div>
      ))}
    </div>
  );
}
```

#### Working with Images

```tsx
import Image from 'next/image';
import { getStrapiMediaURL } from '@/lib/strapi';

function ProjectCard({ project }) {
  const imageUrl = getStrapiMediaURL(
    project.attributes.thumbnail?.data?.attributes.url
  );

  return (
    <div>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={project.attributes.thumbnail?.data?.attributes.alternativeText || ''}
          width={600}
          height={400}
        />
      )}
    </div>
  );
}
```

### 5. Customizing for Your Content

The example queries are based on common content types. To customize:

1. **Add your own content type interfaces** in `lib/strapi-queries.ts`
2. **Create query functions** following the existing patterns
3. **Update populate and filter options** based on your Strapi structure

Example custom query:

```typescript
export async function getTestimonials() {
  try {
    const data = await fetchAPI<TestimonialData[]>({
      endpoint: '/testimonials',
      query: {
        populate: '*',
        'filters[featured][$eq]': true,
        'sort[0]': 'date:desc',
      },
      cache: 'no-store',
      tags: ['testimonials'],
    });
    return data;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}
```

### 6. Caching and Revalidation

Next.js 15 uses aggressive caching by default. Control it with:

```typescript
// No caching (always fetch fresh)
cache: 'no-store'

// Cache with on-demand revalidation
cache: 'force-cache',
tags: ['projects']

// Then revalidate with:
// revalidateTag('projects')
```

### 7. Advanced Strapi Queries

#### Population

```typescript
// Populate all relations
populate: '*'

// Populate specific relations
populate: 'thumbnail,gallery'

// Deep populate (all nested relations)
populate: 'deep'

// Custom populate
populate: {
  thumbnail: { fields: ['url', 'alternativeText'] },
  author: { fields: ['name', 'email'] }
}
```

#### Filtering

```typescript
query: {
  'filters[title][$contains]': 'design',
  'filters[publishedAt][$notNull]': true,
  'filters[featured][$eq]': true,
}
```

#### Sorting

```typescript
query: {
  'sort[0]': 'publishedAt:desc',
  'sort[1]': 'title:asc',
}
```

### 8. Error Handling

All query functions include error handling and return null/empty arrays on failure. Always check for null values:

```typescript
const aboutData = await getAboutPage();

if (!aboutData) {
  // Handle missing data
  return <ErrorComponent />;
}

// Safe to use aboutData
```

### 9. TypeScript Tips

The integration is fully typed. To add types for new content:

```typescript
export interface YourContentData {
  id: number;
  attributes: {
    // Your fields here
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}
```

### 10. Testing the Integration

1. Start your Strapi instance
2. Add some test content in Strapi admin
3. Update `.env.local` with your Strapi URL and token
4. Run `npm run dev`
5. Test fetching data in your pages

## Troubleshooting

### CORS Issues
If you get CORS errors, update your Strapi `config/middlewares.js`:

```javascript
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  // ... other middlewares
];
```

### Authentication Issues
- Verify your API token has the correct permissions
- Check that `STRAPI_API_TOKEN` is set in `.env.local`
- Ensure your content types are published in Strapi

### Image Issues
- Confirm media library uploads are working in Strapi
- Check that image URLs are accessible
- Use `getStrapiMediaURL()` helper for all image paths

## Next Steps

1. Create your content types in Strapi admin
2. Add sample content
3. Update the example interfaces to match your actual structure
4. Integrate data fetching into your existing pages
5. Test and refine your queries

Need help? Check the [Strapi Documentation](https://docs.strapi.io/) or [Next.js Data Fetching Guide](https://nextjs.org/docs/app/building-your-application/data-fetching).
