const generatedIds = []

const getRandomId = (length = 5) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let id = ''

  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  if (generatedIds.includes(id)) {
    return getRandomId()
  }

  generatedIds.push(id)

  return id
}

export default getRandomId
