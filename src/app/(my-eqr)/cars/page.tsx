'use client'
import React, { useEffect, useState, useTransition } from 'react'
import { simplify, wait } from '@/lib/utils'
import { LOCAL_STORAGE, SUB_HEADER_HEIGHT } from '@/constants'
import CarList from './_components/CarList'
import SubHeader from './_components/SubHeader'
import { getCars } from '@/actions'
import { CarFilters, Cars } from '@/types'
import { LoadingSpinner } from '@/components/svgs'
import { useFilterStore } from '@/store'
import CarListLoading from './_components/CarListLoading'
import { GetCars } from '@/graphql/queries'
import { useQuery } from '@apollo/client'

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
    // const [isPending, startTransition] = useTransition()
    const [cars, setCars] = useState<Cars>()
    const { loading, error, data } = useQuery(GetCars, {
        onCompleted: data => {
            const simplifiedData = simplify(data!).cars
            if (simplifiedData && favourite && favourite === 'true') {
                const favouritedCars = JSON.parse(
                    localStorage.getItem(LOCAL_STORAGE.FAVOURITED_CARS) || '[]'
                )
                setCars(
                    simplifiedData.filter(car =>
                        favouritedCars.includes(car.id)
                    )
                )
            } else {
                setCars(simplifiedData)
            }
        },
        onError: error => {
            throw new Error('Failed to fetch cars')
        },
        variables: {
            filters: {
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
            },
        },
    })

    useEffect(() => {
        updateFilters({
            _q: _q || '',
            brand: (brand && brand.split(',')) || [],
            bodyType: (bodyType && bodyType.split(',')) || [],
            vehicleType: (vehicleType && vehicleType.split(',')) || [],
            favouriteEnabled: favourite && favourite === 'true' ? true : false,
        })
    }, [_q, bodyType, brand, favourite, updateFilters, vehicleType])
    // useEffect(() => {
    //     updateFilters({
    //         _q: _q || '',
    //         brand: (brand && brand.split(',')) || [],
    //         bodyType: (bodyType && bodyType.split(',')) || [],
    //         vehicleType: (vehicleType && vehicleType.split(',')) || [],
    //         favouriteEnabled: favourite && favourite === 'true' ? true : false,
    //     })
    //     startTransition(async () => {
    //         // await wait(5000)
    //         const { data, status } = await getCars({
    //             ...(_q && {
    //                 name: {
    //                     containsi: _q,
    //                 },
    //             }),
    //             ...(brand && {
    //                 brand: {
    //                     name: {
    //                         in: brand.split(','),
    //                     },
    //                 },
    //             }),
    //             ...((bodyType || vehicleType) && {
    //                 metadata: {
    //                     ...(bodyType && {
    //                         bodyType: {
    //                             in: bodyType.split(','),
    //                         },
    //                     }),
    //                     ...(vehicleType && {
    //                         vehicleType: {
    //                             in: vehicleType.split(','),
    //                         },
    //                     }),
    //                 },
    //             }),
    //         })

    //         if (status !== 200) {
    //             throw new Error('Failed to fetch cars')
    //         }

    //         if (data && favourite && favourite === 'true') {
    //             const favouritedCars = JSON.parse(
    //                 localStorage.getItem(LOCAL_STORAGE.FAVOURITED_CARS) || '[]'
    //             )
    //             setCars(data.filter(car => favouritedCars.includes(car.id)))
    //         } else {
    //             setCars(data)
    //         }
    //     })
    // }, [_q, bodyType, brand, favourite, updateFilters, vehicleType])

    return (
        <div className='flex h-full flex-col'>
            <SubHeader
                subHeaderHeight={SUB_HEADER_HEIGHT}
                resultSize={cars?.length}
            />
            {loading ? (
                <CarListLoading />
            ) : (
                <CarList cars={cars} subHeaderHeight={SUB_HEADER_HEIGHT} />
            )}
            {/* {isPending ? (
                <CarListLoading />
            ) : (
                <CarList cars={cars} subHeaderHeight={SUB_HEADER_HEIGHT} />
            )} */}
        </div>
    )
}

export default CarsPage
