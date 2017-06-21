import {
  getRandomId,
  arrayFromObject,
  sanitizeEventName,
} from 'utils/'

class Component {
  constructor({ component, props }, eventHandlers = {}) {
    this.id = props.id || getRandomId()
    this.props = props
    this.component = component
    this.metadata = arrayFromObject(props)
    this.eventHandlers = eventHandlers
    this.element

    this.render()
    this.bindEventListeners()
  }

  render() {
    let tagName

    switch (this.component) {
      case 'button':
        tagName = 'button'
        break
      case 'image':
        tagName = 'img'
        break
      case 'input':
      case 'upload':
      case 'address':
        tagName = 'input'
        break
      default:
        return null
    }

    const input = document.createElement(tagName)

    this.metadata.map(({ attr, value }) =>
      input.setAttribute(attr, value)
    )

    this.element = input
  }

  bindEventListeners() {
    if (!this.element) {
      return false
    }

    const entries = Object.entries(this.eventHandlers)

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
