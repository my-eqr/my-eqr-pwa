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
import { Input } from '@/components/ui/input'
import { SearchSvg } from '@/components/svgs'
import SearchNFilters from '../searchNFilters'
import { useFilterStore } from '@/store'

const SearchSheet = () => {
    const { filters } = useFilterStore()
    const [open, setOpen] = useState(false)

    return (
        <div className='hidden w-3/6 flex-row items-center md:flex'>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger className='relative mx-2 flex w-full flex-row items-center gap-2 text-gray-600 focus-visible:outline-none'>
                    <Input
                        className='w-full rounded-full shadow-sm'
                        placeholder='Search for a vehicle...'
                        defaultValue={filters._q || ''}
                    />
                    <div
                        className={`absolute right-2 z-40 flex h-6 w-6 items-center justify-center rounded-full bg-primaryColor`}
                    >
                        <SearchSvg
                            className='h-3 w-3'
                            pathProps={{
                                fill: 'white',
                            }}
                        />
                    </div>
                </SheetTrigger>
                <SheetContent
                    onCloseAutoFocus={() => console.log('aksdjflasdjflksdjf')}
                    className='pb-4'
                    side='top'
                >
                    <SheetHeader className='gap-y-2'>
                        <SearchNFilters setOpen={setOpen} />
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default SearchSheet
