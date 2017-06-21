import 'babel-polyfill'
import Form from 'components/Form'
import data from 'mock/mock.json'

const eventHandlers = {
  onInputChange(event, component) {
    console.log('input change', event, component)
  },

  onButtonClick(event, component) {
    event.preventDefault()
    console.log('button click', event, component)

    component.renderLabel('loading...')
    setTimeout(() => {
      component.renderLabel()
    }, 2000)
  },
}

const form = new Form(data, eventHandlers)
const formContainer = document.createElement('div')
const container = document.getElementById('app-container')

formContainer.setAttribute('id', 'form-container')
formContainer.appendChild(form.element)

container.appendChild(formContainer)
