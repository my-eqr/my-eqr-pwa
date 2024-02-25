import React from 'react'
import BrandList from './_components/BrandList'
import { getBrands } from '@/actions'

const HomePage = async () => {
    const { data: brands, status } = await getBrands()

    if (status !== 200) {
        throw new Error('Failed to fetch brands')
    }

    return (
        <div className='grid grid-cols-2 gap-2 p-2 md:gap-4 md:p-4 lg:grid-cols-3'>
            <BrandList brands={brands} />
        </div>
    )
}

export default HomePage
