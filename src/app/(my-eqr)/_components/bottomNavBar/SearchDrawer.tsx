'use client'
import React, { Dispatch, useLayoutEffect, useRef, useState } from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { SearchSvg } from '@/components/svgs'
import { Input } from '@/components/ui/input'
import { usePathname } from 'next/navigation'
import SearchNFilters from '../searchNFilters'

interface SearchDrawerProps {
    setIndicatorLeft: Dispatch<React.SetStateAction<number>>
}

const SearchDrawer = ({ setIndicatorLeft }: SearchDrawerProps) => {
    const searchRef = useRef<HTMLButtonElement>(null)
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    useLayoutEffect(() => {
        const isCarsPath = /^\/cars($|\/.*)/.test(pathname)
        if (isCarsPath) {
            setIndicatorLeft(searchRef.current?.offsetLeft! - 32 || 0)
        }
    }, [pathname, setIndicatorLeft])

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger
                className='relative focus-visible:outline-none'
                ref={searchRef}
            >
                <div
                    className={` absolute -left-[40px] bottom-0 z-40 flex h-20 w-20 items-center justify-center rounded-full md:-left-[40px] ${pathname === '/info' ? 'bg-white' : 'bg-primaryColor'} shadow-2xl md:h-20 md:w-20`}
                    style={{
                        ...(pathname !== '/info' && {
                            boxShadow: `0 5px 15px rgb(255 56 92 / 0.6)`,
                        }),
                    }}
                >
                    <SearchSvg
                        className='h-10 w-10 md:h-11 md:w-11'
                        pathProps={{
                            fill: `${pathname === '/info' ? '#FF385C' : 'white'}`,
                        }}
                    />
                </div>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className='gap-y-4'>
                    <SearchNFilters setOpen={setOpen} />
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    )
}

export default SearchDrawer
