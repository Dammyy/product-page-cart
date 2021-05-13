import { InMemoryCache } from '@apollo/client'
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist'
import { CART_ITEMS, GET_SELECTED_CURRENCY } from './queries'
export const cache = new InMemoryCache()

cache.writeQuery({
  query: CART_ITEMS,
  data: {
    cartItems: [],
  },
})

cache.writeQuery({
  query: GET_SELECTED_CURRENCY,
  data: {
    selectedCurrency: 'NGN',
  },
})

async function persistStuff() {
  await persistCache({
    cache,
    trigger: 'write',
    storage: new LocalStorageWrapper(window.localStorage),
  })
}
persistStuff()
