import { Component } from 'commons/'

class Button extends Component {
  constructor(data, eventHandlers) {
    super(data, eventHandlers)

    this.label = data.label
    this.renderLabel()
    this.setStyle()
  }

  renderLabel(label = this.label) {
    this.element.innerHTML = label
  }

  setStyle() {
    const { type } = this.props

    if (type === 'submit') {
      this.element.className += ' active'
    }
  }
}

export default Button
