import React from 'react'
import { useQuery } from '@apollo/client'
import Cart from '../Cart'
import { CURRENCIES, CART_ITEMS } from '../../GraphQL/queries'
import {
  HeaderContainer,
  HeaderInner,
  HeaderInnerRight,
  CartCurrency,
  CartContainer,
  CartIcon,
  CartItemCount,
} from './styles'

const Header = ({
  refetch,
  products,
  isPaneOpen,
  handlePaneClose,
  handlePaneOpen,
}) => {
  const { error } = useQuery(CURRENCIES)

  const { data } = useQuery(CART_ITEMS)

  const itemsCount = data ? data.cartItems.length : 0

  const isError = error

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
                <CartItemCount>{itemsCount}</CartItemCount>
              </CartContainer>
            </CartCurrency>
          </HeaderInnerRight>
        </HeaderInner>
      </HeaderContainer>
    </>
  )
}

export default Header
