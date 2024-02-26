'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { nanoid } from 'nanoid'
import { useMediaQuery } from '@uidotdev/usehooks'
import { useLayoutStore } from '@/store/LayoutStore'
import { Cars } from '@/types'
import { LOCAL_STORAGE, STRAPI } from '@/constants'
import CarsNotFound from './CarsNotFound'
import CarCard from './CarCard'
import { useFilterStore } from '@/store'
interface CarListProps {
    cars: Cars
    subHeaderHeight: number
}
const CarList = ({ cars, subHeaderHeight }: CarListProps) => {
    const { contentOffset } = useLayoutStore()
    const {
        filters: { favouriteEnabled },
        updateFilteredCount,
    } = useFilterStore()
    const isLg = useMediaQuery('only screen and (min-width: 1024px)')
    const isSm = useMediaQuery('only screen and (min-width: 640px)')
    const [carList, setCarList] = useState<Cars>()
    const [favouritedCars, setFavouritedCars] = useState<string[]>(
        JSON.parse(localStorage.getItem(LOCAL_STORAGE.FAVOURITED_CARS) || '[]')
    )

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

    console.log('spacingXOffset', spacingXOffset)

    useEffect(() => {
        setCarList(cars)
    }, [cars])

    useEffect(() => {
        updateFilteredCount(carList?.length || 0)
    }, [carList, updateFilteredCount])

    // =============================================================================================
    //                                    HANDLERS
    // =============================================================================================

    const updateFavouritedCars = (id: string) => {
        if (favouritedCars.includes(id)) {
            setFavouritedCars(currentFav => {
                const updatedFavs = currentFav.filter(car => car !== id)
                localStorage.setItem(
                    LOCAL_STORAGE.FAVOURITED_CARS,
                    JSON.stringify(updatedFavs)
                )
                setCarList(currentCarList =>
                    favouriteEnabled && currentCarList
                        ? currentCarList.filter(car =>
                              updatedFavs.includes(car?.id!)
                          )
                        : currentCarList
                )
                return updatedFavs
            })
        } else {
            setFavouritedCars(currentFav => {
                const updatedFavs = [...currentFav, id]
                localStorage.setItem(
                    LOCAL_STORAGE.FAVOURITED_CARS,
                    JSON.stringify(updatedFavs)
                )
                setCarList(currentCarList =>
                    favouriteEnabled && currentCarList
                        ? currentCarList.filter(car =>
                              updatedFavs.includes(car?.id!)
                          )
                        : currentCarList
                )
                return updatedFavs
            })
        }
    }

    // =============================================================================================
    //                                      RENDER
    // =============================================================================================

    return (
        <div className='flex h-full w-full flex-row flex-wrap content-start items-start gap-4 overflow-y-scroll p-4 lg:gap-10 lg:p-10'>
            {/* <div className='grid h-full w-full grid-cols-2 gap-4 overflow-y-scroll p-4 lg:grid-cols-2 lg:gap-10 lg:p-10'> */}
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
                        isFavourite={
                            favouritedCars && favouritedCars.includes(car?.id!)
                        }
                        updateFavouritedCars={updateFavouritedCars}
                    />
                ))
            ) : (
                <CarsNotFound />
            )}
        </div>
    )
}

export default CarList
