'use client'
import React, { useMemo } from 'react'
import Image from 'next/image'
import { nanoid } from 'nanoid'
import { useMediaQuery } from '@uidotdev/usehooks'
import { useRouter } from 'next/navigation'
import { useLayoutStore } from '@/store/LayoutStore'
import { Brands } from '@/types'
import { STRAPI } from '@/constants'
import { useFilterStore } from '@/store'

interface BrandListProps {
    brands: Brands
}
const BrandList = ({ brands }: BrandListProps) => {
    const { contentOffset } = useLayoutStore()
    const { updateBrandFilter } = useFilterStore()
    const isLg = useMediaQuery('only screen and (min-width: 1024px)')
    const isMd = useMediaQuery('only screen and (min-width: 768px)')
    const HOME_ROW = useMemo(() => {
        if (isLg) {
            return 2
        }
        return 4
    }, [isLg])
    const SPACING_OFFSET = isMd ? HOME_ROW * 1 + 1 : HOME_ROW * 0.5 + 0.5
    const router = useRouter()
    console.log('brand', {
        brands,
    })

    return (
        <>
            {brands &&
                brands.map(brand => (
                    <div
                        key={nanoid()}
                        className={`flex items-center justify-center rounded-lg border border-gray-200 bg-white shadow-md`}
                        style={{
                            height: `calc((100vh - ${contentOffset}rem - ${SPACING_OFFSET}rem) / ${HOME_ROW})`,
                        }}
                        onClick={() => {
                            updateBrandFilter([brand?.name || ''])
                            router.push(`/cars?brand=${brand?.name}`)
                        }}
                    >
                        <div className='relative h-4/6 w-4/6'>
                            <Image
                                src={`${STRAPI}${brand?.logo?.url}` || ''}
                                fill={true}
                                className='object-contain'
                                alt='alternative...'
                            />
                        </div>
                    </div>
                ))}
        </>
    )
}

export default BrandList
