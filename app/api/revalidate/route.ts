import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { message: 'REVALIDATE_SECRET not configured' },
      { status: 500 }
    );
  }

  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json(
      { message: 'Invalid token' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    // Strapi sends: { event: 'entry.publish', model: 'project', entry: {...} }
    // Also accept: { model: 'project', slug: '...' }
    const model = body.model || body.entry?.uid?.split('.')[1];
    const slug = body.slug || body.entry?.slug;

    // For projects, always revalidate everything to be safe
    if (model === 'project' || body.event?.includes('project')) {
      // Revalidate all projects pages
      revalidatePath('/projects', 'page');

      // Also revalidate all project detail pages by revalidating the layout
      revalidatePath('/project', 'layout');

      return NextResponse.json({
        revalidated: true,
        message: 'Revalidated all project pages',
        now: Date.now()
      });
    }

    return NextResponse.json({
      revalidated: false,
      message: 'No revalidation performed',
      receivedBody: body
    });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 }
    );
  }
}
