import { InMemoryCache, makeVar } from '@apollo/client'

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cartItems: {
          read() {
            return cartItemsVar()
          },
        },
        selectedCurrency: {
          read() {
            return selectedCurrencyVar()
          },
        },
      },
    },
  },
})

export const cartItemsVar = makeVar([])
export const selectedCurrencyVar = makeVar('NGN')
