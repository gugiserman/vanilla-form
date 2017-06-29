import AddressInput from './'
import mock from 'mock/'

test('AddressInput', () => {
  const data = mock.fields.find(field => field.component === 'address')
  const addressInput = new AddressInput(data)

  expect(AddressInput).toBeDefined()
  expect(addressInput).toBeDefined()
})
