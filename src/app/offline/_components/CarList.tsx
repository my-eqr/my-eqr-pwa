'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { nanoid } from 'nanoid'
import { useMediaQuery } from '@uidotdev/usehooks'
import { useLayoutStore } from '@/store/LayoutStore'
import { Cars } from '@/types'
import { LOCAL_STORAGE, STRAPI } from '@/constants'
import CarsNotFound from './CarsNotFound'
import { useFilterStore } from '@/store'
import CarCard from './CarCard'
interface CarListProps {
    cars: Cars
}
const CarList = ({ cars }: CarListProps) => {
    const { contentOffset, subHeaderHeight } = useLayoutStore()
    const isLg = useMediaQuery('only screen and (min-width: 1024px)')
    const isSm = useMediaQuery('only screen and (min-width: 640px)')
    const [carList, setCarList] = useState<Cars>()

    // =============================================================================================
    //                                   EFFECTS
    // =============================================================================================
    const [rows, spacingXOffset, spacingYOffset] = useMemo(() => {
        let row = 2
        if (isLg) {
            row = 2
            return [row, 3 * 2.5, row * 2.5 + 2.5]
        } else if (isSm) {
            row = 3
            return [row, 3 * 2.5, row * 1 + 1]
        }
        return [row, 3 * 1, row * 1 + 1]
    }, [isLg, isSm])

    useEffect(() => {
        setCarList(cars)
    }, [cars])

    // =============================================================================================
    //                                    HANDLERS
    // =============================================================================================

    // =============================================================================================
    //                                      RENDER
    // =============================================================================================

    return (
        <div className='debug flex h-full w-full flex-row flex-wrap content-start items-start gap-4 overflow-y-scroll p-4 lg:gap-10 lg:p-10'>
            {carList && carList?.length > 0 ? (
                carList.map(car => (
                    <CarCard
                        key={nanoid()}
                        contentOffset={contentOffset}
                        subHeaderHeight={subHeaderHeight}
                        rows={rows}
                        spacingXOffset={spacingXOffset}
                        spacingYOffset={spacingYOffset}
                        car={car}
                    />
                ))
            ) : (
                <CarsNotFound />
            )}
        </div>
    )
}

export default CarList
