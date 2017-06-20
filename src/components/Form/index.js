import {
  validateFormData,
  transformFields,
  getRandomId,
} from 'utils/'

class Form {
  constructor(data = {}) {
    validateFormData(data)

    this.id = data.id || getRandomId()
    this.fields = transformFields(data.fields)
    this.element = this.createForm(data)
  }

  createForm({ id = this.id, name = this.id }) {
    const form = document.createElement('form')

    form.setAttribute('id', id)
    form.setAttribute('name', name)

    return form
  }
}

export default Form
