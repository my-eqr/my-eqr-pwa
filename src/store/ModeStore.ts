import { create } from 'zustand'
import { MODES, SESSION_STORAGE } from '@/constants'

// =================================================================================================
//                                       TYPES
// =================================================================================================

export type ModeStore = {
    activeMode?: MODES
    updateActiveMode: (newMode: MODES) => void //will update session storage as well
    setActiveMode: (newMode: MODES) => void
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
        set(state => {
            sessionStorage.setItem(SESSION_STORAGE.ACTIVE_MODE, newMode)
            return { ...state, activeMode: newMode }
        }),
    setActiveMode: (newMode: MODES) =>
        set(state => ({ ...state, activeMode: newMode })),
    resetActiveMode: () => set(state => ({ ...state, activeMode: undefined })),
}))
