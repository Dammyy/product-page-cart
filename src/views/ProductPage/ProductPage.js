import React, { useState, useEffect } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import { selectedCurrencyVar } from '../../GraphQL/cache'
import { PRODUCTS } from '../../GraphQL/queries'
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
  const selectedCurrency = useReactiveVar(selectedCurrencyVar)
  const { loading, data } = useQuery(PRODUCTS, {
    variables: { currency: selectedCurrency },
  })

  const [productsData, setProductsData] = useState(data)

  useEffect(() => {
    if (!loading) {
      setProductsData(data)
    }
  }, [loading, data])

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
                  <AddToCartButton>Add To Cart</AddToCartButton>
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
