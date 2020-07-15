import { GraphQLEnumType } from 'graphql'

type StringTuple = [string, string | number | boolean]
export default (typeName: string, possibleValues: string[] | StringTuple[]) =>
  new GraphQLEnumType({
    name: typeName,
    // @ts-ignore
    values: possibleValues.reduce((pre, enumConf: string | StringTuple) => {
      // console.log(enumConf)
      let name = null
      let value = null
      // name: First Char is uppercased (does not matter if rest is also)
      // value: if TS enum is Premium:premium it lowercase response from server to premium
      // value should be ideally lowercase at all, but for historical purposes, we have to do it just on new ones
      if (Array.isArray(enumConf)) {
        name = enumConf[0]
        value = enumConf[1]
      } else {
        name = enumConf
        value = enumConf
      }
      pre[name] = {
        value,
      }
      return pre
    }, {}),
  })
