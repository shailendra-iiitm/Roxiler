import { useState } from 'react'

const SESSION_KEY = 'roxiler_session'

function loadSession() {
  const raw = localStorage.getItem(SESSION_KEY)
  if (!raw) return null

  try {
    const session = JSON.parse(raw)
    if (session?.token && session?.role) {
      return session
    }
  } catch {
    return null
  }

  return null
}

function saveSession(session) {
  if (!session) {
    localStorage.removeItem(SESSION_KEY)
    return
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function useSession() {
  const [session, setSession] = useState(loadSession())

  function login(nextSession) {
    saveSession(nextSession)
    setSession(nextSession)
  }

  function logout() {
    saveSession(null)
    setSession(null)
  }

  return { session, login, logout }
}
