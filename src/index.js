import 'babel-polyfill'
import Form from 'components/Form'
import data from 'mock/mock.json'

const form = new Form(data)
const formContainer = document.createElement('div')
const container = document.getElementById('app-container')

formContainer.setAttribute('id', 'form-container')
formContainer.appendChild(form.element)

container.appendChild(formContainer)
