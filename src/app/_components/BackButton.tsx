'use client'
import { cn } from '@/lib/utils'
import { CornerUpLeft, LucideProps } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface BackButtonProps extends LucideProps {
    className?: string
}

const BackButton = ({ className, ...props }: BackButtonProps) => {
    const router = useRouter()
    return (
        <CornerUpLeft
            className={cn('text-white', className)}
            onClick={() => router.back()}
            size={36}
            {...props}
        />
    )
}

export default BackButton
