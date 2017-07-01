import { Input } from 'commons/'
import { debounce } from 'utils/'
const { PlacesService } = window.google.maps.places

class AddressInput extends Input {
  constructor(data, eventHandlers) {
    super(data, eventHandlers)

    this._isLoading = false
    this._isInteractingWithin = false
    this.placesService = new PlacesService(this.inputElement)

    this.bindPlaceSearch()
  }

  renderLoadingFeedback() {
    const loader = document.createElement('span')

    loader.setAttribute('class', 'input-loading-feedback')
    loader.innerHTML = 'loading...'

    this.loadingElement = loader
    this.element.appendChild(this.loadingElement)
  }

  removeLoadingFeedback() {
    if (this.loadingElement) {
      this.loadingElement.outerHTML = ''
      this.loadingElement = undefined
    }
  }

  get isLoading() {
    return this._isLoading
  }

  set isLoading(value = false) {
    if (value === this._isLoading) {
      return false
    }

    if (value) {
      this.renderLoadingFeedback()
    } else {
      this.removeLoadingFeedback()
    }

    this._isLoading = value
  }

  closeResults() {
    if (this.resultsElement) {
      this.resultsElement.outerHTML = ''
      this.resultsElement = undefined
    }
  }

  handleChildrenMousedown = () => {
    this._isInteractingWithin = true
  }

  handleInputBlur = () => {
    if (this._isInteractingWithin) {
      return false
    }

    this._isInteractingWithin = false
    this.closeResults()
  }

  handlePlaceClick(event, address) {
    this.inputElement.value = address
    this.props.value = address
    this.closeResults()
  }

  renderPlace(place = {}, index, listElement) {
    const container = document.createElement('li')
    const item = document.createElement('a')
    const formattedAddress = place.formatted_address

    container.setAttribute('class', 'address-results-item')
    item.setAttribute('href', 'javascript:void(0)')
    item.dataset.formattedAddress = formattedAddress
    item.innerHTML = formattedAddress

    container.addEventListener('click', (event) =>
      this.handlePlaceClick(event, formattedAddress)
    )

    container.appendChild(item)
    listElement.appendChild(container)
  }

  renderPlaces(places = []) {
    this.closeResults()

    const container = document.createElement('div')
    const list = document.createElement('ul')

    container.addEventListener('mousedown', this.handleChildrenMousedown)
    container.setAttribute('id', `${this.id}-results-container`)
    container.setAttribute('class', 'address-results-container')
    list.setAttribute('id', `${this.id}-results`)
    list.setAttribute('class', 'address-results')

    places.slice(0, 5).map((place, index) =>
      this.renderPlace(place, index, list)
    )

    container.appendChild(list)

    this.resultsElement = container
    this.element.appendChild(this.resultsElement)
  }

  handleInputChange = (event) => {
    const { value } = event.target

    if (!value || !value.length) {
      this.isLoading = false
      this.props.value = ''
      this.closeResults()
      return false
    }

    this.isLoading = true
    this.props.value = value

    this.placesService.textSearch({ query: value }, results => {
      this.isLoading = false
      this.renderPlaces(results)
    })
  }

  bindPlaceSearch() {
    this.inputElement.className += ' address-input'
    this.inputElement.addEventListener('blur', this.handleInputBlur)
    this.inputElement.addEventListener('keyup', debounce(this.handleInputChange, 200))
  }
}

export default AddressInput
