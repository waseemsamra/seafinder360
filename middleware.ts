import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  if (path.startsWith('/admin')) {
    const hasToken = req.cookies.get('sb-') || req.cookies.get('supabase-auth-token')
    if (!hasToken) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
