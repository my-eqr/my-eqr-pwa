'use client'
import { cn } from '@/lib/utils'
import { CarFilters } from '@/types'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'

interface FilterChipProps {
    label: string | ReactNode
    filterKey: keyof CarFilters
    filterVal: string | boolean
    refreshFilterChips: <Key extends keyof CarFilters>(
        filterKey: Key,
        filterValueToExclude: string
    ) => void
}
const FilterChip = ({
    label,
    filterKey,
    filterVal,
    refreshFilterChips,
}: FilterChipProps) => {
    return (
        <div
            className={cn(
                'flex flex-row gap-1 rounded-full border border-gray-200 bg-primaryColor px-5 py-1 pr-3 font-semibold text-white shadow md:gap-2'
            )}
        >
            <div className='flex items-center justify-center whitespace-nowrap text-nowrap'>
                {label}
            </div>
            <X
                className='cursor-pointer'
                onClick={() =>
                    refreshFilterChips(filterKey, filterVal.toString())
                }
            />
        </div>
    )
}

export default FilterChip
