'use client'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { useModeStore } from '@/store'
import { TriangleDownIcon } from '@radix-ui/react-icons'
import { Input } from '@/components/ui/input'

const SearchSheet = () => {
    const { activeMode } = useModeStore()
    return (
        <div className='flex w-3/6 flex-row items-center'>
            <Sheet>
                <SheetTrigger className='mx-2 flex w-full flex-row items-center gap-2 text-slate-600'>
                    <Input className='w-full rounded-full shadow-sm' />
                </SheetTrigger>
                <SheetContent side='top'>
                    <SheetHeader>
                        <SheetTitle>
                            <Input className='w-5/6 rounded-full shadow-sm focus-visible:ring-0' />
                        </SheetTitle>
                        <SheetDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default SearchSheet
