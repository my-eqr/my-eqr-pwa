'use client'

import React, { useEffect, useState } from 'react'
import { SESSION_STORAGE, MODES } from '@/constants'
import SelectMode from '../../app/_components/SelectMode'
import { useModeStore } from '@/store'

const isServer = typeof window === 'undefined'
export default function ModeGuard({ children }: { children: React.ReactNode }) {
    const { updateActiveMode } = useModeStore()
    // const [swStatus, setSwStatus] = useState(false)
    // const [cachesContent, setCachesContent] = useState<string | string[]>(
    //     'No Cache Found'
    // )

    let mode: string | null = null

    if (!isServer) {
        mode = sessionStorage.getItem(SESSION_STORAGE.ACTIVE_MODE)
    }

    useEffect(() => {
        if (mode) {
            updateActiveMode(mode as MODES)
        }
    }, [mode, updateActiveMode])

    // useEffect(() => {
    //     const set = async () => {
    //         if ('serviceWorker' in navigator) {
    //             await navigator.serviceWorker.ready.then(registration => {
    //                 setSwStatus(true)
    //             })
    //             caches.keys().then(cacheNames => {
    //                 setCachesContent(cacheNames)
    //             })
    //         }
    //     }
    //     set()
    // }, [])

    // console.log('swStatus', swStatus)
    // console.log('cachesContent', cachesContent)

    if (mode === 'null' || mode === 'undefined' || !mode) {
        return <SelectMode />
    }

    return <>{children}</>
}
