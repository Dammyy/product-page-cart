import styled from 'styled-components'
import CartImg from '../../images/cart.png'

export const HeaderContainer = styled.div`
  top: 0;
  position: -webkit-sticky;
  position: sticky;
  width: 100%;
  background-color: #f5f5f4;
  box-shadow: 0 2px 3px -3px grey;
  z-index: 1;
`

export const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 9px 40px 0px;
  height: 64px;
  color: #000;
`

export const CartCurrency = styled.div`
  display: flex;
  justify-content: space-between;
`

export const HeaderInnerRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const CurrencySelect = styled.select`
  height: 32px;
  width: 84px;
  margin-left: 24px;
  padding-left: 8px;
  padding-right: 32px;
`

export const CartContainer = styled.div`
  display: flex;
  width: 35px;
  height: 31px;
`

export const CartIcon = styled.div`
  width: 25px;
  height: 21px;
  background-image: url(${CartImg});
  background-size: contain;
  margin-top: 5px;
`

export const CartItemCount = styled.div`
  width: 9px;
  height: 19px;
  font-weight: 400;
  font-size: 13px;
`
