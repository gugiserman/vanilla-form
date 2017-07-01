import {
  validateFormData,
  arrayFromObject,
  getRandomId,
} from 'utils/'

import {
  TextInput,
  AddressInput,
  Upload,
  Button,
} from 'components/fields/'

class Form {
  constructor(data = {}, eventHandlers = {}) {
    validateFormData(data)

    const { props } = data

    this.id = props.id || getRandomId()
    this.props = props
    this.metadata = arrayFromObject(props)
    this.fields = data.fields || []
    this.eventHandlers = eventHandlers
    this.element

    this.renderForm()
    this.renderFields()
  }

  getFormData() {
    const values = {}

    this.fields.forEach(field => {
      const { props } = field
      const { id, name, value } = props
      const key = name || id

      values[key] = value
    })

    return {
      values: values,
      fields: [].concat(this.fields),
    }
  }

  handleFormSubmit = (event) => {
    const { onSubmit } = this.eventHandlers

    if (!onSubmit || typeof onSubmit !== 'function') {
      throw new Error('Form onSubmit eventHandler function is invalid!')
    }

    return onSubmit(event, this.getFormData(), this)
  }

  renderForm() {
    const form = document.createElement('form')

    this.metadata.map(({ attr, value }) =>
      form.setAttribute(attr, value)
    )

    form.addEventListener('submit', this.handleFormSubmit)

    this.element = form
  }

  renderFields() {
    const {
      onInputChange,
      onFileSelect,
      onAddressSelect,
      onButtonClick,
    } = this.eventHandlers

    const children = this.fields.map(field => {
      switch (field.component) {
        case 'address':
          return new AddressInput(field, {
            change: onAddressSelect,
          })
        case 'input':
          return new TextInput(field, {
            keyUp: onInputChange,
          })
        case 'upload':
          return new Upload(field, {
            change: onFileSelect,
          })
        case 'button':
          if (field.props.type === 'submit') {
            return new Button(field)
          }

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
}

export default Form
