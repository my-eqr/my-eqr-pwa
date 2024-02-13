import React from 'react'
import { SearchSvg, FavouriteSvg, HomeSvg } from '@/components/svgs'
import Link from 'next/link'
import SearchDrawer from './SearchDrawer'

interface BottomNavBarProps {
    navBarHeight: string
}
const BottomNavBar = ({ navBarHeight }: BottomNavBarProps) => {
    return (
        <div
            className={`sticky bottom-0 z-10 w-full bg-white p-4 shadow-bottom-nav`}
            style={{ height: `${navBarHeight}rem` }}
        >
            <div className='flex h-full w-full flex-row items-center justify-evenly'>
                <Link
                    href='/home'
                    scroll={false}
                    className='flex items-center justify-center'
                >
                    <HomeSvg className='h-12 w-12 md:h-14 md:w-14' />
                </Link>
                <SearchDrawer />
                {/* <div
                    className=' relative -top-12 z-40 flex h-20 w-20 items-center justify-center rounded-full bg-primaryColor shadow-2xl md:h-24 md:w-24'
                    style={{
                        boxShadow: '0 5px 15px rgb(255 56 92 / 0.6)',
                    }}
                >
                    <SearchSvg className='h-10 w-10 md:h-12 md:w-12' />
                </div> */}
                <div className='flex items-center justify-center'>
                    <FavouriteSvg className='h-12 w-12 md:h-14 md:w-14' />
                </div>
            </div>
        </div>
    )
}

export default BottomNavBar
