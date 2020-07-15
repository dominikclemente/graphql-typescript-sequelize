import { Model, DataTypes, Optional, Sequelize } from 'sequelize'
import { TodoType } from '../../utils/constants'

type TodoAttributes = {
  id: number
  title: string
  content: string
  type: TodoType
  // auto types
  updated_at?: string
  created_at?: string
}

export type TodoCreationAttributes = Optional<TodoAttributes, 'id' | 'updated_at' | 'created_at'>
export interface TodoInstance
  extends Model<TodoAttributes, TodoCreationAttributes>,
    TodoAttributes {}

const TodoModel = (sequelize: Sequelize) =>
  sequelize.define<TodoInstance>('todos', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
    type: {
      // @ts-ignore Fix this error
      type: DataTypes.ENUM(Object.values(TodoType)),
      // if we have array of enums, declare it like
      // type: DataTypes.ARRAY(DataTypes.ENUM(Object.values(TodoType))),
    },
  })

export default TodoModel
