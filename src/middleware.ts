import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only guard protected /admin routes (exclude /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const sessionCookie = request.cookies.get('amber_admin_session');

    if (!sessionCookie?.value) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      const redirectResponse = NextResponse.redirect(loginUrl);
      redirectResponse.headers.set('Cache-Control', 'private, no-store, max-age=0, must-revalidate');
      redirectResponse.headers.set('Pragma', 'no-cache');
      return redirectResponse;
    }
  }

  const response = NextResponse.next();

  // Apply strict private no-store headers exclusively to /admin routes (never to public pages)
  if (pathname.startsWith('/admin')) {
    response.headers.set('Cache-Control', 'private, no-store, max-age=0, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
