'use client'
import React, { useEffect } from 'react'
import { InfoSvg, ProfileSvg } from '@/components/svgs'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import ModeSheet from './ModeSheet'
import SearchSheet from './SearchSheet'
import { usePathname, useRouter } from 'next/navigation'
import { useLayoutStore } from '@/store/LayoutStore'
import { Menu } from 'lucide-react'
import SideNavigation from './SideNavigation'
import { Brands } from '@/types'
import { useDataStore } from '@/store'

interface TopNavBarProps {
    brands?: Brands
}
const TopNavBar = ({ brands }: TopNavBarProps) => {
    const { updateBrands } = useDataStore()
    const { topHeaderHeight } = useLayoutStore()
    const path = usePathname()

    const isCarsPath = /^\/cars($|\/.*)/.test(path)

    useEffect(() => {
        updateBrands(brands)
    }, [brands, updateBrands])

    return (
        <div
            className={`sticky top-0 z-10 w-full ${isCarsPath ? 'border-b' : 'shadow-md'} bg-white`}
            style={{ height: `${topHeaderHeight}rem` }}
        >
            <div className='flex h-full w-full flex-row items-center justify-between gap-4 px-2 py-4 md:px-4 md:py-4'>
                <div className='flex flex-row items-center'>
                    <SideNavigation />
                    <div className='mr-1 text-2xl font-extrabold text-darkGrey md:text-3xl'>
                        My<span className='text-primaryColor'>EQR</span>
                    </div>
                    <Link href={'/info'}>
                        <InfoSvg />
                    </Link>
                </div>
                <div className='flex h-full w-full flex-row items-center justify-end'>
                    <SearchSheet />
                    <Separator
                        orientation='vertical'
                        className='hidden md:ml-2 md:mr-1 md:block'
                    />
                    <ModeSheet />
                </div>
            </div>
        </div>
    )
}

export default TopNavBar
