import { GetCarQuery, GetCarsQuery } from './graphql/gql/graphql'
import { GetBrandsQuery } from './graphql/types'
import { SimpleResponse } from './lib/utils'

export interface Payload<Data> {
    data?: Data
    success: boolean
    message: string
    status: number
}

export type CarFilters = {
    _q: string
    brand: string[]
    bodyType: string[]
    vehicleType: string[]
    favouriteEnabled: boolean
}

export type Brands = SimpleResponse<GetBrandsQuery>
export type Cars = SimpleResponse<GetCarsQuery>
export type Car = SimpleResponse<GetCarQuery>
