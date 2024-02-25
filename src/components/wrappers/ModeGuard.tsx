'use client'

import React, { useEffect } from 'react'
import { SESSION_STORAGE, MODES } from '@/constants'
import SelectMode from '../../app/_components/SelectMode'
import { useModeStore } from '@/store'

const isServer = typeof window === 'undefined'
export default function ModeGuard({ children }: { children: React.ReactNode }) {
    const { updateActiveMode } = useModeStore()
    let mode: string | null = null

    if (!isServer) {
        mode = sessionStorage.getItem(SESSION_STORAGE.ACTIVE_MODE)
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
