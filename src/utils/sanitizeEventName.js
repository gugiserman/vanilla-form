const sanitizeEventName = (name) => {
  if ((/on/i).test(name.slice(0, 2))) {
    name = name.slice(2)
  }

  return name
}

export default sanitizeEventName
