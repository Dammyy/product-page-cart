import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import Header from '../Header'
import {
  PRODUCTS,
  GET_CART_ITEMS,
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
    const { cartItems } = client.readQuery({
      query: GET_CART_ITEMS,
    })

    client.writeQuery({
      query: GET_CART_ITEMS,
      data: {
        cartItems: [...cartItems, { product, quantity: 1 }],
      },
    })
  }

  const updateCartPrice = (data) => {
    const items = client.readQuery({
      query: GET_CART_ITEMS,
    })
    // console.log('CART ITEMS ', cartItems, data)

    if (!items) return

    const updatedCart = items.cartItems.map((item) => ({
      product: data.products.find((product) => product.id === item.product.id),
      quantity: item.quantity,
    }))

    client.writeQuery({
      query: GET_CART_ITEMS,
      data: {
        cartItems: updatedCart,
      },
    })

    console.log('UPDATED CART', updatedCart)
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
                  <ProductItem>
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
