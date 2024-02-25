import { LoadingSpinner } from '@/components/svgs'
import React from 'react'
import SubHeader from './_components/SubHeader'

const loading = () => {
    return (
        <div className='flex h-full flex-col overflow-y-hidden'>
            <SubHeader />
            <div
                className='flex h-full w-full items-center justify-center'
                style={{ backgroundColor: '#2a2a2e' }}
            >
                <LoadingSpinner stroke='white' size={60} />
            </div>
        </div>
    )
}

export default loading
