import { TodoCreationAttributes } from '../src/database/models/TodoModel'
import { TodoType } from '../src/utils/constants'

const todosMockData: TodoCreationAttributes[] = [
  {
    id: 1,
    title: 'Title 1',
    content: 'Content 1',
    type: TodoType.New
  },
  {
    id: 2,
    title: 'Title 2',
    content: 'Content 2',
    type: TodoType.New
  },
  {
    id: 3,
    title: 'Title 3',
    content: 'Content 3',
    type: TodoType.Old
  },
  {
    id: 4,
    title: 'Title 4',
    content: 'Content 4',
    type: TodoType.Old
  },
]

export default todosMockData