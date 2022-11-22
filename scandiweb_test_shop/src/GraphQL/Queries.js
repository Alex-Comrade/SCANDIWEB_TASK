import { gql } from "@apollo/client";

export const LOAD_CATEGORIES = gql`
    query {
        categories {
            name
        }
    }
`;

export const GET_CATEGORY_PRODUCTS = gql`
    query ($CategoryInput: CategoryInput) {
        category(input: $CategoryInput) {
            name
            products {
                id
                name
                inStock
                gallery
                prices {
                    currency {
                        label
                        symbol
                    }
                    amount
                }
            }
        }
    }
`;

export const LOAD_CURRENCIES = gql`
    query {
        currencies {
            label
            symbol
        }
    }
`;

export const LOAD_CATEGORY_INFO = gql`
    query {
        category {
            products {
                id
                name
                inStock
                gallery
                prices {
                    currency {
                        label
                        symbol
                    }
                    amount
                }
            }
        }
    }
`;

export const LOAD_PRODUCTS = gql`
    query getProductByID($id: String!) {
        product(id: $id) {
            name
            inStock
            gallery
            description
            category
            attributes {
                name
                type
                items {
                    displayValue
                    value
                }
            }
            prices {
                currency {
                    label
                    symbol
                }
                amount
            }
            brand
        }
    }
`;
