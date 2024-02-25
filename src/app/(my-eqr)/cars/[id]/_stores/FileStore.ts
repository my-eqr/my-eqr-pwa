import { FILE_TYPE } from '@/constants'
import { create } from 'zustand'

// =================================================================================================
//                                       TYPES
// =================================================================================================

export type FileStore = {
    fileType: FILE_TYPE
    updateActiveFileType: (newType: FILE_TYPE) => void
}

// =================================================================================================
//                                       INITIAL STATE
// =================================================================================================

const initialState = {
    fileType: FILE_TYPE.RESCUE_MANUAL,
}

// =================================================================================================
//                                       STORE
// =================================================================================================

export const useFileStore = create<FileStore>(set => ({
    ...initialState,
    updateActiveFileType: (newType: FILE_TYPE) =>
        set(state => ({ ...state, fileType: newType })),
}))
