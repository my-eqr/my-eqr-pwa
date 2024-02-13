import { create } from 'zustand'
import { MODES } from '@/types'

// =================================================================================================
//                                       TYPES
// =================================================================================================

export type ModeStore = {
    activeMode?: MODES
    updateActiveMode: (newMode: MODES) => void
    resetActiveMode: () => void
}

// =================================================================================================
//                                       INITIAL STATE
// =================================================================================================

const initialState = {
    activeMode: MODES.RESCUE,
}

// =================================================================================================
//                                       STORE
// =================================================================================================

export const useModeStore = create<ModeStore>(set => ({
    ...initialState,
    updateActiveMode: (newMode: MODES) =>
        set(state => ({ ...state, activeMode: newMode })),
    resetActiveMode: () => set(state => ({ ...state, activeMode: undefined })),
}))
