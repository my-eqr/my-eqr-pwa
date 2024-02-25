'use client'
import React, { useState } from 'react'
import { ProfileSvg } from '@/components/svgs'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { useModeStore } from '@/store'
import { TriangleDownIcon, TriangleLeftIcon } from '@radix-ui/react-icons'
import Mode from '@/app/_components/Mode'

const ModeSheet = () => {
    const { activeMode } = useModeStore()
    const [open, setOpen] = useState(false)
    return (
        <div className='flex flex-row items-center'>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger className='mx-2 flex flex-row items-center gap-2 text-slate-600'>
                    <ProfileSvg />
                    <span className='hidden md:block'>{activeMode}</span>
                    <TriangleDownIcon className='hidden md:block' />
                </SheetTrigger>
                <SheetContent
                    side='top'
                    className='overflow-y-scroll border-0 bg-primaryColor'
                >
                    <SheetHeader>
                        <SheetTitle className='mb-1 pl-4 text-2xl text-white md:mb-2'>
                            Select Mode
                        </SheetTitle>
                        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
                            <Mode setOpen={setOpen} />
                        </div>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default ModeSheet
