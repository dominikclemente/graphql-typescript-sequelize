import {
  connectionPageParams,
  PagePagination,
  wrapQueryDataToGql,
  connectionType,
  pageConnectionToSqlQuery,
} from '../../gqlUtils/pagination'
import models from '../../../database/core'
import GraphQLTodoType from '../../types/GraphQLTodoType'
import { GraphQLNonNull } from 'graphql'
import { TodoType as TodoTsType } from '../../../utils/constants'
import TodoType from '../../models/Todos/todoType'

type InputArguments = { type: TodoTsType } & PagePagination

export default {
  todos: {
    type: connectionType('todos', TodoType),
    description: 'todos',
    args: {
      ...connectionPageParams,
      type: {
        type: new GraphQLNonNull(GraphQLTodoType),
      },
    },
    resolve: async (_, args: InputArguments) => {
      const todos = await pageConnectionToSqlQuery(
        args,
        ({ offset, limit }: { offset: number; limit: number }) =>
          models.Todo.findAll({
            where: {
              type: args.type,
            },
            offset,
            limit,
          }),
      )

      return wrapQueryDataToGql(todos)
    },
  },
}
