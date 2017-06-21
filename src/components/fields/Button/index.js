import { Component } from 'commons/'

class Button extends Component {
  constructor(data, eventHandlers) {
    super(data, eventHandlers)

    this.label = data.label
    this.renderLabel()
  }

  renderLabel(label = this.label) {
    this.element.innerHTML = label
  }
}

export default Button
