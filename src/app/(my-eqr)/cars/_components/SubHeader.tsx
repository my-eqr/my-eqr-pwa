'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { Car, CircuitBoard, Feather, RotateCcw, X } from 'lucide-react'
import { nanoid } from 'nanoid'
import { CarFilters } from '@/types'
import FilterChip from './FilterChip'
import { useFilterStore } from '@/store'
import { generateQueryString, removeFilter } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import BackButton from '@/app/_components/BackButton'
import { Button } from '@/components/ui/button'
import { FavouriteSvg } from '@/components/svgs'

interface SubHeaderProps {
    resultSize?: number
    subHeaderHeight: number
    filters?: CarFilters
}

const SubHeader = ({ resultSize = 0, subHeaderHeight }: SubHeaderProps) => {
    const router = useRouter()
    const {
        filters,
        filteredCount,
        updateFilteredCount,
        updateFilters,
        resetFilter,
    } = useFilterStore()

    // =============================================================================================
    //                                      EFFECTS
    // ============================================================================================

    useEffect(() => {
        updateFilteredCount(resultSize)
    }, [resultSize, updateFilteredCount])

    const isFilterExist = useMemo(() => {
        return Object.values(filters).some(
            filter =>
                (typeof filter === 'boolean' && filter === true) ||
                ((Array.isArray(filter) || typeof filter === 'string') &&
                    filter.length > 0)
        )
    }, [filters])

    // =============================================================================================
    //                                      HANDLERS
    // ============================================================================================
    const refreshFilterChips = <Key extends keyof CarFilters>(
        filterKey: Key,
        filterValueToExclude: string
    ) => {
        const updatedFilter = removeFilter(
            filters,
            filterKey,
            filterValueToExclude
        )
        updateFilters(updatedFilter)
        const queryString = generateQueryString(updatedFilter)
        router.push(`/cars?${queryString}`)
    }

    const onResetFilter = () => {
        resetFilter()
        router.replace(`/cars`)
    }

    // =============================================================================================
    //                                     HELPERS
    // =============================================================================================

    const getFilterChipLabel = (filterKey: string, filterVal: string) => {
        switch (filterKey) {
            case 'brand':
                return (
                    <>
                        <Feather className='mr-2' size={16} color='black' />
                        <span>{filterVal}</span>
                    </>
                )
            case 'bodyType':
                return (
                    <>
                        <Car className='mr-2' size={18} color='black' />
                        <span>{filterVal}</span>
                    </>
                )
            default:
                return (
                    <>
                        <CircuitBoard
                            className='mr-2'
                            size={18}
                            color='black'
                        />
                        <span>{filterVal}</span>
                    </>
                )
        }
    }

    // ===========================================================================================
    //                                     RENDER
    // ===========================================================================================

    return (
        <div
            className={`sticky z-50 flex w-full flex-row flex-nowrap items-center justify-between gap-1 px-2 shadow-md md:gap-4 md:px-4`}
            style={{ height: subHeaderHeight + 'px' }}
        >
            <div className='flex cursor-pointer flex-row items-center'>
                <BackButton
                    color='#FF385C'
                    className=''
                    size={26}
                    strokeWidth={3}
                />
            </div>
            <div className='mr-auto flex flex-row flex-nowrap items-start gap-1 overflow-x-scroll md:gap-2'>
                {filters &&
                    Object.entries(filters).map(([filterKey, filterValue]) =>
                        filterValue && Array.isArray(filterValue) ? (
                            filterValue.map(filterVal => (
                                <FilterChip
                                    key={nanoid()}
                                    label={getFilterChipLabel(
                                        filterKey,
                                        filterVal
                                    )}
                                    filterKey={filterKey as keyof CarFilters}
                                    filterVal={filterVal}
                                    refreshFilterChips={refreshFilterChips}
                                />
                            ))
                        ) : filterKey === '_q' &&
                          typeof filterValue === 'string' &&
                          filterValue.length > 0 ? (
                            <FilterChip
                                key={nanoid()}
                                label={
                                    <span>
                                        <span className='font-bold text-darkGrey'>
                                            Search:
                                        </span>
                                        &nbsp;&nbsp;{filterValue}
                                    </span>
                                }
                                filterKey={filterKey as keyof CarFilters}
                                filterVal={filterValue}
                                refreshFilterChips={refreshFilterChips}
                            />
                        ) : filterKey === 'favouriteEnabled' &&
                          typeof filterValue === 'boolean' &&
                          filterValue ? (
                            <FilterChip
                                key={nanoid()}
                                label={
                                    <>
                                        <FavouriteSvg
                                            className='mr-2 inline h-4 w-4 md:h-4 md:w-4'
                                            pathProps={{
                                                fill: 'black',
                                            }}
                                        />
                                        <span>Favourite</span>
                                    </>
                                }
                                filterKey={filterKey as keyof CarFilters}
                                filterVal={filterValue}
                                refreshFilterChips={refreshFilterChips}
                            />
                        ) : null
                    )}
            </div>
            <div className='flex- flex flex-shrink-0 cursor-pointer flex-row items-center gap-2'>
                {isFilterExist && (
                    <Button
                        className=''
                        size={'sm'}
                        variant={'outline'}
                        onClick={onResetFilter}
                    >
                        <RotateCcw className='mr-2' size={16} />
                        <span className=''>Reset</span>
                    </Button>
                )}
                <div className='text-sm'>
                    <strong>{filteredCount}</strong> result(s)
                </div>
            </div>
        </div>
    )
}

export default SubHeader
