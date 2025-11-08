# Strapi Integration Quick Start

## 1. Create Environment File

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Strapi details:
```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token-here
```

## 2. Get Your API Token

1. Open Strapi admin: `http://localhost:1337/admin`
2. Settings → API Tokens → Create new token
3. Name: "Next.js Portfolio"
4. Token type: Read-only
5. Token duration: Unlimited
6. Copy token to `.env.local`

## 3. Create Content Types in Strapi

See `STRAPI_INTEGRATION_GUIDE.md` for detailed content type schemas.

Quick setup:
- **About Page** (Single Type) - For /about page
- **Projects** (Collection) - For portfolio items
- **Contact Info** (Single Type) - For contact details

## 4. Add Content

1. Go to Content Manager in Strapi
2. Add your about page content
3. Add some projects
4. Add contact information
5. Remember to click "Publish" on each item

## 5. Test the Integration

Start your dev server:
```bash
npm run dev
```

Try fetching data in any page:
```tsx
import { getAboutPage } from '@/lib/strapi-queries';

export default async function Page() {
  const data = await getAboutPage();
  console.log(data);
  return <div>{data?.attributes.title}</div>;
}
```

## 6. Replace Your Current Pages

Example files created:
- `app/about/page-with-strapi.tsx.example` - Strapi-powered About page
- `app/portfolio/page.tsx.example` - Portfolio listing
- `app/portfolio/[slug]/page.tsx.example` - Individual project pages

To use them:
1. Backup your current page
2. Rename `.example` file to `.tsx`
3. Test the page
4. Adjust to your needs

## Common Issues

**"Unable to load content"**
- Check Strapi is running
- Verify API URL in `.env.local`
- Check API token is valid
- Ensure content is published in Strapi

**CORS errors**
- Check Strapi CORS settings
- See `STRAPI_INTEGRATION_GUIDE.md` for config

**Images not loading**
- Use `getStrapiMediaURL()` helper
- Check media files are uploaded in Strapi
- Verify Next.js `next.config.mjs` allows your Strapi domain

## Next Steps

1. Customize TypeScript interfaces in `lib/strapi-queries.ts`
2. Add more query functions for your content types
3. Implement caching strategy
4. Add error boundaries
5. Set up preview mode (optional)

Full documentation: `STRAPI_INTEGRATION_GUIDE.md`
