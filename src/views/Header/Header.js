import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import Cart from '../Cart'
import { CURRENCIES } from '../../GraphQL/queries'
import {
  HeaderContainer,
  HeaderInner,
  HeaderInnerRight,
  CartCurrency,
  CartContainer,
  CartIcon,
  CartItemCount,
} from './styles'

const Header = (props) => {
  const { refetch, products } = props
  const { error } = useQuery(CURRENCIES)

  const isError = error

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
        products={products}
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
