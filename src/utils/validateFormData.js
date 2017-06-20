const validateFormContainer = (data = {}) => {
  if (typeof data === 'object' &&
      typeof data.fields === 'object' &&
      Object.keys(data.fields).length > 0) {
    return true
  }

  throw new Error('Form: Invalid data object.')
}

export default validateFormContainer
