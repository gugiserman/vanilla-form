import { transformFields } from 'utils/'

class Input {
  constructor(data = {}) {
    this.id = data.id
    this.name = data.name
    this.class = data.class
    this.type = data.type
    this.value = data.value
    this.metadata = transformFields(data, 'attr', 'value')
    this.element = this.render()

    this.render()
  }

  render() {
    const input = document.createElement('input')

    this.metadata.map(({ attr, value }) =>
      input.setAttribute(attr, value)
    )

    return input
  }
}

export default Input
