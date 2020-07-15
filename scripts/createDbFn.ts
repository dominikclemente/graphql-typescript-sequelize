/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
import { Client } from 'pg'
import { NodeEnv } from '../src/utils/constants'

const createDb = async () => {
  if (process.env.NODE_ENV !== NodeEnv.Test) {
    console.info(`process.env.NODE_ENV: ${process.env.NODE_ENV}`)
  }
  if (
    process.env.NODE_ENV !== NodeEnv.Development &&
    process.env.NODE_ENV !== NodeEnv.Stage &&
    process.env.NODE_ENV !== NodeEnv.Test
  ) {
    throw new Error('cant change demo & prod database')
  }
  try {
    // create the connection to database
    console.time('create/renew-database')

    const databaseName =
      process.env.NODE_ENV === NodeEnv.Test
        ? process.env.TEST_DB_DATABASE_NAME
        : process.env.DB_DATABASE_NAME

    const clientToPostgresDb = new Client({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'postgres',
    })
    clientToPostgresDb.connect()
    try {
      await clientToPostgresDb.query(`DROP DATABASE IF EXISTS ${databaseName};`)
      await clientToPostgresDb.query(`CREATE DATABASE ${databaseName};`)
    } catch (e) {
      console.info('CREATE DB err -> this is probably not error... just db is already created')
    }

    const clientToDb = new Client({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: databaseName,
    })

    clientToDb.connect()
    await clientToDb.query(`CREATE EXTENSION IF NOT EXISTS unaccent;`)
    await clientToDb.query(`CREATE EXTENSION IF NOT EXISTS cube;`)
    await clientToDb.query(`CREATE EXTENSION IF NOT EXISTS earthdistance;`)

    console.timeEnd('create/renew-database')
  } catch (e) {
    console.error(e)
  }
}

export default createDb
