import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const secret = process.env.REVALIDATE_SECRET;

  console.log('[Revalidate] Webhook received');

  if (!secret) {
    console.error('[Revalidate] REVALIDATE_SECRET not configured');
    return NextResponse.json(
      { message: 'REVALIDATE_SECRET not configured' },
      { status: 500 }
    );
  }

  if (authHeader !== `Bearer ${secret}`) {
    console.error('[Revalidate] Invalid token');
    return NextResponse.json(
      { message: 'Invalid token' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    console.log('[Revalidate] Received body:', JSON.stringify(body, null, 2));

    // Strapi sends: { event: 'entry.publish', model: 'project', entry: {...} }
    // Also accept: { model: 'project', slug: '...' }
    const model = body.model || body.entry?.uid?.split('.')[1];
    const slug = body.slug || body.entry?.slug;

    console.log('[Revalidate] Parsed model:', model, 'slug:', slug);

    // For projects, always revalidate everything to be safe
    if (model === 'project' || body.event?.includes('project')) {
      console.log('[Revalidate] Revalidating project pages...');

      // Revalidate all projects pages
      revalidatePath('/projects', 'page');
      console.log('[Revalidate] Revalidated /projects');

      // Also revalidate all project detail pages by revalidating the layout
      revalidatePath('/project', 'layout');
      console.log('[Revalidate] Revalidated /project layout');

      return NextResponse.json({
        revalidated: true,
        message: 'Revalidated all project pages',
        now: Date.now()
      });
    }

    console.log('[Revalidate] No matching model, skipping revalidation');
    return NextResponse.json({
      revalidated: false,
      message: 'No revalidation performed',
      receivedBody: body
    });
  } catch (err) {
    console.error('[Revalidate] Error:', err);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 }
    );
  }
}
