import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import { getGlobalIdType } from '../../gqlUtils/getGlobalIdType'
import { toGlobalId } from '../../utils'
import GraphQLTodoType from '../../types/GraphQLTodoType'

export const typeName = 'Todo'
export const TodoGlobalIdType = getGlobalIdType(typeName)
const TodoType = new GraphQLObjectType({
  name: typeName,
  // interfaces: [nodeInterface, UserInterface, PublicUserInterface],
  // isTypeOf: obj => obj.__typeOfGqlNode ? obj.__typeOfGqlNode === typeName : obj instanceof (models.Todo as any),
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: `The ${typeName}'s global graphQl ID`,
      resolve: (_) => toGlobalId(typeName, _.id),
    },
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    type: {
      type: GraphQLTodoType,
      resolve: (todo) => todo.type,
    },
    /* attachments: {
      type: new GraphQLList(AttachmentType),
    }, */
  }),
})

export default TodoType
