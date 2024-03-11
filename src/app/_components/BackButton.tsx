'use client'
import { cn } from '@/lib/utils'
import { CornerUpLeft, LucideProps } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface BackButtonProps extends LucideProps {
    className?: string
    returnRoute?: string
}

const BackButton = ({ className, returnRoute, ...props }: BackButtonProps) => {
    const router = useRouter()
    return (
        <CornerUpLeft
            className={cn('cursor-pointer text-white', className)}
            onClick={() =>
                returnRoute ? router.push(returnRoute) : router.back()
            }
            size={36}
            {...props}
        />
    )
}

export default BackButton
