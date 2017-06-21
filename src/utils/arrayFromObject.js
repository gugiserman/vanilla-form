const arrayFromObject = (object = {}, keyName = 'type', valueName = 'meta') => {
  const result = []
  const entries = Object.entries(object)

  for (const [key, value] of entries) {
    result.push({
      [keyName]: key,
      [valueName]: value,
    })
  }

  return result
}

export default arrayFromObject
