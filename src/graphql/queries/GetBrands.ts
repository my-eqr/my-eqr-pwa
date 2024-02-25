import { graphql } from '../gql'

export default graphql(`
    query GetBrands {
        brands {
            data {
                attributes {
                    logo {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    name
                }
            }
        }
    }
`)
