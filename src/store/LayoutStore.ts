import { create } from 'zustand'
import { BOTTOM_HEIGHT, SUB_HEADER_HEIGHT, TOP_HEIGHT } from '@/constants'

// =================================================================================================
//                                       TYPES
// =================================================================================================

export type LayoutStore = {
    topHeaderHeight: number
    bottomNavHeight: number
    contentOffset: number
    subHeaderHeight: number
    updateBottomNavHeight: (newHeight: number) => void
}

// =================================================================================================
//                                       INITIAL STATE
// =================================================================================================

const initialState = {
    topHeaderHeight: TOP_HEIGHT,
    bottomNavHeight: BOTTOM_HEIGHT,
    contentOffset: TOP_HEIGHT + BOTTOM_HEIGHT,
    subHeaderHeight: SUB_HEADER_HEIGHT,
}

// =================================================================================================
//                                       STORE
// =================================================================================================

export const useLayoutStore = create<LayoutStore>(set => ({
    ...initialState,
    updateBottomNavHeight: (newHeight: number) =>
        set(state => ({
            ...state,
            bottomNavHeight: newHeight,
            contentOffset: TOP_HEIGHT + newHeight,
        })),
}))
