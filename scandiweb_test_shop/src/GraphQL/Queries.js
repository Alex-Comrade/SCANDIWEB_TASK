import { gql } from "@apollo/client";

export const LOAD_CATEGORIES = gql`
    query {
        categories {
            name
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
