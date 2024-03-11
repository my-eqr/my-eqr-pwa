import { graphql } from '../gql'

export default graphql(`
    query GetCar($carId: ID) {
        car(id: $carId) {
            data {
                id
                attributes {
                    userManual {
                        originalLink
                        userManual {
                            data {
                                attributes {
                                    url
                                }
                            }
                        }
                    }
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
                    name
                    image {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    brand {
                        data {
                            attributes {
                                name
                                logo {
                                    data {
                                        attributes {
                                            url
                                        }
                                    }
                                }
                            }
                        }
                    }
                    metadata {
                        bodyType
                        modelYear {
                            start
                            end
                        }
                        vehicleType
                    }
                }
            }
        }
    }
`)
