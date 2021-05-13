import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import CloseIcon from './CloseIcon'
import {
  CURRENCIES,
  CART_ITEMS,
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
  RemoveFromCart,
  SubTotalContainer,
  StyledSubTotal,
  SumTotal,
} from './styles'

const Cart = ({ open, handleClose, refetchProducts }) => {
  const { data } = useQuery(CURRENCIES)
  const { selectedCurrency } = client.readQuery({
    query: GET_SELECTED_CURRENCY,
  })

  const items = client.readQuery({
    query: CART_ITEMS,
  })

  const [cartItems, setCartItems] = useState(items ? items.cartItems : [])

  useEffect(() => {
    setCartItems(items ? items.cartItems : [])
  }, [items])

  const sunCartItems = () => {
    let totalPrice = 0
    cartItems.map((item) => {
      return (totalPrice += item.product.price)
    })
    return totalPrice
  }
  const onCurrencySelect = async (event) => {
    const selected = event.target.value

    client.writeQuery({
      query: GET_SELECTED_CURRENCY,
      data: {
        selectedCurrency: selected,
      },
    })

    await refetchProducts(selected)
  }

  const updateQuantity = (quantity, id) => {
    const items = client.readQuery({
      query: CART_ITEMS,
    })
    if (!items) return

    if (quantity > 0) {
      const updatedCart = items.cartItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            product: { ...item.product, price: quantity * item.unitPrice },
            quantity,
          }
        }

        return item
      })

      client.writeQuery({
        query: CART_ITEMS,
        data: {
          cartItems: updatedCart,
        },
      })

      setCartItems(updatedCart)
    }
  }

  const removeFromCart = (id) => {
    const items = client.readQuery({
      query: CART_ITEMS,
    })
    if (!items) return

    const updatedCart = items.cartItems.filter((item) => item.id !== id)
    client.writeQuery({
      query: CART_ITEMS,
      data: {
        cartItems: updatedCart,
      },
    })

    setCartItems(updatedCart)
  }

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
            data.currency.map((curr) => <option key={curr} value={curr}>{curr}</option>)}
        </CurrencySelect>
        <CartItemsContainer>
          {cartItems?.length === 0 ? (
            <p className="empty-message">There are no items in your cart.</p>
          ) : (
            cartItems.map((item) => (
              <CartItem key={item.id}>
                <CartItemDetails>
                  <CartItemTitle>
                    <h6>{item.product.title}</h6>
                  </CartItemTitle>
                  <CartItemDetailsBottom>
                    <CartItemCounterContainer>
                      <CartItemStep
                        onClick={() =>
                          item.quantity === 1
                            ? removeFromCart(item.id)
                            : updateQuantity(item.quantity - 1, item.id)
                        }
                      >
                        -
                      </CartItemStep>
                      <CartItemCount>{item.quantity}</CartItemCount>
                      <CartItemStep
                        onClick={() =>
                          updateQuantity(item.quantity + 1, item.id)
                        }
                      >
                        +
                      </CartItemStep>
                    </CartItemCounterContainer>
                    <CartItemPrice>
                      {selectedCurrency} {item.product.price}
                    </CartItemPrice>
                  </CartItemDetailsBottom>
                </CartItemDetails>
                <CartItemImage>
                  <img src={item.product.image_url} alt=""></img>
                </CartItemImage>
                <RemoveFromCart onClick={() => removeFromCart(item.id)}>
                  X
                </RemoveFromCart>
              </CartItem>
            ))
          )}
        </CartItemsContainer>
      </div>
      <SubTotalContainer>
        <StyledSubTotal>Subtotal</StyledSubTotal>
        <SumTotal>
          {selectedCurrency} {sunCartItems()}
        </SumTotal>
      </SubTotalContainer>
    </StyledSlidingPane>
  )
}

export default Cart
