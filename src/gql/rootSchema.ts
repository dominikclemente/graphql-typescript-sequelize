import todoQuery from './models/Todos/todoQuery'
import todosQuery from './models/Todos/todosQuery'
import { GraphQLSchema, GraphQLObjectType } from 'graphql'

const rootSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      ...todoQuery,
      ...todosQuery,
    }),
  }),
  /* mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      ...
  }) */
})

export default rootSchema
