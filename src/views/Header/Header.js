import React from 'react'
import {
  HeaderContainer,
  HeaderInner,
  HeaderInnerRight,
  CurrencySelect,
  CartCurrency,
  CartContainer,
  CartIcon,
  CartItemCount,
} from './styles'

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderInner>
        <div></div>
        <HeaderInnerRight>
          <CartCurrency>
            <CartContainer>
              <CartIcon />
              <CartItemCount>0</CartItemCount>
            </CartContainer>
            <CurrencySelect name="currency" id="currency">
              <option value="volvo">EN</option>
              <option value="saab">AR</option>
              <option value="opel">FR</option>
            </CurrencySelect>
          </CartCurrency>
        </HeaderInnerRight>
      </HeaderInner>
    </HeaderContainer>
  )
}

export default Header
