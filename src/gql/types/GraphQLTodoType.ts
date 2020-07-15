import getEnumType from '../gqlUtils/getEnumType'
import { TodoType } from '../../utils/constants'

export default getEnumType('TodoType', Object.keys(TodoType))
