import { HttpLink } from '@apollo/client'
import {
    NextSSRInMemoryCache,
    NextSSRApolloClient,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { onError } from '@apollo/client/link/error'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { setContext } from '@apollo/client/link/context'
import https from 'https'

export const { getClient } = registerApolloClient(() => {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) =>
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                )
            )
        if (networkError)
            console.error(
                `[Network error]: ${JSON.stringify(networkError, undefined, 4)} \n[stack]: ${networkError.stack}`
            )
    })

    const httpLink = new HttpLink({
        uri: process.env['NEXT_PUBLIC_STRAPI_GRAPHQL_URL'],
        fetchOptions: {
            cache: 'no-store',
            ...(process.env.NODE_ENV === 'development' && {
                agent: new https.Agent({ rejectUnauthorized: false }),
            }),
        },
    })
    const authLink = setContext((_, { headers }) => {
        const token = process.env['NEXT_PUBLIC_STRAPI_API']
        return {
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`,
            },
        }
    })

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link: authLink.concat(errorLink).concat(httpLink),
    })
})
