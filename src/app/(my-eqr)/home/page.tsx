'use client'

import React, { useState } from 'react'
import BrandList from './_components/BrandList'
import { getBrands } from '@/actions'
import { GetBrands } from '@/graphql/queries'
import { useQuery } from '@apollo/client'
import { Brands } from '@/types'
import { simplify } from '@/lib/utils'
import BrandLoading from './loading'
import { useDataStore } from '@/store'

const HomePage = () => {
    const { brands: offlineBrands } = useDataStore()
    const [brands, setBrands] = useState<Brands>(offlineBrands)
    const { loading } = useQuery(GetBrands, {
        onCompleted: data => {
            const simplifiedData = simplify(data!).brands
            setBrands(simplifiedData)
        },
        onError: error => {
            throw new Error('Failed to fetch brands')
        },
    })
    // const { data: brands, status } = await getBrands()

    // if (status !== 200) {
    //     throw new Error('Failed to fetch brands')
    // }

    return (
        <div className='grid grid-cols-2 gap-2 p-2 md:gap-4 md:p-4 lg:grid-cols-3'>
            {loading ? <BrandLoading /> : <BrandList brands={brands} />}
        </div>
    )
}

export default HomePage
