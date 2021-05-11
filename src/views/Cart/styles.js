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
  height: 32px;
  width: 84px;
  margin-left: 24px;
  padding-left: 8px;
  padding-right: 32px;
`
