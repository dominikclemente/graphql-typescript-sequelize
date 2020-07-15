import { GraphQLScalarType } from 'graphql'
import { ApolloError } from 'apollo-server'
import { fromGlobalId } from '../utils'

export const getGlobalIdType = (typeName: string) => {
  const InvalidGlobalIdError = new ApolloError(`Invalid${typeName}GlobalIdError`)

  // https://github.com/graphql/graphql-js/issues/500#issuecomment-248992816
  // @ts-ignore
  const parseGlobalId = (val) => {
    const { type, id: textId } = fromGlobalId(val)
    const id = Number(textId)
    if (type !== typeName || !id || isNaN(id)) {
      throw InvalidGlobalIdError
    }
    return id
  }

  return new GraphQLScalarType({
    name: `${typeName}GlobalId`,
    description: `Global id of ${typeName}`,
    serialize: (val) => {
      // graphql relay js extend node with ID
      // i cant find how to extend ID to custom scalar type for working node interface
      // so i can't use this serialize to type of graphql id of current type
      // TODO: extend this scalar type with ID + uncomment serializing id
      // return toGlobalId(typeName, val.id)
      return val
    },
    parseValue: (val) => parseGlobalId(val),
    // https://github.com/graphql/graphql-js/issues/500#issuecomment-248992816
    // @ts-ignore
    parseLiteral: (ast) => parseGlobalId(ast.value),
  })
}
