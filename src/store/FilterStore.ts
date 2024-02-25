import { CarFilters } from '@/types'
import { create } from 'zustand'

// =================================================================================================
//                                       TYPES
// =================================================================================================

export type FilterStore = {
    filters: CarFilters
    filteredCount: number
    updateSearchQuery: (newQuery: string) => void
    updateFilteredCount: (newCount: number) => void
    updateFilters: (newFilters: CarFilters) => void
    updateBrandFilter: (newBrand: string[]) => void
    updateBodyTypeFilter: (newBodyType: string[]) => void
    updateVehicleTypeFilter: (newVehicleType: string[]) => void
    updateFavouriteFilter: (newStatus: boolean) => void
    resetFilter: () => void
}

// =================================================================================================
//                                       INITIAL STATE
// =================================================================================================

const initialState = {
    filteredCount: 0,
    filters: {
        _q: '',
        brand: [],
        bodyType: [],
        vehicleType: [],
        favouriteEnabled: false,
    },
}

// =================================================================================================
//                                       STORE
// =================================================================================================

export const useFilterStore = create<FilterStore>(set => ({
    ...initialState,
    updateFilteredCount: (newCount: number) =>
        set(state => ({ ...state, filteredCount: newCount })),
    updateFilters: (newFilters: CarFilters) =>
        set(state => ({ ...state, filters: newFilters })),
    updateSearchQuery: (newQuery: string) =>
        set(state => ({
            ...state,
            filters: {
                ...state.filters,
                _q: newQuery,
            },
        })),
    updateBrandFilter: (newBrand: string[]) =>
        set(state => ({
            ...state,
            filters: {
                ...state.filters,
                brand: [...newBrand],
            },
        })),
    updateBodyTypeFilter: (newBodyType: string[]) =>
        set(state => ({
            ...state,
            filters: {
                ...state.filters,
                bodyType: [...newBodyType],
            },
        })),
    updateVehicleTypeFilter: (newVehicleType: string[]) =>
        set(state => ({
            ...state,
            filters: {
                ...state.filters,
                vehicleType: [...newVehicleType],
            },
        })),
    updateFavouriteFilter: (newStatus: boolean) =>
        set(state => ({
            ...state,
            filters: {
                ...state.filters,
                favouriteEnabled: newStatus,
            },
        })),

    resetFilter: () =>
        set(state => ({ ...state, filters: initialState.filters })),

    // updateBottomNavHeight: (newHeight: number) =>
    //     set(state => ({
    //         ...state,
    //         bottomNavHeight: newHeight,
    //         contentOffset: TOP_HEIGHT + newHeight,
    //     })),
}))
