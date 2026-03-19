const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '')

function toQueryString(query = {}) {
  const params = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return
    }

    params.append(key, value)
  })

  const queryString = params.toString()
  return queryString ? `?${queryString}` : ''
}

function extractMessage(payload) {
  if (!payload) return 'Request failed'

  if (typeof payload === 'string') return payload
  if (payload.msg) return payload.msg
  if (payload.message) return payload.message
  if (payload.sqlMessage) return payload.sqlMessage

  return 'Request failed'
}

export async function apiRequest(path, { method = 'GET', token, body, query } = {}) {
  const url = `${API_BASE}${path}${toQueryString(query)}`

  const headers = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const text = await response.text()
  const payload = text ? JSON.parse(text) : null

  if (!response.ok) {
    throw new Error(extractMessage(payload))
  }

  return payload
}
