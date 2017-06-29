import TextInput from './'
import mock from 'mock/'

test('TextInput', () => {
  const data = mock.fields.find(field => field.component === 'input')
  const textInput = new TextInput(data)

  const {
    element,
    inputElement,
  } = textInput

  expect(TextInput).toBeDefined()
  expect(textInput).toBeDefined()
  expect(element).toBeDefined()
  expect(inputElement).toBeDefined()
})
