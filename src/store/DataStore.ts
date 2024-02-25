import { Brands, CarFilters } from '@/types'
import { create } from 'zustand'

// =================================================================================================
//                                       TYPES
// =================================================================================================

export type DataStore = {
    brands: Brands
    updateBrands: (newBrands: Brands) => void
}

// =================================================================================================
//                                       INITIAL STATE
// =================================================================================================

const initialState = {
    brands: [],
}

// =================================================================================================
//                                       STORE
// =================================================================================================

export const useDataStore = create<DataStore>(set => ({
    ...initialState,
    updateBrands: (newBrands: Brands) =>
        set(state => ({ ...state, brands: newBrands })),
    // updateFilters: (newFilters: CarFilters) =>
    //     set(state => ({ ...state, filters: newFilters })),
    // updateBottomNavHeight: (newHeight: number) =>
    //     set(state => ({
    //         ...state,
    //         bottomNavHeight: newHeight,
    //         contentOffset: TOP_HEIGHT + newHeight,
    //     })),
}))
