'use client'
import { useLayoutStore } from '@/store/LayoutStore'
import React, { ReactNode } from 'react'

interface ContentProps {
    children: ReactNode
}
const Content = ({ children }: ContentProps) => {
    const { contentOffset } = useLayoutStore()
    return (
        <div
            className={`overflow-y-auto`}
            style={{ height: `calc(100vh - ${contentOffset}rem)` }}
        >
            {children}
        </div>
    )
}

export default Content
