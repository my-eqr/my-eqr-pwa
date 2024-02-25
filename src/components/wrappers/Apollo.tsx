'use client'

import { PropsWithChildren } from 'react'
import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    NextSSRApolloClient,
    SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { ApolloLink, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

const makeClient = () => {
    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) =>
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                )
            )
        if (networkError) console.error(`[Network error]: ${networkError}`)
    })

    const httpLink = new HttpLink({
        uri: process.env['NEXT_PUBLIC_STRAPI_GRAPHQL_URL'],
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
        link:
            typeof window === 'undefined'
                ? ApolloLink.from([
                      new SSRMultipartLink({
                          stripDefer: true,
                      }),
                      authLink,
                      errorLink,
                      httpLink,
                  ])
                : httpLink,
    })
}

const Apollo = ({ children }: PropsWithChildren) => {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    )
}

export { Apollo }
