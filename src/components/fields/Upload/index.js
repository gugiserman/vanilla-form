import { Component } from 'commons/'

class Upload extends Component {
  constructor(data, eventHandlers) {
    super(data, eventHandlers)
    this.bindValueUpdate()
  }

  bindValueUpdate() {
    this.element.addEventListener('change', event => {
      this.props.value = event.target.files[0]
    })
  }
}

export default Upload
