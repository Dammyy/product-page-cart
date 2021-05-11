import { ApolloClient, gql } from '@apollo/client'
import { cache } from './cache'

export const typeDefs = gql`
  extend type Query {
    cartItems: [ID!]!
    products: [Product!]!
    currencies: [Currency!]!
    selectedCurrency: [String!]!
  }
`

const uri = process.env.REACT_APP_API_URL

const client = new ApolloClient({
  uri,
  cache,
  typeDefs,
  resolvers: {}
})

export default client
