import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('current-path', request.nextUrl.pathname)
    // console.log('requestHeaders', requestHeaders)

    if (request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/home', request.url), {
            headers: requestHeaders,
        })
    }

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // matcher: '/((?!api|_next/static|select-mode|_next/image|favicon.ico).*)',
}
