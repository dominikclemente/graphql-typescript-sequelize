// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
import loadData from './loadDataFn'

const main = async () => {
  await loadData()
  process.exit()
}

main()
