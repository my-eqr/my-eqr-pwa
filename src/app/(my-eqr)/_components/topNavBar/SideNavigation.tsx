'use client'
import React, { useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { FavouriteSvg, HomeSvg } from '@/components/svgs'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const SideNavigation = () => {
    const pathname = usePathname()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const onHomeHandler = () => {
        router.replace('/home')
        setOpen(false)
        sessionStorage.clear()
        router.refresh()
    }
    return (
        <div className='hidden w-3/6 flex-row items-center md:flex'>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger>
                    <Menu className='mr-3 hidden lg:block' />
                </SheetTrigger>
                <SheetContent
                    className='!max-w-60 border-0 bg-primaryColor px-4 pb-4 font-semibold text-white'
                    side='left'
                >
                    <div className='mt-8 flex flex-col items-start justify-center gap-y-2'>
                        <div
                            onClick={() => setTimeout(onHomeHandler, 500)}
                            className={cn(
                                'flex w-full cursor-pointer items-center rounded-lg py-2 pl-4 text-lg',
                                `${pathname === '/home' && 'bg-white bg-opacity-15'}`
                            )}
                        >
                            <HomeSvg
                                className='mr-3 inline h-8 w-8'
                                pathProps={{ fill: 'white' }}
                            />
                            Home
                        </div>
                        <Link
                            href='/cars?favourites=true'
                            className={cn(
                                'flex w-full items-center rounded-lg  py-2 pl-4 text-lg',
                                `${/^\/cars($|\/.*)/.test(pathname) && 'bg-white bg-opacity-15'}`
                            )}
                            onClick={() =>
                                setTimeout(() => setOpen(false), 200)
                            }
                        >
                            <FavouriteSvg
                                className='mr-3 inline h-8 w-8'
                                pathProps={{ fill: 'white' }}
                            />
                            Favourite
                        </Link>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default SideNavigation
