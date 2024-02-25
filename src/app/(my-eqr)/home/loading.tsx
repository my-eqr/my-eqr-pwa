'use client'
import { LoadingSpinner } from '@/components/svgs'
import React from 'react'
import { nanoid } from 'nanoid'
import { HOME_ROW } from '@/constants'
import { Skeleton } from '@/components/ui/skeleton'
import { useLayoutStore } from '@/store/LayoutStore'

const Loading = () => {
    const { contentOffset } = useLayoutStore()
    return (
        <div className='grid grid-cols-2 gap-2 p-2 md:gap-4 md:p-4 lg:grid-cols-3'>
            {Array.from({ length: 10 }, (_, index) => (
                <div
                    key={nanoid()}
                    className={`flex items-center justify-center rounded-lg   `}
                    style={{
                        height: `calc((100vh - ${contentOffset}rem - ${HOME_ROW + 1}rem) / ${HOME_ROW})`,
                    }}
                >
                    <Skeleton className='h-full w-full rounded-xl' />
                </div>
            ))}
        </div>
    )
}

export default Loading
