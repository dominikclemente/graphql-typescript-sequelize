import { ApolloServer } from 'apollo-server'
import rootSchema from './gql/rootSchema'
import { NodeEnv } from './utils/constants'
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

if (
  process.env.NODE_ENV !== NodeEnv.Production &&
  process.env.NODE_ENV !== NodeEnv.Development &&
  process.env.NODE_ENV !== NodeEnv.Demo &&
  process.env.NODE_ENV !== NodeEnv.Stage &&
  process.env.NODE_ENV !== NodeEnv.Test
) {
  throw new Error(`NODE_ENV in file '.env' must be of values development|stage|test|production`)
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ schema: rootSchema })

// The `listen` method launches a web server.
server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`)
})
