import Upload from './'
import mock from 'mock/'

test('Upload', () => {
  const data = mock.fields.find(field => field.component === 'upload')
  const upload = new Upload(data)

  expect(Upload).toBeDefined()
  expect(upload).toBeDefined()
})
