import styled from 'styled-components'
import SlidingPane from 'react-sliding-pane'

export const StyledSlidingPane = styled(SlidingPane)`
  width: 550px !important;
  top: 0;
  background-color: #f2f2ef;

  .slide-pane__header {
    background-color: transparent;
    border-bottom: none;
  }
  .slide-pane__title {
    text-align: center;
    color: #696969;
    font-weight: 400;
    font-size: 10px;
  }
  .slide-pane__close {
    margin-left: 0;
  }
  .slide-pane__content {
    position: relative;
    overflow-y: auto;
    padding: 0 16px;
    flex: 1 1 auto;
    margin-bottom: 55px;
  }

  @media (max-width: 480px) {
    width: 90% !important;
  }
`

export const CloseIconCircle = styled.div`
  border-radius: 50%;
  border: 1px solid rgb(198, 204, 199);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const CurrencySelect = styled.select`
  height: 28px;
  width: 84px;
  padding-left: 10px;
  padding-right: 13px;
  border: none;
  outline: none;
`

export const CartItemsContainer = styled.div`
  margin-top: 10px;
`

export const CartItem = styled.div`
  width: 510px;
  height: 135px;
  margin-bottom: 20px;
  background: #fff;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  position: relative;

  @media (max-width: 480px) {
    width: 100%;
  }
`

export const CartItemDetails = styled.div`
  width: 65%;
  font-size: 10px;
  margin-top: 5px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const CartItemImage = styled.div`
  display: flex;
  justify-content: center;
  width: 33%;
  font-size: 10px;
  margin-top: 5px;
  min-height: 100px;
  padding-right: 15px;
  align-items: center;

  img {
    height: 80px;
    max-width: 100%;
  }
`

export const CartItemTitle = styled.div`
  h6 {
    color: #1e2d2b;
    margin-bottom: 0;
    font-size: 13px;
  }
`

export const CartItemDetailsBottom = styled.div`
  display: flex;
  justify-content: space-between;
`

export const CartItemCounterContainer = styled.div`
  border: 0.5px solid #bcbcbc;
  padding: 7px;
  box-sizing: border-box;
  width: 76px;
  height: 34px;
  display: flex;
  justify-content: space-between;
`

export const CartItemStep = styled.div`
  height: 18px;
  line-height: 18px;
  font-weight: bold;
  cursor: pointer;
`

export const CartItemCount = styled.div`
  height: 18px;
  font-size: 13px;
  padding: 0 10px;
`

export const CartItemPrice = styled.div`
  height: 18px;
  font-size: 13px;
  padding: 0 10px;
`

export const RemoveFromCart = styled.div`
  position: absolute;
  right: 0;
  margin-right: 12px;
  margin-top: -10px;
  cursor: pointer;
`

export const SubTotalContainer = styled.div`
  height: 55px;
  background-color: #f2f2ef;
  z-index: 1;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid #d0d0d0;
  box-shadow: 0 -4px 12px rgb(0 0 0 / 15%);
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  box-sizing: border-box;
`

export const StyledSubTotal = styled.div`
  font-size: 13px;
`

export const SumTotal = styled.div`
  font-size: 16px;
  font-weight: bold;
`
