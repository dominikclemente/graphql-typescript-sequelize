import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLList } from 'graphql'

export const connectionPageParams = {
  page: {
    type: new GraphQLNonNull(GraphQLInt),
  },
  rowsPerPage: {
    type: new GraphQLNonNull(GraphQLInt),
  },
}

export type PagePagination = {
  page: number
  rowsPerPage: number
}

export const pageConnectionToSqlQuery = async (
  args: PagePagination,
  getDataCb: ({ limit, offset }: { limit: number; offset: number }) => Promise<any>,
) => {
  const { page, rowsPerPage } = args
  const limit = rowsPerPage
  const offset = page * rowsPerPage
  let sqlResult
  // fetch data from database
  if (limit <= 0 || limit > 50) {
    sqlResult = []
  } else {
    sqlResult = await getDataCb({ limit, offset })
  }

  return {
    count: sqlResult?.length,
    data: sqlResult,
  }
}

export const connectionType = (name: string, type: GraphQLObjectType) =>
  new GraphQLObjectType({
    name,
    fields: () => ({
      data: {
        type: new GraphQLList(type),
      },
      totalCount: {
        type: GraphQLInt,
      },
    }),
  })

export const wrapQueryDataToGql = ({
  count,
  data,
}: {
  count: number | string[]
  data: Record<string, unknown>
}) => {
  return {
    totalCount: Array.isArray(count) ? count.length : count,
    data,
  }
}
