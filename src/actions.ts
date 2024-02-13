'use server'
import { cookies } from 'next/headers'
import { MODES, COOKIES } from '@/types'
export async function setActiveModeCookies(mode: MODES) {
    cookies().set(COOKIES.ACTIVE_MODE, mode, {
        httpOnly: true,
        maxAge: 0, // expires in 10 hours
    })
}

export async function resetActiveModeCookies() {
    cookies().set(COOKIES.ACTIVE_MODE, '', { maxAge: 0 })
}
