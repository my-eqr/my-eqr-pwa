'use client'
import React from 'react'
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

const SearchDrawer = () => {
    const pathname = usePathname()
    return (
        <Drawer>
            <DrawerTrigger>
                <div
                    className={`relative -top-12 z-40 flex h-20 w-20 items-center justify-center rounded-full ${pathname === '/info' ? 'bg-white' : 'bg-primaryColor'} shadow-2xl md:h-24 md:w-24`}
                    style={{
                        ...(pathname !== '/info' && {
                            boxShadow: `0 5px 15px rgb(255 56 92 / 0.6)`,
                        }),
                    }}
                >
                    <SearchSvg
                        className='h-10 w-10 md:h-12 md:w-12'
                        pathProps={{
                            fill: `${pathname === '/info' ? '#FF385C' : 'white'}`,
                        }}
                    />
                </div>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>
                        <Input className='w-5/6 rounded-full shadow-sm focus-visible:ring-0' />
                    </DrawerTitle>
                    <DrawerDescription>
                        This action cannot be undone.
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                        {/* <Button variant='outline'>Cancel</Button> */}
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default SearchDrawer
