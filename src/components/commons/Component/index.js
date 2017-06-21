import {
  getRandomId,
  arrayFromObject,
  sanitizeEventName,
} from 'utils/'

class Component {
  constructor(data = {}, eventHandlers = {}) {
    this.id = data.id || getRandomId()
    this.data = data
    this.metadata = arrayFromObject(data, 'attr', 'value')
    this.element

    this.render()
    this.bindEventListeners(eventHandlers)
  }

  render() {
    let tagName

    switch (this.component) {
      case 'image':
        tagName = 'img'
        break
      case 'input':
      case 'upload':
      case 'address':
      default:
        tagName = 'input'
    }

    const input = document.createElement(tagName)

    this.metadata.map(({ attr, value }) =>
      input.setAttribute(attr, value)
    )

    this.element = input
  }

  bindEventListeners(eventHandlers) {
    const entries = Object.entries(eventHandlers)

    for (const entry of entries) {
      const name = sanitizeEventName(entry[0])
      const [, handler] = entry

      this.element.addEventListener(name.toLowerCase(), event =>
        handler(event, this)
      )
    }
  }
}

export default Component
