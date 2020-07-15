export const toGlobalId = (type: string, id: number) => {
  const buff = Buffer.from(type + ':' + id)
  return buff.toString('base64')
}

export const fromGlobalId = (globalId: string) => {
  const buff = Buffer.from(globalId, 'base64')
  const [type, id] = buff.toString('ascii').split(':')
  return { type, id: Number(id) }
}
