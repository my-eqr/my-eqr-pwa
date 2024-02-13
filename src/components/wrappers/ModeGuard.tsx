'use client'

import React, { useEffect } from 'react'
import { COOKIES, MODES } from '@/types'
import SelectMode from '../../app/_components/SelectMode'
import { useModeStore } from '@/store'

const isServer = typeof window === 'undefined'
export default function ModeGuard({ children }: { children: React.ReactNode }) {
    const { updateActiveMode } = useModeStore()
    let mode = null

    if (!isServer) {
        mode = sessionStorage.getItem(COOKIES.ACTIVE_MODE)
    }

    useEffect(() => {
        if (mode) {
            updateActiveMode(mode as MODES)
        }
    }, [mode, updateActiveMode])

    if (mode === 'null' || mode === 'undefined' || !mode) {
        return <SelectMode />
    }

    return <>{children}</>
}
