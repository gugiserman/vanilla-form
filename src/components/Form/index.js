import {
  validateFormData,
  getRandomId,
} from 'utils/'

import {
  Input,
  Button,
} from 'components/fields/'

class Form {
  constructor(data = {}, eventHandlers = {}) {
    validateFormData(data)

    this.id = data.id || getRandomId()
    this.fields = data.fields || []
    this.eventHandlers = eventHandlers
    this.element

    this.renderForm(data)
    this.renderFields()
    // this.bindFormEventListeners(eventHandlers)
  }

  renderForm({ id = this.id, name = this.id }) {
    const form = document.createElement('form')

    form.setAttribute('id', id)
    form.setAttribute('name', name)

    this.element = form
  }

  renderFields() {
    const {
      onInputChange,
      onButtonClick,
    } = this.eventHandlers

    const children = this.fields.map(field => {
      switch (field.component) {
        case 'input':
          return new Input(field, {
            keyPress: onInputChange,
          })
        case 'button':
          return new Button(field, {
            click: onButtonClick,
          })
        default:
          return null
      }
    }).filter(child => child && child.element)

    children.forEach(child =>
      this.element.appendChild(child.element)
    )
  }

  // bindFormEventListeners(eventHandlers) {
  // }
}

export default Form
