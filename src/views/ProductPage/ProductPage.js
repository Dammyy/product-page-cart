import React from 'react'
import Header from '../Header'
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
  return (
    <ProductPageContainer>
      <Header />
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
          <ProductItem>
            <ImageTitle>
              <img
                src="https://cdn.shopify.com/s/files/1/2960/5204/products/age-management_1024x1024_ad6e7a36-7242-469c-9fb5-242f5ee9c83f_1024x1024.png?v=1602809968"
                alt=""
              />
              <h2>Age Mangement Set</h2>
            </ImageTitle>
            <ProductPrice>
              From: <span>NGN 20,0000</span>
            </ProductPrice>
            <AddToCartButton>Add To Cart</AddToCartButton>
          </ProductItem>
          <ProductItem>
            <ImageTitle>
              <img
                src="https://cdn.shopify.com/s/files/1/2960/5204/products/age-management_1024x1024_ad6e7a36-7242-469c-9fb5-242f5ee9c83f_1024x1024.png?v=1602809968"
                alt=""
              />
              <h2>Age Mangement Set</h2>
            </ImageTitle>
            <ProductPrice>
              From: <span>NGN 20,0000</span>
            </ProductPrice>
            <AddToCartButton>Add To Cart</AddToCartButton>
          </ProductItem>
          <ProductItem>
            <ImageTitle>
              <img
                src="https://cdn.shopify.com/s/files/1/2960/5204/products/age-management_1024x1024_ad6e7a36-7242-469c-9fb5-242f5ee9c83f_1024x1024.png?v=1602809968"
                alt=""
              />
              <h2>Age Mangement Set</h2>
            </ImageTitle>
            <ProductPrice>
              From: <span>NGN 20,0000</span>
            </ProductPrice>
            <AddToCartButton>Add To Cart</AddToCartButton>
          </ProductItem>
          <ProductItem>
            <ImageTitle>
              <img
                src="https://cdn.shopify.com/s/files/1/2960/5204/products/age-management_1024x1024_ad6e7a36-7242-469c-9fb5-242f5ee9c83f_1024x1024.png?v=1602809968"
                alt=""
              />
              <h2>Age Mangement Set</h2>
            </ImageTitle>
            <ProductPrice>
              From: <span>NGN 20,0000</span>
            </ProductPrice>
            <AddToCartButton>Add To Cart</AddToCartButton>
          </ProductItem>
        </ProductList>
      </ProductListContainer>
    </ProductPageContainer>
  )
}

export default ProductPage
