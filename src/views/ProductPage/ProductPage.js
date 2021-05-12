import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { PRODUCTS, GET_CART_ITEMS, GET_SELECTED_CURRENCY, GET_PRODUCTS } from '../../GraphQL/queries'
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

  const { loading, data } = useQuery(PRODUCTS, {
    variables: { currency: selectedCurrency },
  })
  // const { products } = client.readQuery({
  //   query: GET_PRODUCTS,
  // })

  // console.log('Here, Product page', products, data)

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

    // console.log('cart items', items)

    client.writeQuery({
      query: GET_CART_ITEMS,
      data: {
        cartItems: [...cartItems, { product }],
      },
    })
  }

  return (
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
  )
}

export default ProductPage
