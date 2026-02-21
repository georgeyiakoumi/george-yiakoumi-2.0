import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';

  // Handle cv subdomain
  if (hostname === 'cv.georgeyiakoumi.com') {
    const path = request.nextUrl.pathname;

    // If root path, rewrite to /cv
    if (path === '/') {
      return NextResponse.rewrite(new URL('/cv', request.url));
    }

    // If any other path (except /cv and Next.js internals), redirect to main domain
    if (!path.startsWith('/cv') && !path.startsWith('/_next') && !path.startsWith('/api')) {
      const url = new URL(request.url);
      url.hostname = 'georgeyiakoumi.com';
      return NextResponse.redirect(url, 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
