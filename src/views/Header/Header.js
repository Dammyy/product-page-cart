import React, { useState } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import Cart from '../Cart'
import { PRODUCTS, CURRENCIES } from '../../GraphQL/queries'
import { selectedCurrencyVar } from '../../GraphQL/cache'
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
  const selectedCurrency = useReactiveVar(selectedCurrencyVar)
  const { error } = useQuery(CURRENCIES)
  const { error1, refetch } = useQuery(PRODUCTS, {
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

  if (isError) return <p>Error :(</p>

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
