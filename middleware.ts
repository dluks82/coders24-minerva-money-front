import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('minerva_token')
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                    request.nextUrl.pathname.startsWith('/signup')
  const isPublicPage = isAuthPage

  // Se estiver em uma página pública e estiver autenticado
  if (isPublicPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Se não estiver em uma página pública e não estiver autenticado
  if (!isPublicPage && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}