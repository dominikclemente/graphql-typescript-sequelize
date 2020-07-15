import { TodoGlobalIdType } from './TodoType'
import { GraphQLNonNull } from 'graphql'
import models from '../../../database/core'
import TodoType from '../../models/Todos/todoType'

type InputArguments = {
  id: number
}

export default {
  todo: {
    type: TodoType,
    description: 'Todo',
    args: {
      id: {
        type: new GraphQLNonNull(TodoGlobalIdType),
      },
    },
    resolve: (_, { id }: InputArguments) => {
      const todo = models.Todo.findByPk(id)

      return todo
    },
  },
}
