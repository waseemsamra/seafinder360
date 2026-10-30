import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    const has = req.cookies.has('sb-access-token') || Array.from(req.cookies.getAll()).some(c => c.name.includes('auth-token') || c.name.includes('supabase'))
    if (!has) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
