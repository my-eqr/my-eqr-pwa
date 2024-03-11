import { Brands, Car, CarFilters, Cars, CarsRescueSheets } from '@/types'
import { create } from 'zustand'
import { persist, createJSONStorage, StorageValue } from 'zustand/middleware'
import localforage from 'localforage'

// =================================================================================================
//                                       TYPES
// =================================================================================================

export type DataStore = {
    brands: Brands
    offlineCars: Cars
    carRescueSheets: CarsRescueSheets
    updateBrands: (newBrands: Brands) => void
    addOfflineCars: (newCars: Cars) => void
    updateOfflineCars: (newCars: Cars) => void
    updateRescueSheets: (newCarRescueSheets: CarsRescueSheets) => void
    removeRescueSheets: (id: string) => void
}

// =================================================================================================
//                                       INITIAL STATE
// =================================================================================================

const initialState = {
    brands: [],
    offlineCars: [],
    carRescueSheets: {},
}

// =================================================================================================
//                                          STORE
// =================================================================================================

export const useDataStore = create(
    persist<DataStore>(
        set => ({
            ...initialState,
            updateBrands: (newBrands: Brands) =>
                set(state => ({ ...state, brands: newBrands })),
            addOfflineCars: (newCars: Cars) =>
                set(state => ({
                    ...state,
                    offlineCars: state.offlineCars?.concat(newCars!) || [],
                })),
            updateOfflineCars: (newCars: Cars) =>
                set(state => ({
                    ...state,
                    offlineCars: newCars || [],
                })),
            updateRescueSheets: (newCarRescueSheets: CarsRescueSheets) =>
                set(state => ({
                    ...state,
                    carRescueSheets: {
                        ...state.carRescueSheets,
                        ...newCarRescueSheets,
                    },
                })),
            removeRescueSheets: (id: string) =>
                set(state => {
                    const updatedRescueSheets = { ...state.carRescueSheets }
                    delete updatedRescueSheets[id]

                    return {
                        ...state,
                        carRescueSheets: updatedRescueSheets,
                    }
                }),
        }),
        {
            name: 'offline-data-store',
            storage: createJSONStorage(() => ({
                getItem: async (name: string): Promise<string | null> => {
                    console.log(name, 'has been retrieved')
                    return (await localforage.getItem(name)) || null
                },
                setItem: async (name: string, value: string): Promise<void> => {
                    console.log(name, 'with value', value, 'has been saved')
                    await localforage.setItem(name, value)
                },
                removeItem: async (name: string): Promise<void> => {
                    console.log(name, 'has been deleted')
                    await localforage.removeItem(name)
                },
            })),
        }
    )
)
