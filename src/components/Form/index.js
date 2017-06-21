import {
  validateFormData,
  getRandomId,
} from 'utils/'

import {
  Input,
} from 'components/fields/'

class Form {
  constructor(data = {}, eventHandlers = {}) {
    validateFormData(data)

    this.id = data.id || getRandomId()
    this.fields = data.fields || []
    this.element

    this.renderForm(data)
    this.renderFields(eventHandlers)
    // this.bindFormEventListeners(eventHandlers)
  }

  renderForm({ id = this.id, name = this.id }) {
    const form = document.createElement('form')

    form.setAttribute('id', id)
    form.setAttribute('name', name)

    this.element = form
  }

  renderFields(eventHandlers) {
    const children = this.fields.map(({ component, meta }) => {
      switch (component) {
        case 'input':
          return new Input(meta, {
            keyPress: eventHandlers.onInputChange,
          })
        default:
          return null
      }
    }).filter(field => field !== null)

    children.forEach(child =>
      this.element.appendChild(child.element)
    )
  }

  // bindFormEventListeners(eventHandlers) {
  // }
}

export default Form
