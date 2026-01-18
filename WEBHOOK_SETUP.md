# Webhook-Based On-Demand Revalidation Setup

This document explains how to set up Strapi webhooks to trigger Next.js cache revalidation when content is published or updated.

## How It Works

Instead of either:
- ❌ Disabling all caching (high Netlify function usage)
- ❌ Using long cache times (stale content)

We use:
- ✅ ISR caching with 1-hour revalidation (low function usage)
- ✅ Webhooks to instantly clear cache when you publish content (real-time updates)

## Setup Instructions

### 1. Add Environment Variable

Add to your `.env.local` (and Netlify environment variables):

```bash
REVALIDATE_SECRET=your-random-secret-string-here
```

Generate a secure random string (e.g., `openssl rand -base64 32`)

### 2. Configure Strapi Webhook

In your Strapi admin panel:

1. Go to **Settings** → **Webhooks**
2. Click **Create new webhook**
3. Configure:
   - **Name**: "Next.js Cache Revalidation"
   - **URL**: `https://georgeyiakoumi.com/api/revalidate`
     - For local testing: `http://localhost:3000/api/revalidate`
   - **Headers**:
     - Key: `Authorization`
     - Value: `Bearer your-random-secret-string-here` (use the same secret from step 1)
   - **Events**: Select these for the Project content type:
     - ✅ Entry create
     - ✅ Entry update
     - ✅ Entry delete
     - ✅ Entry publish
     - ✅ Entry unpublish

4. Click **Save**

### 3. Test the Webhook

1. Edit a project in Strapi
2. Click **Publish**
3. Check Strapi's webhook logs (Settings → Webhooks → Click on webhook → View logs)
4. Verify it shows a `200` success response

### 4. Verify Cache Revalidation

1. Visit your production site: https://georgeyiakoumi.com/projects
2. Note the current content
3. Update a project in Strapi and publish
4. Refresh the page - you should see the new content immediately

## How It Works Technically

1. **Normal visitors**: See cached pages (served from CDN, no function calls)
2. **You publish content**: Strapi sends webhook to `/api/revalidate`
3. **Next.js**: Clears cache for affected pages using `revalidateTag()` and `revalidatePath()`
4. **Next request**: Regenerates page with fresh content from Strapi
5. **Subsequent visitors**: See new cached content

## Benefits

- **Low Netlify Function Usage**: Most requests served from cache
- **Real-time Updates**: Cache cleared instantly when you publish
- **Best of Both Worlds**: Performance + freshness

## Webhook Payload

The revalidation endpoint accepts:

```json
{
  "model": "project",
  "slug": "project-slug-here"
}
```

Currently, Strapi sends the full entry data, and our endpoint extracts what it needs. The webhook triggers revalidation for:
- `/projects` (project listing page)
- `/project/[slug]` (specific project page)
- `projects` tag (all queries tagged with 'projects')
- `project-[slug]` tag (specific project queries)

## Troubleshooting

### Webhook not triggering:
- Check Strapi webhook logs
- Verify the Authorization header matches your REVALIDATE_SECRET
- Ensure the webhook URL is correct (https:// for production)

### Cache not clearing:
- Verify the endpoint returns `{ "revalidated": true }`
- Check Next.js logs for any errors
- Try hard refresh (Cmd+Shift+R) to bypass browser cache

### Still seeing old content:
- Browser cache: Hard refresh or use incognito
- CDN cache: Wait ~60 seconds for Netlify CDN to update
