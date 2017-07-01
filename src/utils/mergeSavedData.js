const mergeSavedData = (data) => {
  let currentData = localStorage.getItem('vanilla_form_data')

  try {
    currentData = JSON.parse(currentData)
  } catch (e) {
    console.warn(e)
  }

  if (!currentData) {
    currentData = {}
  }

  if (currentData.fields && currentData.fields.length) {
    data.fields = data.fields.map(field => {
      const savedField = currentData.fields.find(someField =>
        someField.component === field.component && someField.props.id === field.props.id
      )

      return {
        ...field,
        ...savedField,
      }
    })
  }

  return data
}

export default mergeSavedData
