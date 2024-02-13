import React from 'react'
import { InfoSvg, ProfileSvg } from '@/components/svgs'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import ModeSheet from './ModeSheet'
import SearchSheet from './SearchSheet'

interface TopNavBarProps {
    navBarHeight: string
}
const TopNavBar = ({ navBarHeight }: TopNavBarProps) => {
    return (
        <div
            className={`sticky top-0 z-10 w-full bg-white shadow-md`}
            style={{ height: `${navBarHeight}rem` }}
        >
            <div className='flex h-full w-full flex-row items-center justify-between gap-4 px-2 py-4 md:px-4 md:py-4'>
                <div className='flex flex-row items-center'>
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
