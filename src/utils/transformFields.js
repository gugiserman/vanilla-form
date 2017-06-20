const transformFields = (object = {}) => {
  const result = []
  const entries = Object.entries(object)

  for (const [key, value] of entries) {
    result.push({
      type: key,
      meta: value,
    })
  }

  return result
}

export default transformFields
