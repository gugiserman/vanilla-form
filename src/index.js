import 'babel-polyfill'

import Form from 'components/Form'
import data from 'mock/mock.json'

import 'style/index.less'

const eventHandlers = {
  onInputChange(event, component) {
    console.log('input change', event.target.value, component)
  },

  onAddressSelect(event, component) {
    console.log('address input change', event.target.value, component)
  },

  onFileSelect(event, component) {
    console.log('file select', event.target.value, component.element.files[0])
  },

  onButtonClick(event, component) {
    event.preventDefault()
    console.log('button click', event, component)

    component.renderLabel('loading...')
    setTimeout(() => {
      component.renderLabel()
    }, 2000)
  },

  onSubmit(event, formData, form) {
    event.preventDefault()
    console.log('form submit', event, formData, form)
  },
}

const form = new Form(data, eventHandlers)
const formContainer = document.createElement('div')
const container = document.getElementById('app-container')

formContainer.setAttribute('id', 'form-container')
formContainer.appendChild(form.element)

container.appendChild(formContainer)
