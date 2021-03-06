import styled from 'styled-components'

export const ProductPageContainer = styled.div`
  height: 100%;
`

export const ProductPageTopContainer = styled.div`
  padding-top: 64px;
  max-width: 1300px;
  padding: 0 40px 40px;
  background-color: #f5f5f4;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
`

export const ProductPageTopInner = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 80px 0px 64px;
  height: 96px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    height: auto;
    flex-direction: column;
    padding: 40px 0px 32px;
  }
`

export const ProductPageTitle = styled.div`
  width 273px;

  h1 {
    font-size: 48px;
    font-weight: normal;
    height: 60px;
    margin: 0;
  }

  p {
    margin-top: 12px;
    font-size: 16px;
    line-height: 24px;
    height: 24px;
  }
`

export const CategorySelect = styled.select`
  height: 57px;
  width: 400px;
  margin-top: 24px;
  padding-left: 20px;
  padding-right: 32px;
  font-size: 16px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

export const ProductListContainer = styled.div`
  background: #e2e6e3;
`

export const ProductList = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
  min-height: 500px;

  @media (max-width: 768px) {
    grid-template-columns: auto auto;
  }
`

export const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 48px 32px;
  text-align: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 24px 16px;
  }

  @media (max-width: 480px) {
    padding: 16px 4px;
  }
`

export const ImageTitle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  img {
    max-width: 100%;
    max-height: 170px;
    object-fit: contain;
  }

  h2 {
    font-size: 16px;
    line-height: 24px;
    margin: 8px 0;
    font-weight: 400;
  }

  @media (max-width: 480px) {
    img {
      width: 150px;
      align-self: center;
    }
  }
`

export const ProductPrice = styled.div`
  margin-top: 8px;
  font-weight: 400;
  font-size: 16px;

  span {
    margin-left: 4px;
  }
  @media (max-width: 480px) {
    font-size: 14px;
    text-align: center;
  }
`

export const AddToCartButton = styled.button`
  margin-top: 8px;
  width: 100%;
  max-width: 100%;
  font-weight: 600;
  outline: none;
  border: 0px;
  line-height: 1.2;
  padding: 2px 16px 0;
  min-height: 52px;
  background: rgb(75, 85, 72);
  color: rgb(252, 252, 249);

  @media (max-width: 480px) {
    padding: 16px 4px;
  }
`
