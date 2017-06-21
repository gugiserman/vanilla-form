const validateFormData = (data = {}) => {
  if (typeof data === 'object' && Array.isArray(data.fields)) {
    return true
  }

  throw new Error('Form: Invalid data object.')
}

export default validateFormData
