import { Input } from 'commons/'

const isNaN = window.isNaN

const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const alphabetRegex = new RegExp(alphabet, 'i')

const getValidatorTemplate = (param = 'type') => ({
  param,
})

class TextInput extends Input {
  constructor(data, eventHandlers) {
    super(data, eventHandlers)
    this.bindMask()
    this.bindValueUpdate()
  }

  bindMask() {
    /* # TODO: Solve issue and stop removing these keys from mask */
    if (!this.props.mask) {
      return false
    }

    this.props.mask = this.props.mask.replace(/\s/g, '')
    /* end-todo */

    const { mask } = this.props

    const chars = mask
      .split('')
      .map(char => {
        let type = typeof char

        if (!isNaN(parseInt(char))) {
          type = 'number'
        }

        switch (type) {
          case 'number':
            return {
              type,
              ...getValidatorTemplate(),
            }
          case 'string':

            if (alphabetRegex.test(char)) {
              return {
                type,
                ...getValidatorTemplate(),
              }
            }

            return {
              char,
              ...getValidatorTemplate('char'),
            }
          default:
            console.warn(`TextInput Mask: character ${char} of type ${type} is not supported.`)
            return char
        }
      })

    this.formatter = chars
    this.inputElement.addEventListener('keydown', event => {
      const { key, target } = event
      const { value } = target
      const formatter = this.formatter[value.length]

      if (!formatter) {
        return false
      }

      const { param } = formatter
      let isValid = false

      switch (param) {
        case 'type':
          const { type } = formatter

          if (type === typeof key) {
            isValid = true
          }

          if (!isValid) {
            /* To do: ? */
          }

          break
        case 'char':
          const { char } = formatter

          if (char === key) {
            isValid = true
          }

          if (!isValid && key.length === 1) {
            event.preventDefault()
            const valueAsChars = value.split('').slice(0, value.length)
            valueAsChars.push(char)
            valueAsChars.push(key)

            this.inputElement.value = valueAsChars.join('')
          }

          break
        default:
          console.warn(`TextInput Mask: validator param ${param} is not supported.`)
      }
    })
  }

  bindValueUpdate() {
    this.inputElement.addEventListener('keyup', event => {
      this.props.value = event.target.value
    })
  }
}

export default TextInput
