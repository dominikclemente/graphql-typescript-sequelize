import { Sequelize } from 'sequelize'
import TodoModel from './models/TodoModel'
import { NodeEnv } from '../utils/constants'

export const sequelize = new Sequelize(
  process.env.NODE_ENV === NodeEnv.Test
    ? process.env.TEST_DB_DATABASE_NAME
    : process.env.DB_DATABASE_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: parseInt(process.env.DB_PORT, 10),
    logging: false, // console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      underscored: true,
    },
  },
)

sequelize
  .authenticate()
  .then(async () => {
    console.info('Database Connection has been established successfully.')
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })

TodoModel(sequelize)
const { models: sequelizeModels } = sequelize

const models = {
  Todo: sequelizeModels.todos,
  sequelize,
}

/* 
models.Todo.hasMany(models.XYZ, {
  foreignKey: 'x_id',
  sourceKey: 'y_id',
  constraints: false,
  // as: 'overview',
})*/

export default models
