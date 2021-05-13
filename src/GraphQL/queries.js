import { gql } from '@apollo/client'

export const CURRENCIES = gql`
  query GetCurrencies {
    currency
  }
`

export const PRODUCTS = gql`
  query ($currency: Currency!) {
    products {
      id
      title
      image_url
      price(currency: $currency)
      product_options {
        title
        prefix
        suffix
      }
    }
  }
`

export const CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client {
      id
      product
      quantity
      unitPrice
    }
  }
`

export const GET_SELECTED_CURRENCY = gql`
  query GetSelectedCurrency {
    selectedCurrency @client
  }
`
