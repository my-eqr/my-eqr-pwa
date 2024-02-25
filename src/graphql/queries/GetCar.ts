import { graphql } from '../gql'

export default graphql(`
    query GetCar($carId: ID) {
        car(id: $carId) {
            data {
                id
                attributes {
                    name
                    rescueManual {
                        originalLink
                        rescueSheet {
                            data {
                                attributes {
                                    url
                                }
                            }
                        }
                    }
                    userManual {
                        userManual {
                            data {
                                attributes {
                                    url
                                }
                            }
                        }
                        originalLink
                    }
                }
            }
        }
    }
`)
