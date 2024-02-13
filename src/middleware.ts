import { NextResponse, NextRequest } from 'next/server'
import { COOKIES } from './types'

export function middleware(request: NextRequest) {
    // const activeMode = request.cookies.get(COOKIES.ACTIVE_MODE)?.value
    // console.log('middleware', { activeMode, path: request.nextUrl.pathname })
    // if (activeMode && request.nextUrl.pathname === '/') {
    //     return NextResponse.redirect(new URL('/home', request.url))
    // } else if (activeMode) {
    //     return NextResponse.next()
    // } else if (!activeMode) {
    //     return NextResponse.redirect(new URL('/select-mode', request.url))
    // }
    if (request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/home', request.url))
    }
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // matcher: '/((?!api|_next/static|select-mode|_next/image|favicon.ico).*)',
}
