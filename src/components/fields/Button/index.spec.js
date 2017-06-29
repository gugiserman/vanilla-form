import Button from './'
import mock from 'mock/'

test('Button', () => {
  const data = mock.fields.find(field => field.component === 'button')
  const button = new Button(data)

  expect(Button).toBeDefined()
  expect(button).toBeDefined()
  expect(button.element).toBeDefined()
  expect(button.element.innerHTML).toMatch(new RegExp(data.label, 'i'))
})
