import {
  validateFormData,
  getRandomId,
} from 'utils/'

import {
  Input,
} from 'components/fields/'

class Form {
  constructor(data = {}) {
    validateFormData(data)

    this.id = data.id || getRandomId()
    this.fields = data.fields || []

    this.element = this.renderForm(data)
    this.renderFields()
  }

  renderForm({ id = this.id, name = this.id }) {
    const form = document.createElement('form')

    form.setAttribute('id', id)
    form.setAttribute('name', name)

    return form
  }

  renderFields() {
    const children = this.fields.map(({ component, meta }) => {
      switch (component) {
        case 'input':
          return new Input(meta)
        default:
          return null
      }
    }).filter(field => field !== null)

    children.forEach(child =>
      this.element.appendChild(child.element)
    )
  }
}

export default Form
