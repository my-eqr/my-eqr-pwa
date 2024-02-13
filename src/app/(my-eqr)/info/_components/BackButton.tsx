'use client'
import { CornerUpLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const BackButton = () => {
    const router = useRouter()
    return (
        <CornerUpLeft
            className='text-white'
            onClick={() => router.back()}
            size={36}
        />
    )
}

export default BackButton
