'use client'
import React, { useEffect, useState, useTransition } from 'react'
import { wait } from '@/lib/utils'
import { LOCAL_STORAGE, SUB_HEADER_HEIGHT } from '@/constants'
import CarList from './_components/CarList'
import SubHeader from './_components/SubHeader'
import { getCars } from '@/actions'
import { CarFilters, Cars } from '@/types'
import { LoadingSpinner } from '@/components/svgs'
import { useFilterStore } from '@/store'
import CarListLoading from './_components/CarListLoading'

const CarsPage = ({
    searchParams: { _q, brand, bodyType, vehicleType, favourite },
}: {
    searchParams: {
        _q?: string
        brand?: string
        bodyType?: string
        vehicleType?: string
        favourite?: string
    }
}) => {
    const { updateFilters } = useFilterStore()
    const [isPending, startTransition] = useTransition()
    const [cars, setCars] = useState<Cars>()
    useEffect(() => {
        updateFilters({
            _q: _q || '',
            brand: (brand && brand.split(',')) || [],
            bodyType: (bodyType && bodyType.split(',')) || [],
            vehicleType: (vehicleType && vehicleType.split(',')) || [],
            favouriteEnabled: favourite && favourite === 'true' ? true : false,
        })
        startTransition(async () => {
            // await wait(5000)
            const { data } = await getCars({
                ...(_q && {
                    name: {
                        containsi: _q,
                    },
                }),
                ...(brand && {
                    brand: {
                        name: {
                            in: brand.split(','),
                        },
                    },
                }),
                ...((bodyType || vehicleType) && {
                    metadata: {
                        ...(bodyType && {
                            bodyType: {
                                in: bodyType.split(','),
                            },
                        }),
                        ...(vehicleType && {
                            vehicleType: {
                                in: vehicleType.split(','),
                            },
                        }),
                    },
                }),
            })

            console.log('data', data)

            if (data && favourite && favourite === 'true') {
                const favouritedCars = JSON.parse(
                    localStorage.getItem(LOCAL_STORAGE.FAVOURITED_CARS) || '[]'
                )
                setCars(data.filter(car => favouritedCars.includes(car.id)))
            } else {
                setCars(data)
            }
        })
    }, [_q, bodyType, brand, favourite, updateFilters, vehicleType])

    return (
        <div className='flex h-full flex-col'>
            <SubHeader
                subHeaderHeight={SUB_HEADER_HEIGHT}
                resultSize={cars?.length}
            />
            {isPending ? (
                <CarListLoading />
            ) : (
                <CarList cars={cars} subHeaderHeight={SUB_HEADER_HEIGHT} />
            )}
        </div>
    )
}

export default CarsPage
