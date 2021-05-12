import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import CloseIcon from './CloseIcon'
import {
  CURRENCIES,
  GET_CART_ITEMS,
  PRODUCTS,
  GET_SELECTED_CURRENCY,
} from '../../GraphQL/queries'
import client from '../../GraphQL/client'
import 'react-sliding-pane/dist/react-sliding-pane.css'
import {
  StyledSlidingPane,
  CurrencySelect,
  CartItemsContainer,
  CartItem,
  CartItemDetails,
  CartItemImage,
  CartItemTitle,
  CartItemDetailsBottom,
  CartItemCounterContainer,
  CartItemStep,
  CartItemCount,
  CartItemPrice,
} from './styles'

const Cart = (props) => {
  const { open, handleClose, refetchProducts } = props
  const { data } = useQuery(CURRENCIES)

  const { selectedCurrency } = client.readQuery({
    query: GET_SELECTED_CURRENCY,
  })

  // const [activeCurrency, setActiveCurrency] = useState(selectedCurrency)
  console.log('SELECTED CURRENCY MAIN CART', selectedCurrency)
  const { cartItems } = client.readQuery({
    query: GET_CART_ITEMS,
  })

  const onCurrencySelect = (event) => {
    const selected = event.target.value

    console.log('SELECTED CURRENCY cart', selected)
    client.writeQuery({
      query: GET_SELECTED_CURRENCY,
      data: {
        selectedCurrency: selected,
      },
    })

    refetchProducts({ currency: selected })
  }

  // console.log('ITEMS', cartItems)
  return (
    <StyledSlidingPane
      className="slide-pane-open"
      overlayClassName="some-custom-overlay-class"
      isOpen={open}
      closeIcon={<CloseIcon />}
      title="YOUR CART"
      onRequestClose={() => handleClose()}
    >
      <div>
        <CurrencySelect
          name="currency"
          id="currency"
          onChange={onCurrencySelect}
          value={selectedCurrency}
        >
          {data &&
            data.currency.map((curr) => <option value={curr}>{curr}</option>)}
        </CurrencySelect>
        <CartItemsContainer>
          {cartItems?.length === 0 ? (
            <p class="empty-message">There are no items in your cart.</p>
          ) : (
            cartItems.map((item) => (
              <CartItem>
                <CartItemDetails>
                  <CartItemTitle>
                    <h6>{item.product.title}</h6>
                  </CartItemTitle>
                  <CartItemDetailsBottom>
                    <CartItemCounterContainer>
                      <CartItemStep>-</CartItemStep>
                      <CartItemCount>1</CartItemCount>
                      <CartItemStep>+</CartItemStep>
                    </CartItemCounterContainer>
                    <CartItemPrice>{item.product.price}</CartItemPrice>
                  </CartItemDetailsBottom>
                </CartItemDetails>
                <CartItemImage>
                  <img src={item.product.image_url} alt=""></img>
                </CartItemImage>
              </CartItem>
            ))
          )}
        </CartItemsContainer>
      </div>
    </StyledSlidingPane>
  )
}

export default Cart

// onClick={() =>
//   isInCart(product.id)
//     ? removeFromCart(product.id)
//     : addToCart(product.id)
// }

// const removeFromCart = (event) => {
//   const id = event.target.value
//   cartItems.filter((itemId) => itemId !== id)
// }

// const isInCart = (id) => {
//   return cartItems.includes(id)
// }
