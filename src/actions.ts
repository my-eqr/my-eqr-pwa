'use server'
import { cookies } from 'next/headers'
import { Brands, Car, Cars, Payload } from '@/types'
import { getClient } from './lib/apolloClient'
import { GetBrands, GetCar, GetCars } from './graphql/queries'
import { GENERIC_MESSAGE, STANDARD_GRAPHQL_CONFIG } from './constants'
import { simplify, simplifyResponse } from './lib/utils'
import {
    CarFiltersInput,
    GetBrandsQuery,
    GetCarQueryVariables,
    InputMaybe,
    Scalars,
} from './graphql/gql/graphql'

// =================================================================================================
//                                          QUERIES
// =================================================================================================

export async function getBrands(): Promise<Payload<Brands>> {
    const { data, errors } = await getClient().query({
        query: GetBrands,
        ...STANDARD_GRAPHQL_CONFIG,
    })

    if (errors) {
        return { success: false, message: errors[0].message, status: 400 }
    }

    return {
        success: true,
        data: simplify(data!).brands,
        status: 200,
        message: GENERIC_MESSAGE.SUCCESS,
    }
}

export async function getCars(
    filters: InputMaybe<CarFiltersInput>
): Promise<Payload<Cars>> {
    const { data, errors } = await getClient().query({
        query: GetCars,
        variables: { filters },
        ...STANDARD_GRAPHQL_CONFIG,
    })

    if (errors) {
        return { success: false, message: errors[0].message, status: 400 }
    }

    return {
        success: true,
        data: simplify(data!).cars,
        status: 200,
        message: GENERIC_MESSAGE.SUCCESS,
    }
}

export async function getCar(carId: string): Promise<Payload<Car>> {
    const { data, errors } = await getClient().query({
        query: GetCar,
        variables: { carId },
        ...STANDARD_GRAPHQL_CONFIG,
    })

    if (errors) {
        return { success: false, message: errors[0].message, status: 400 }
    }

    return {
        success: true,
        data: simplify(data!).car,
        status: 200,
        message: GENERIC_MESSAGE.SUCCESS,
    }
}
