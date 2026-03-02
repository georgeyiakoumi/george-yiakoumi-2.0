#!/usr/bin/env node

/**
 * Cloudflare Cache Purging Script
 *
 * Purges Cloudflare CDN cache to ensure fresh content is served.
 *
 * Usage:
 *   npm run purge:cloudflare           # Purge specific pages (HTML only)
 *   npm run purge:cloudflare:all       # Purge everything (use sparingly)
 *
 * Environment Variables Required:
 *   CLOUDFLARE_ZONE_ID - Your Cloudflare Zone ID
 *   CLOUDFLARE_API_TOKEN - API token with Cache Purge permission
 */

const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const SITE_URL = 'https://georgeyiakoumi.com';

// Pages to purge when running selective purge (HTML pages only)
const PAGES_TO_PURGE = [
  '/',
  '/about',
  '/portfolio',
  '/contact',
  // Add dynamic routes as needed (e.g., '/portfolio/project-slug')
];

const args = process.argv.slice(2);
const purgeAll = args.includes('--all');

async function purgeCloudflareCache() {
  // Validate environment variables
  if (!ZONE_ID || !API_TOKEN) {
    console.error('❌ Error: Missing environment variables');
    console.error('Required: CLOUDFLARE_ZONE_ID and CLOUDFLARE_API_TOKEN');
    console.error('\nSet them in .env.local (local dev) or Netlify environment variables (CI/CD)');
    process.exit(1);
  }

  const url = `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache`;

  let body;
  if (purgeAll) {
    console.log('🔥 Purging ALL Cloudflare cache...');
    body = JSON.stringify({ purge_everything: true });
  } else {
    const files = PAGES_TO_PURGE.map(page => `${SITE_URL}${page}`);
    console.log('🔥 Purging Cloudflare cache for specific pages:');
    files.forEach(file => console.log(`   - ${file}`));
    body = JSON.stringify({ files });
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body,
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error('❌ Failed to purge Cloudflare cache');
      console.error('Response:', JSON.stringify(data, null, 2));
      process.exit(1);
    }

    console.log('✅ Cloudflare cache purged successfully!');
    console.log(`   Cache ID: ${data.result.id}`);
  } catch (error) {
    console.error('❌ Error purging Cloudflare cache:', error.message);
    process.exit(1);
  }
}

purgeCloudflareCache();
