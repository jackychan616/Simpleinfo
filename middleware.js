import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Keep /content root page untouched.
  if (pathname === '/content') return NextResponse.next();

  // Route all legacy content paths to DB-backed renderer.
  if (pathname.startsWith('/content/')) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace('/content/', '/content-db/');
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/content/:path*'],
};
