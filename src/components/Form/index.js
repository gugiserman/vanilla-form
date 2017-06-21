import {
  validateFormData,
  arrayFromObject,
  getRandomId,
} from 'utils/'

import {
  Input,
  Upload,
  Button,
} from 'components/fields/'

class Form {
  constructor(data = {}, eventHandlers = {}) {
    validateFormData(data)

    const { props } = data

    this.id = props.id || getRandomId()
    this.metadata = arrayFromObject(props)
    this.fields = data.fields || []
    this.eventHandlers = eventHandlers
    this.element

    this.renderForm()
    this.renderFields()
    // this.bindFormEventListeners(eventHandlers)
  }

  renderForm() {
    const form = document.createElement('form')

    this.metadata.map(({ attr, value }) =>
      form.setAttribute(attr, value)
    )

    this.element = form
  }

  renderFields() {
    const {
      onInputChange,
      onFileSelect,
      onButtonClick,
    } = this.eventHandlers

    const children = this.fields.map(field => {
      switch (field.component) {
        case 'input':
          return new Input(field, {
            keyPress: onInputChange,
          })
        case 'upload':
          return new Upload(field, {
            change: onFileSelect,
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
