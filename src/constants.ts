import { ErrorPolicy } from '@apollo/client'

export const TOP_HEIGHT = 4
export const BOTTOM_HEIGHT = 4
export const BODY_OFFSET = TOP_HEIGHT + BOTTOM_HEIGHT
export const HOME_ROW = 4
export const SUB_HEADER_HEIGHT = 55

export enum MODES {
    RESCUE = 'Rescue',
    REPAIR = 'Repair',
    TRAINING = 'Training',
}

export enum LOCAL_STORAGE {
    FAVOURITED_CARS = 'favouritedCars',
}

export enum SESSION_STORAGE {
    ACTIVE_MODE = 'activeMode',
}

export enum ORIENTATION {
    PORTRAIT = 'portrait-primary',
    LANDSCAPE = 'landscape-primary',
}

export const STANDARD_GRAPHQL_CONFIG: {
    errorPolicy: ErrorPolicy
} = {
    errorPolicy: 'all',
}

export enum GENERIC_MESSAGE {
    SUCCESS = 'Success',
    ERROR = 'Error',
    WARNING = 'Warning',
    INFO = 'Info',
}

export enum FILE_TYPE {
    RESCUE_MANUAL = 'Rescue Manual',
    USER_MANUAL = 'User Manual',
}

export const STRAPI_GRAPHQL_API = process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL
export const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL
