import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { ApolloProvider } from '@apollo/client/react'
import client from './GraphQL/client'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
