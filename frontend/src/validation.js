const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/

export function validateEmail(email) {
  if (!EMAIL_REGEX.test(email || '')) {
    return 'Enter a valid email address.'
  }

  return ''
}

export function validatePassword(password) {
  if (!PASSWORD_REGEX.test(password || '')) {
    return 'Password must be 8-16 characters with one uppercase and one special character.'
  }

  return ''
}

export function validateUserName(name) {
  const length = (name || '').trim().length

  if (length < 10 || length > 60) {
    return 'Name must be between 10 and 60 characters.'
  }

  return ''
}

export function validateStoreName(name) {
  const length = (name || '').trim().length

  if (length < 3 || length > 60) {
    return 'Store name must be between 3 and 60 characters.'
  }

  return ''
}

export function validateAddress(address) {
  if ((address || '').trim().length > 400) {
    return 'Address can be at most 400 characters.'
  }

  return ''
}

export function validateRole(role) {
  if (!['ADMIN', 'USER', 'OWNER'].includes(role)) {
    return 'Role must be ADMIN, USER, or OWNER.'
  }

  return ''
}
