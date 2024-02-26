import { CarFilters } from '@/types'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function wait(milliseconds: number) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds)
    })
}

// export function removeFilter<Key extends keyof CarFilters>(
//     filters: CarFilters,
//     filterKey: Key,
//     filterValueToExclude: string
// ): CarFilters {
//     const currentArray = filters[filterKey]
//     if (Array.isArray(currentArray)) {
//         filters[filterKey] = currentArray.filter(
//             element => element !== filterValueToExclude
//         ) as CarFilters[Key] & any[]
//     } else if (filterKey === '_q') {
//         filters[filterKey] = '' as CarFilters[Key]
//     }
//     return filters
// }

/**
 * Removes the specified filter value from the provided filters object.
 *
 * @param {CarFilters} filters - The object containing the filters.
 * @param {Key} filterKey - The key of the filter to be modified.
 * @param {string} filterValueToExclude - The value to be removed from the filter array.
 * @return {CarFilters} The modified filters object after removing the specified value.
 */
export function removeFilter<Key extends keyof CarFilters>(
    filters: CarFilters,
    filterKey: Key,
    filterValueToExclude: string
): CarFilters {
    const currentArray = filters[filterKey]
    if (Array.isArray(currentArray)) {
        return {
            ...filters,
            [filterKey]: currentArray.filter(
                element => element !== filterValueToExclude
            ),
        }
    } else if (filterKey === '_q') {
        return {
            ...filters,
            [filterKey]: '',
        }
    } else if (filterKey === 'favouriteEnabled') {
        return {
            ...filters,
            [filterKey]: false,
        }
    }
    // If filterKey is neither an array nor '_q', return unmodified filters
    return filters
}

/**
 * Generates a query string based on the provided filters.
 *
 * @param {CarFilters} filters - object containing filter parameters
 * @return {string} the generated query string
 */
export function generateQueryString<Key extends keyof CarFilters>(
    filters: CarFilters
): string {
    return [
        (filters._q && `_q=${filters._q}`) || '',
        (filters.brand.length > 0 && `brand=${filters.brand}`) || '',
        (filters.bodyType.length > 0 && `bodyType=${filters.bodyType}`) || '',
        (filters.vehicleType.length > 0 &&
            `vehicleType=${filters.vehicleType}`) ||
            '',
        (filters.favouriteEnabled && 'favourite=true') || '',
    ]
        .filter(filter => filter !== '')
        .join('&')
}

// =================================================================================================
//     Strapi response simplification
// =================================================================================================

function simplifyResponse<T extends ObjectType>(
    response: T
): SimpleResponse<T> {
    const entries = Object.entries(response).filter(([k]) => k !== '__typename')
    if (entries.length >= 2)
        throw new Error(
            'Cannot simplify a Strapi response that contains an object with more than one key'
        )
    return simplify(entries[0][1] as any)
}

function simplify<T extends ValidType>(value: T): SimpleType<T>
function simplify<T>(value: T) {
    if (Array.isArray(value)) return value.map(simplify)

    if (isPlainObject(value)) {
        // General handling for 'id'
        const id = value['id']

        if ('data' in value) return simplify(value.data)
        if ('attributes' in value) {
            const simplifiedAttributes = simplify(value.attributes)
            return id ? { id, ...simplifiedAttributes } : simplifiedAttributes
        }
        // For other objects, carry 'id' if exists.
        const simplifiedObject = objectMap(value, simplify)
        return id ? { id, ...simplifiedObject } : simplifiedObject
    }

    return value

    // if (isPlainObject(value)) {
    //     if ('data' in value) return simplify(value.data)
    //     if ('attributes' in value) return simplify(value.attributes)
    //     return objectMap(value, simplify)
    // }

    // return value
}

function isPlainObject<
    O extends R | any,
    R extends Record<string | number | symbol, any>,
>(obj: O): obj is R {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        obj.constructor === Object &&
        Object.getPrototypeOf(obj) === Object.prototype
    )
}

interface Dictionary<T> {
    [key: string]: T
}

function objectMap<TValue, TResult>(
    obj: Dictionary<TValue>,
    valSelector: (val: TValue, obj: Dictionary<TValue>) => TResult,
    keySelector?: (key: string, obj: Dictionary<TValue>) => string,
    ctx?: Dictionary<TValue>
) {
    const ret = {} as Dictionary<TResult>
    for (const key of Object.keys(obj)) {
        if (key === '__typename') continue
        const retKey = keySelector
            ? keySelector.call(ctx || null, key, obj)
            : key
        const retVal = valSelector.call(ctx || null, obj[key], obj)
        ret[retKey] = retVal
    }
    return ret
}

type ValidType = UntouchedType | ObjectType | ArrayType

type UntouchedType =
    | boolean
    | number
    | string
    | symbol
    | null
    | undefined
    | bigint
    | Date
type ObjectType = { [key in string]?: ValidType }
type ArrayType = ValidType[]

type IsAny<T> = unknown extends T & string ? true : false
type WithId<T> = T & { id?: string }

type SimpleType<T extends ValidType> =
    IsAny<T> extends true
        ? any
        : T extends UntouchedType
          ? T
          : T extends [...infer Ar extends ValidType[]]
            ? { [Index in keyof Ar]: SimpleType<Ar[Index]> }
            : T extends { [K in 'data']?: infer Ob extends ValidType }
              ? SimpleType<Ob>
              : T extends { [K in 'attributes']?: infer Ob extends ValidType }
                ? WithId<SimpleType<Ob>>
                : T extends Omit<ObjectType, 'data' | 'attributes'>
                  ? WithId<{
                        [key in Exclude<keyof T, '__typename'>]: SimpleType<
                            T[key]
                        >
                    }>
                  : T
// type SimpleType<T extends ValidType> =
//     IsAny<T> extends true
//         ? any
//         : T extends UntouchedType
//           ? T
//           : T extends [...infer Ar extends ValidType[]]
//             ? { [Index in keyof Ar]: SimpleType<Ar[Index]> }
//             : T extends { [K in 'data']?: infer Ob extends ValidType }
//               ? SimpleType<Ob>
//               : T extends { [K in 'attributes']?: infer Ob extends ValidType }
//                 ? SimpleType<Ob>
//                 : T extends Omit<ObjectType, 'data' | 'attributes'>
//                   ? {
//                         [key in Exclude<keyof T, '__typename'>]: SimpleType<
//                             T[key]
//                         >
//                     }
//                   : T

type IsUnion<T, U extends T = T> = (
    T extends any ? (U extends T ? false : true) : never
) extends false
    ? false
    : true
type GetOnlyKeyOrNever<
    T extends ObjectType,
    Keys = Exclude<keyof T, '__typename'>,
> = IsUnion<Keys> extends true ? never : Keys

type SimpleResponse<T extends ObjectType> = SimpleType<T[GetOnlyKeyOrNever<T>]>
type NonNullableItem<T extends any[] | null | undefined> = NonNullable<
    NonNullable<T>[number]
>

export {
    simplifyResponse,
    simplify,
    type SimpleType,
    type SimpleResponse,
    type NonNullableItem,
}
