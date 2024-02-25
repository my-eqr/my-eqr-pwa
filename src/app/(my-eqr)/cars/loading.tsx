'use client'
import React, { useMemo } from 'react'
import SubHeader from './_components/SubHeader'
import { useMediaQuery } from '@uidotdev/usehooks'
import { nanoid } from 'nanoid'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useLayoutStore } from '@/store/LayoutStore'
import { FavouriteSvg } from '@/components/svgs'

const Loading = () => {
    const { subHeaderHeight, contentOffset } = useLayoutStore()
    const isLg = useMediaQuery('only screen and (min-width: 1024px)')
    const isSm = useMediaQuery('only screen and (min-width: 640px)')
    const [rows, spacingOffset] = useMemo(() => {
        let row = 2
        if (isLg) {
            row = 2
            return [row, row * 2.5 + 2.5]
        } else if (isSm) {
            row = 3
            return [row, row * 1 + 1]
        }
        return [row, row * 1 + 1]
    }, [isLg, isSm])

    return (
        <div className='flex h-full flex-col'>
            <SubHeader subHeaderHeight={subHeaderHeight} />
            <div className='grid h-full w-full grid-cols-2 gap-4 overflow-y-scroll p-4 lg:grid-cols-2 lg:gap-10 lg:p-10'>
                {Array.from({ length: 10 }).map(_ => (
                    <Card
                        key={nanoid()}
                        style={{
                            height: `calc((100vh - ${contentOffset}rem - ${subHeaderHeight}px - ${spacingOffset}rem) / ${rows})`,
                        }}
                        className='relative col-span-1 grid w-full cursor-pointer grid-rows-11 rounded-none rounded-l-lg rounded-br-lg shadow-lg transition duration-300 ease-out hover:shadow-xl lg:grid-cols-2'
                    >
                        <div className='relative row-span-7 flex items-center justify-center lg:row-span-full lg:border-r'>
                            <Skeleton className='h-4/6 w-[90%] rounded-md' />
                            <div className='absolute left-0 top-0 ml-2 mt-2 h-8 w-20'>
                                <Skeleton className='h-3/6 w-3/6 rounded-md' />
                            </div>
                            <div className='absolute right-0 top-0 block rounded-bl-lg border-b border-l p-1 lg:hidden'>
                                <FavouriteSvg
                                    className='h-6 w-6 md:h-5 md:w-5'
                                    pathProps={{
                                        fill: '#94a3b8',
                                    }}
                                />
                            </div>
                        </div>
                        <div className='text-md row-span-1 overflow-hidden text-ellipsis whitespace-nowrap p-2 font-medium md:px-4 md:text-lg lg:row-span-2 lg:text-lg'>
                            <Skeleton className='h-6 w-5/6 rounded-md' />
                        </div>
                        <div className='row-span-3 flex flex-row flex-wrap content-start gap-x-2 gap-y-1 overflow-y-auto p-2 md:gap-2 md:px-4 lg:row-span-9'>
                            <Skeleton className='h-6 w-16 rounded-md' />
                            <Skeleton className='h-6 w-16 rounded-md' />
                            <Skeleton className='h-6 w-16 rounded-md' />
                        </div>
                        <div className='absolute right-0 top-0 hidden rounded-bl-lg border-b border-l p-1 md:block'>
                            <FavouriteSvg
                                className='h-6 w-6 md:h-5 md:w-5'
                                pathProps={{
                                    fill: '#94a3b8',
                                }}
                            />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Loading
