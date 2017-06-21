const arrayFromObject = (object = {}, keyName = 'attr', valueName = 'value') => {
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
