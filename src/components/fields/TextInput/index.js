import { Input } from 'commons/'

class TextInput extends Input {
  constructor(data, eventHandlers) {
    super(data, eventHandlers)
    this.bindValueUpdate()
  }

  bindValueUpdate() {
    this.element.addEventListener('keyup', event => {
      this.props.value = event.target.value
    })
  }
}

export default TextInput
