import { Component } from 'commons/'

class Input extends Component {
  constructor(data, eventHandlers) {
    super(data, eventHandlers)
    this.inputElement = this.element
    this.renderLabel()
  }

  renderLabel() {
    const { id, placeholder } = this.props
    const className = this.props.class
    const container = document.createElement('div')
    const label = document.createElement('label')

    container.setAttribute('id', `${id}-container`)
    container.setAttribute('class', `${className}-container`)

    label.setAttribute('id', `${id}-label`)
    label.setAttribute('class', `${className}-label input-label`)
    label.setAttribute('for', id)
    label.innerHTML = placeholder

    container.appendChild(this.element)
    container.appendChild(label)

    this.element = container
  }
}

export default Input
