const debounce = (callback, delay, context = this) => {
  let timeout = null
  let callbackArgs = null

  const fn = () => callback.apply(context, callbackArgs)

  return function() {
    callbackArgs = arguments
    clearTimeout(timeout)
    timeout = setTimeout(fn, delay)
  }
}

export default debounce
