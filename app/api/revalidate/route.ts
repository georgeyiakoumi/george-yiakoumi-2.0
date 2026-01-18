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
    const { model, slug } = body;

    if (model === 'project') {
      // Revalidate all projects pages
      revalidatePath('/projects', 'page');

      if (slug) {
        // Revalidate specific project page
        revalidatePath(`/project/${slug}`, 'page');
      }

      return NextResponse.json({
        revalidated: true,
        message: `Revalidated projects${slug ? ` and project/${slug}` : ''}`,
        now: Date.now()
      });
    }

    return NextResponse.json({
      revalidated: false,
      message: 'No revalidation performed'
    });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 }
    );
  }
}
