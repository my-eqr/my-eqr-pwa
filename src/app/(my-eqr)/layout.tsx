import React from 'react'
import TopNavBar from './_components/topNavBar'
import BottomNavBar from './_components/bottomNavBar'
import { TOP_HEIGHT, BOTTOM_HEIHT, BODY_OFFSET } from '@/constants'

const MyEqrLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <div className='flex flex-col overflow-hidden bg-white'>
            {/* <div className='fixed inset-0 flex flex-col overflow-hidden bg-white'> */}
            <TopNavBar navBarHeight={TOP_HEIGHT} />

            <div
                className={`overflow-y-auto`}
                style={{ height: `calc(100vh - ${BODY_OFFSET}rem)` }}
            >
                {children}
            </div>
            <BottomNavBar navBarHeight={BOTTOM_HEIHT} />
        </div>
    )
}

export default MyEqrLayout
