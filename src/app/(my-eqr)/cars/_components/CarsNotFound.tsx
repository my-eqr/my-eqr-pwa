'use client'
import DataNotFound from '@/components/svgs/DataNotFound'
import { useLayoutStore } from '@/store'
import React from 'react'

const CarsNotFound = () => {
    const { contentOffset, bottomNavHeight, subHeaderHeight } = useLayoutStore()
    return (
        <div
            className='fixed left-0 right-0 flex h-full w-full flex-col items-center justify-center p-8'
            style={{
                height: `calc(100vh - ${contentOffset}rem - ${subHeaderHeight}px`,
                bottom: bottomNavHeight + 'rem',
            }}
        >
            <DataNotFound className='w-h-64 h-64' />
            <div className='mb-2 mt-8 text-center text-2xl font-bold'>
                We couldn&apos;t find any vehicle that matches your search
            </div>
            <span className='text-slate-500'>
                Please check your spelling or refine your filters
            </span>
        </div>
    )
}

export default CarsNotFound
