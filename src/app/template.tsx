import React from 'react'
import { ModeGuard, ClientOnly } from '../components/wrappers'

const template = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <ClientOnly>
            <ModeGuard>{children}</ModeGuard>
        </ClientOnly>
    )
}

export default template
