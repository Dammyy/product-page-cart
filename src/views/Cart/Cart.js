import React, { useState } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import { selectedCurrencyVar } from '../../GraphQL/cache'
import CloseIcon from './CloseIcon'
import { CURRENCIES } from '../../GraphQL/queries'
import 'react-sliding-pane/dist/react-sliding-pane.css'
import { StyledSlidingPane, CurrencySelect } from './styles'

const Cart = (props) => {
  const { open, handleClose, refetchProducts } = props
  const selectedCurrency = useReactiveVar(selectedCurrencyVar)
  const [activeCurrency, setActiveCurrency] = useState(selectedCurrency)

  const { data } = useQuery(CURRENCIES)

  const onCurrencySelect = (event) => {
    const selected = event.target.value
    console.log('dfgg', selected)
    selectedCurrencyVar(selected)
    setActiveCurrency(selected)
    refetchProducts()
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
        {' '}
        <CurrencySelect
          name="currency"
          id="currency"
          onChange={onCurrencySelect}
          value={activeCurrency}
        >
          {data &&
            data.currency.map((curr) => <option value={curr}>{curr}</option>)}
        </CurrencySelect>
      </div>
    </StyledSlidingPane>
  )
}

export default Cart
