import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import Header from '../Header'
import {
  PRODUCTS,
  CART_ITEMS,
  GET_SELECTED_CURRENCY,
} from '../../GraphQL/queries'
import client from '../../GraphQL/client'
import {
  ProductPageContainer,
  ProductPageTopContainer,
  ProductPageTopInner,
  ProductPageTitle,
  CategorySelect,
  ProductListContainer,
  ProductList,
  ProductItem,
  ProductPrice,
  ImageTitle,
  AddToCartButton,
} from './styles'

export const ProductPage = () => {
  const [isPaneOpen, setIsPaneOpen] = useState(false)

  const handlePaneClose = () => {
    setIsPaneOpen(false)
  }

  const handlePaneOpen = () => {
    setIsPaneOpen(true)
  }

  const { selectedCurrency } = client.readQuery({
    query: GET_SELECTED_CURRENCY,
  })

  const { data, loading, refetch } = useQuery(PRODUCTS, {
    variables: { currency: selectedCurrency },
    fetchPolicy: 'no-cache',
  })

  const refetchProducts = async (currency) => {
    await refetch({ currency })
    updateCartPrice(data)
  }

  const [productsData, setProductsData] = useState(data)

  useEffect(() => {
    if (!loading) {
      setProductsData(data)
    }
  }, [loading, data])

  const addToCart = (product) => {
    let isExists = false
    const { cartItems } = client.readQuery({
      query: CART_ITEMS,
    })

    const updatedCart = cartItems.map((item) => {
      if (item.product.id === product.id) {
        isExists = true
        const findItem = cartItems.find(
          (item) => item.product.id === product.id
        )
        const newQuantity = findItem.quantity + 1
        return {
          ...findItem,
          product: {
            ...findItem.product,
            price: newQuantity * findItem.unitPrice,
          },
          quantity: newQuantity,
        }
      }
      return item
    })

    client.writeQuery({
      query: CART_ITEMS,
      data: {
        cartItems: isExists
          ? updatedCart
          : [
              ...cartItems,
              {
                id: Date.now(),
                product,
                quantity: 1,
                unitPrice: product.price,
              },
            ],
      },
    })
    setIsPaneOpen(true)
  }

  const updateCartPrice = (data) => {
    const items = client.readQuery({
      query: CART_ITEMS,
    })

    if (!items) return

    const updatedCart = items.cartItems.map((item) => {
      const findProduct = data.products.find(
        (product) => product.id === item.product.id
      )
      return {
        product:
          item.quantity > 1
            ? { ...findProduct, price: item.quantity * findProduct.price }
            : findProduct,
        quantity: item.quantity,
        id: item.id,
        unitPrice: findProduct.price,
      }
    })

    client.writeQuery({
      query: CART_ITEMS,
      data: {
        cartItems: updatedCart,
      },
    })
  }

  useEffect(() => {
    if (data) {
      updateCartPrice(data)
    }
  }, [data])

  return (
    <>
      <Header
        refetch={refetchProducts}
        products={data}
        selectedCurrency={selectedCurrency}
        isPaneOpen={isPaneOpen}
        setIsPaneOpen={setIsPaneOpen}
        handlePaneClose={handlePaneClose}
        handlePaneOpen={handlePaneOpen}
      />
      <ProductPageContainer>
        <ProductPageTopContainer>
          <ProductPageTopInner>
            <ProductPageTitle>
              <h1>All Products</h1>
              <p>
                A 360<sup>o</sup> look at Lumin
              </p>
            </ProductPageTitle>
            <CategorySelect name="categories" id="categories">
              <option selected value disabled>
                Filter By
              </option>
              <option value="volvo">Featured</option>
              <option value="saab">New Products</option>
              <option value="opel">Other Stuff</option>
            </CategorySelect>
          </ProductPageTopInner>
        </ProductPageTopContainer>
        <ProductListContainer>
          <ProductList>
            {productsData ? (
              productsData.products.map((product) => {
                return (
                  <ProductItem key={product.id}>
                    <ImageTitle>
                      <img src={product.image_url} alt="" />
                      <h2>{product.title}</h2>
                    </ImageTitle>
                    <ProductPrice>
                      From:{' '}
                      <span>
                        {selectedCurrency} {product.price}
                      </span>
                    </ProductPrice>
                    <AddToCartButton onClick={() => addToCart(product)}>
                      Add To Cart
                    </AddToCartButton>
                  </ProductItem>
                )
              })
            ) : (
              <div>Loading...</div>
            )}
          </ProductList>
        </ProductListContainer>
      </ProductPageContainer>
    </>
  )
}

export default ProductPage
