import { gql } from '@apollo/client'

export const CURRENCIES = gql`
  query GetCurrencies {
    currency
  }
`

export const PRODUCTS = gql`
  query($currency: Currency!) {
    products {
      id
      title
      image_url
      price(currency: $currency)
  }
}
`

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

export const GET_CURRENCIES = gql`
  query GetCurrencies {
    currency @client
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts {
    products @client
  }
`;