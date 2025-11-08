# Setup Instructions for Strapi Integration

Your Strapi CMS is hosted at: `https://portfolio-cms-n9hb.onrender.com/`

## Quick Setup (5 minutes)

### Step 1: Create Environment File

```bash
cp .env.local.example .env.local
```

Your `.env.local` should contain:
```env
NEXT_PUBLIC_STRAPI_API_URL=https://portfolio-cms-n9hb.onrender.com
```

### Step 2: Update Next.js Config for Images

```bash
cp next.config.mjs.example next.config.mjs
```

This allows Next.js to load images from your Strapi instance.

### Step 3: Install Dependencies (if needed)

```bash
npm install dotenv
```

### Step 4: Test the Connection

```bash
npm run test:strapi
```

This will verify:
- Connection to your Strapi instance
- Available content types
- Data accessibility

### Step 5: Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your site.

## About API Tokens

### Do you need an API token?

**YES, I strongly recommend using one for these reasons:**

1. **Security** - Without a token, your API endpoints might be publicly accessible
2. **Rate limiting** - Tokens help Strapi track and limit requests
3. **Access control** - You can revoke/rotate tokens without changing passwords
4. **Production best practice** - Essential for deployed applications

### How to Create an API Token

1. Go to your Strapi admin: `https://portfolio-cms-n9hb.onrender.com/admin`
2. Navigate to **Settings** → **API Tokens**
3. Click **Create new API Token**
4. Configure:
   - **Name**: "Next.js Portfolio"
   - **Token type**: "Read-only" (safest option)
   - **Token duration**: "Unlimited"
5. Copy the generated token (you'll only see it once!)
6. Add to `.env.local`:
   ```env
   STRAPI_API_TOKEN=your_copied_token_here
   ```

### Without an API Token

If you're not using a token, make sure your Strapi content types have **Public** permissions:

1. Strapi Admin → **Settings** → **Roles** → **Public**
2. Enable **find** and **findOne** for:
   - About-page
   - Projects
   - Contact-info
3. Save changes

**Warning**: This makes your content publicly accessible to anyone. Fine for public portfolios, but use tokens for better security.

## Next Steps

### 1. Test Your Integration

Check if Strapi is accessible:
```bash
npm run test:strapi
```

### 2. Explore Your Content in Code

Create a test page to see your data:

```tsx
// app/test/page.tsx
import { getAboutPage, getProjects } from '@/lib/strapi-queries';

export default async function TestPage() {
  const about = await getAboutPage();
  const projects = await getProjects();

  return (
    <div className="p-8">
      <h1>Strapi Test Page</h1>
      <pre>{JSON.stringify({ about, projects }, null, 2)}</pre>
    </div>
  );
}
```

Visit `http://localhost:3000/test` to see your Strapi data.

### 3. Replace Example Pages

I've created example files showing how to integrate Strapi:

- `app/about/page-with-strapi.tsx.example` - Server component with data fetching
- `app/about/AboutClient.tsx` - Client component with GSAP animations
- `app/portfolio/page.tsx.example` - Portfolio listing page
- `app/portfolio/[slug]/page.tsx.example` - Individual project pages

To use them:
```bash
# Backup your current about page
cp app/about/page.tsx app/about/page.backup.tsx

# Use the Strapi version
cp app/about/page-with-strapi.tsx.example app/about/page.tsx
```

### 4. Customize for Your Content Structure

The example queries in `lib/strapi-queries.ts` assume certain content types. Update them to match your actual Strapi structure:

1. Check what content types you have in Strapi
2. Look at the field names in each content type
3. Update the TypeScript interfaces in `lib/strapi-queries.ts`
4. Adjust the query functions as needed

## Troubleshooting

### "Unable to load content"

**Check 1**: Is Strapi running?
```bash
curl https://portfolio-cms-n9hb.onrender.com/api
```

**Check 2**: Are permissions set correctly?
- Go to Settings → Roles → Public
- Enable find/findOne for your content types

**Check 3**: Is content published?
- Open Content Manager in Strapi
- Make sure items are "Published" (not just saved as drafts)

### CORS Errors

If you see CORS errors in the browser console, update your Strapi CORS settings:

1. Edit `config/middlewares.js` in your Strapi project
2. Add your Next.js domain to allowed origins
3. Redeploy Strapi

### Images Not Loading

1. Check `next.config.mjs` includes your Strapi domain
2. Verify images are uploaded in Strapi Media Library
3. Use the `getStrapiMediaURL()` helper for all image URLs

### API Token Issues

1. Verify token is correctly copied (no extra spaces)
2. Check token hasn't expired
3. Ensure token has correct permissions (Read-only for public content)

## Architecture Overview

```
Your Next.js App
    ↓
lib/strapi.ts (API client)
    ↓
lib/strapi-queries.ts (Query functions)
    ↓
https://portfolio-cms-n9hb.onrender.com/api
    ↓
Your Strapi Content
```

## Files Created

- `lib/strapi.ts` - Core API client
- `lib/strapi-types.ts` - TypeScript definitions
- `lib/strapi-queries.ts` - Query functions
- `scripts/test-strapi.mjs` - Connection test script
- `.env.local.example` - Environment template
- `next.config.mjs.example` - Next.js config
- Example page files for About and Portfolio

## Resources

- Full integration guide: `STRAPI_INTEGRATION_GUIDE.md`
- Quick reference: `STRAPI_QUICKSTART.md`
- [Strapi Documentation](https://docs.strapi.io/)
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)

Need help? All query functions include error handling, so check your browser/server console for detailed error messages.
