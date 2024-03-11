import React from 'react'
import TopNavBar from './_components/topNavBar'
import BottomNavBar from './_components/bottomNavBar'
import Content from './_components/Content'
import { getBrands } from '@/actions'

const MyEqrLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    const { data: brands, status } = await getBrands()

    if (status !== 200) {
        throw new Error('Failed to fetch brands')
    }

    return (
        <div className='flex flex-col overflow-y-hidden bg-white'>
            <TopNavBar brands={brands} />
            <Content>{children}</Content>
            <BottomNavBar />
        </div>
    )
}

export default MyEqrLayout
