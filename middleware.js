import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const cutoverEnabled = String(process.env.CONTENT_DB_CUTOVER || '').toLowerCase() === '1';

  // Safe default: keep legacy content pages active unless explicitly enabled.
  if (!cutoverEnabled) return NextResponse.next();

  if (pathname === '/content') return NextResponse.next();

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
