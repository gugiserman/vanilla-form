import Component from './'
import mock from 'mock/'

test('Component', () => {
  mock.fields.forEach(data => {
    const component = new Component(data)

    const {
      element,
      metadata,
    } = component

    expect(Component).toBeDefined()
    expect(component).toBeDefined()
    expect(metadata).toBeDefined()
    expect(metadata.length).toBe(Object.keys(data.props).length)
    expect(element).toBeDefined()

    metadata.forEach(({ attr, value }) => {
      expect(element.hasAttribute(attr)).toBeTruthy()
      expect(element.getAttribute(attr)).toBe(value.toString())
    })
  })
})
