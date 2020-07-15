import models from '../src/database/core'
import { NodeEnv } from '../src/utils/constants'
import fixtures from '../fixtures'

/**
 * load pure data to tables
 */
export const loadDataToDb = async () => {
  if (process.env.NODE_ENV !== NodeEnv.Test) {
    console.info(`process.env.NODE_ENV: ${process.env.NODE_ENV}`)
  }
  if (
    // if we specify f.e.: NODE_ENV to 'proddd' (nonsense) it will not pass
    process.env.NODE_ENV !== NodeEnv.Development &&
    process.env.NODE_ENV !== NodeEnv.Stage &&
    process.env.NODE_ENV !== NodeEnv.Test
  ) {
    throw new Error(`Can't change demo & prod database`)
  }
  // synchronous loading rows to db
  // => it have to be sync coz of auto_increment ids ORDER
  // @ts-ignore
  // await models.ReportPassword.bulkCreate(fixtures.reportPasswordMockData)
  await models.Todo.bulkCreate(fixtures.todos)
}

const loadData = async () => {
  // console.time('loadData to db')
  if (!Boolean(process.env.NODE_ENV)) {
    throw new Error('You have to set NODE_ENV for db update')
  }
  if (process.env.NODE_ENV === NodeEnv.Production) {
    throw new Error('cant change prod database')
  }
  try {
    // NOT FOR PRODUCTION NOT FOR PRODUCTION NOT FOR PRODUCTION
    // NOT FOR PRODUCTION NOT FOR PRODUCTION NOT FOR PRODUCTION
    // force: true truncate all tables -> only for dev!!!
    await models.sequelize.sync({ force: true })
    await loadDataToDb()
  } catch (e) {
    console.error(`Can't load data & reset database`)
    console.error(e)
  }
  // console.timeEnd('loadData to db')
}

export default loadData
