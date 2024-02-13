import { LoadingSpinner } from '@/components/svgs'
import React from 'react'

const loading = () => {
    return (
        <div className='flex h-full w-full items-center justify-center'>
            <LoadingSpinner className='h-18 w-18' />
            <div className='ml-2 text-xl font-medium text-darkGrey'>
                Loading...
            </div>
        </div>
    )
}

export default loading
