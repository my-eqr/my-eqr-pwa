'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useDebounce } from '@uidotdev/usehooks'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Info, RotateCcw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { nanoid } from 'nanoid'
import { cn, generateQueryString } from '@/lib/utils'
import { useMediaQuery } from '@uidotdev/usehooks'
import { useDataStore, useFilterStore } from '@/store'
import {
    Enum_Componentcarmetadatametadata_Bodytype,
    Enum_Componentcarmetadatametadata_Vehicletype,
} from '@/graphql/gql/graphql'
import { useRouter } from 'next/navigation'

interface SearchNFiltersProps {
    setOpen?: Dispatch<SetStateAction<boolean>>
}
const SearchNFilters = ({ setOpen = () => {} }: SearchNFiltersProps) => {
    // =============================================================================================
    //                                  STATE
    // =============================================================================================

    const isSuperSmallHeight = useMediaQuery(
        'only screen and (max-height : 670px)'
    )
    const {
        filters,
        filteredCount,
        updateSearchQuery,
        updateBrandFilter,
        updateBodyTypeFilter,
        updateVehicleTypeFilter,
        updateFavouriteFilter,
    } = useFilterStore()
    const { brands } = useDataStore()
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState(filters._q || '')
    const [favourite, setFavourite] = useState(filters.favouriteEnabled)
    const [selectedBrands, setSelectedBrands] = useState<string[]>(
        filters.brand || []
    )
    const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>(
        filters.bodyType || []
    )
    const [selectedVehicleType, setSelectedVehicleType] = useState<string[]>(
        filters.vehicleType || []
    )
    const debouncedSearchQuery = useDebounce(searchQuery, 300)

    // =================================================================================================
    //                                  EFFECTS
    // =================================================================================================

    // useKeyPressEvent('Enter', () => {
    //     setOpen(false)
    // })

    useEffect(() => {
        updateSearchQuery(debouncedSearchQuery)
    }, [debouncedSearchQuery, updateSearchQuery])

    useEffect(() => {
        updateBrandFilter(selectedBrands)
    }, [selectedBrands, updateBrandFilter])

    useEffect(() => {
        updateBodyTypeFilter(selectedBodyTypes)
    }, [selectedBodyTypes, updateBodyTypeFilter])

    useEffect(() => {
        updateVehicleTypeFilter(selectedVehicleType)
    }, [selectedVehicleType, updateVehicleTypeFilter])

    useEffect(() => {
        updateFavouriteFilter(favourite)
    }, [favourite, updateFavouriteFilter])

    useEffect(() => {
        const queryString = generateQueryString(filters)
        router.replace(`/cars?${queryString}`)
    }, [filters, router, selectedVehicleType, updateVehicleTypeFilter])

    // =============================================================================================
    //                              EVENT HANDLERS
    // =============================================================================================

    const onClickBrand = (brand: string) => {
        !selectedBrands.includes(brand)
            ? setSelectedBrands(prev => [...prev, brand])
            : setSelectedBrands(prev => prev.filter(b => b !== brand))
    }

    const onClickBodyType = (
        bodyType: Enum_Componentcarmetadatametadata_Bodytype
    ) => {
        !selectedBodyTypes.includes(bodyType)
            ? setSelectedBodyTypes(prev => [...prev, bodyType])
            : setSelectedBodyTypes(prev => prev.filter(b => b !== bodyType))
    }

    const onClickVehicleType = (
        vehicleType: Enum_Componentcarmetadatametadata_Vehicletype
    ) => {
        !selectedVehicleType.includes(vehicleType)
            ? setSelectedVehicleType(prev => [...prev, vehicleType])
            : setSelectedVehicleType(prev =>
                  prev.filter(b => b !== vehicleType)
              )
    }

    const onClearFilters = () => {
        setSelectedBrands([])
        setSelectedBodyTypes([])
        setSelectedVehicleType([])
        setFavourite(false)
    }

    // =============================================================================================
    //                                      RENDER
    // =============================================================================================

    return (
        <>
            <div className='text-lg dark:text-slate-50'>
                <form
                    onSubmit={e => {
                        e.preventDefault()
                        setOpen(false)
                    }}
                    action='.'
                >
                    <Input
                        type='search'
                        className='w-[95%] rounded-full text-base shadow-sm'
                        placeholder='Search for a vehicle...'
                        defaultValue={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </form>
            </div>
            <div
                className={`flex flex-col ${isSuperSmallHeight && 'max-h-[500px]'} gap-y-6 overflow-y-scroll px-4 py-2`}
            >
                <div className='flex flex-col items-start justify-start gap-y-1'>
                    <div className='font-medium text-gray-400'>BRAND</div>
                    <div className='flex flex-row flex-wrap gap-2'>
                        {brands &&
                            brands.map(brand => (
                                <div
                                    key={nanoid()}
                                    className={cn(
                                        'cursor-pointer rounded-full border border-gray-200 px-5 py-1 text-gray-400 shadow',
                                        `${selectedBrands.includes(brand?.name || '') ? 'bg-primaryColor font-semibold text-white' : ''}`
                                    )}
                                    onClick={() =>
                                        onClickBrand(brand?.name || '')
                                    }
                                >
                                    {brand?.name.toUpperCase()}
                                </div>
                            ))}
                    </div>
                </div>
                <Separator color='' />
                <div className='flex flex-col items-start justify-start gap-y-1'>
                    <div className='font-medium text-gray-400'>BODY TYPE</div>
                    <div className='flex flex-row flex-wrap gap-2'>
                        {Object.values(
                            Enum_Componentcarmetadatametadata_Bodytype
                        ).map(type => (
                            <div
                                key={nanoid()}
                                className={cn(
                                    'cursor-pointer rounded-full border border-gray-200 px-5 py-1 text-gray-400 shadow',
                                    `${selectedBodyTypes.includes(type) ? 'bg-primaryColor font-semibold text-white' : ''}`
                                )}
                                onClick={() => onClickBodyType(type)}
                            >
                                {type}
                            </div>
                        ))}
                    </div>
                </div>
                <Separator />
                <div className='flex flex-row flex-wrap items-start justify-start gap-x-8 gap-y-4'>
                    <div className='flex flex-col items-start justify-start gap-y-1'>
                        <div className='font-medium text-gray-400'>
                            VEHICLE TYPE
                        </div>
                        <div className='flex flex-row flex-wrap gap-2'>
                            {Object.values(
                                Enum_Componentcarmetadatametadata_Vehicletype
                            ).map(type => (
                                <div
                                    key={nanoid()}
                                    className={cn(
                                        'cursor-pointer rounded-full border border-gray-200 px-5 py-1 text-gray-400 shadow',
                                        `${selectedVehicleType.includes(type) ? 'bg-primaryColor font-semibold text-white' : ''}`
                                    )}
                                    onClick={() => onClickVehicleType(type)}
                                >
                                    {type}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col items-start justify-start'>
                        <div className='mb-1 font-medium text-gray-400'>
                            FAVOURITE
                        </div>
                        <div className='flex flex-row items-center'>
                            <Switch
                                id='favourite'
                                className='mr-4 inline'
                                checked={favourite}
                                onCheckedChange={() =>
                                    setFavourite(prev => !prev)
                                }
                            />
                            <Info
                                className='mr-1 inline'
                                color='rgb(229 231 235)'
                                size={22}
                            />
                            <label
                                htmlFor='favourite'
                                className='inline text-sm text-gray-400'
                            >
                                Limit search results to favourited cars only.
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-3 flex flex-row items-center justify-end md:my-0'>
                <div className='flex flex-row items-center gap-3 text-gray-700'>
                    <span className='text-md'>
                        <strong>{filteredCount}</strong>&nbsp; Results Found
                    </span>
                    <Button variant={'outline'} onClick={onClearFilters}>
                        <RotateCcw className='mr-2' size={18} />
                        <span className='font-medium text-black'>
                            Clear Filters
                        </span>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default SearchNFilters
