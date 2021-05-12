import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import Cart from '../Cart'
import { PRODUCTS, CURRENCIES, GET_CART_ITEMS, GET_SELECTED_CURRENCY } from '../../GraphQL/queries'
import client from '../../GraphQL/client'
import {
  HeaderContainer,
  HeaderInner,
  HeaderInnerRight,
  CartCurrency,
  CartContainer,
  CartIcon,
  CartItemCount,
} from './styles'

const Header = () => {
  const { error } = useQuery(CURRENCIES)
  const { selectedCurrency } = client.readQuery({
    query: GET_SELECTED_CURRENCY,
  })
  console.log('SELECTED CURRENCY HEADER', selectedCurrency)
  const { data, loading, error1, refetch } = useQuery(PRODUCTS, {
    variables: { currency: selectedCurrency },
    fetchPolicy: 'no-cache',
  })

  const isError = error || error1

  const [isPaneOpen, setIsPaneOpen] = useState(false)

  const handlePaneClose = () => {
    setIsPaneOpen(false)
  }
  const handlePaneOpen = () => {
    setIsPaneOpen(true)
  }

  const { cartItems } = client.readQuery({
    query: GET_CART_ITEMS,
  })

  const updateCartPrice = (products) => {
    const updatedCart = cartItems.map((item) =>
      products.find((product) => product.id === item.product.id)
    )
    // console.log('UPDATED CART', updatedCart)
  }

  useEffect(() => {
    if (!loading && data) {
      // console.log('NEW PRODUCTS', data.products, cartItems)
      updateCartPrice(data.products)
    }
  }, [loading, data])

  if (isError) return <p>Error :(</p>

  // const { data1 } = useQuery(PRODUCTS, {
  //   variables: { currency: selectedCurrency },
  // })

  return (
    <>
      <Cart
        open={isPaneOpen}
        handleClose={handlePaneClose}
        refetchProducts={refetch}
      />
      <HeaderContainer isPaneOpen={isPaneOpen}>
        <HeaderInner>
          <div></div>
          <HeaderInnerRight>
            <CartCurrency>
              <CartContainer>
                <CartIcon onClick={handlePaneOpen} />
                <CartItemCount>0</CartItemCount>
              </CartContainer>
            </CartCurrency>
          </HeaderInnerRight>
        </HeaderInner>
      </HeaderContainer>
    </>
  )
}

export default Header
