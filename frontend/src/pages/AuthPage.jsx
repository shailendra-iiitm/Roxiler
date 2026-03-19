import { useState } from 'react'
import { apiRequest } from '../api'
import { validateAddress, validateEmail, validatePassword, validateUserName } from '../validation'

const DEFAULT_REGISTER = {
  name: '',
  email: '',
  address: '',
  password: '',
}

export default function AuthPage({ onLogin }) {
  const [mode, setMode] = useState('login')
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState(DEFAULT_REGISTER)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  function switchMode(nextMode) {
    setMode(nextMode)
    setError('')
    setMessage('')
  }

  async function handleLogin(event) {
    event.preventDefault()
    setError('')
    setMessage('')

    const emailError = validateEmail(loginForm.email)
    if (emailError) {
      setError(emailError)
      return
    }

    setLoading(true)

    try {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: {
          email: loginForm.email.trim().toLowerCase(),
          password: loginForm.password,
        },
      })

      onLogin({ token: data.token, role: data.role })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleRegister(event) {
    event.preventDefault()
    setError('')
    setMessage('')

    const firstError =
      validateUserName(registerForm.name) ||
      validateEmail(registerForm.email) ||
      validateAddress(registerForm.address) ||
      validatePassword(registerForm.password)

    if (firstError) {
      setError(firstError)
      return
    }

    setLoading(true)

    try {
      const data = await apiRequest('/auth/register', {
        method: 'POST',
        body: {
          name: registerForm.name.trim(),
          email: registerForm.email.trim().toLowerCase(),
          address: registerForm.address.trim(),
          password: registerForm.password,
        },
      })

      setMessage(data.message || 'Registration successful. You can login now.')
      setRegisterForm(DEFAULT_REGISTER)
      setMode('login')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-shell">
      <section className="auth-card">
        <h1>Store Rating Portal</h1>
        <p>Simple login for admin, users, and store owners.</p>

        <div className="auth-tabs">
          <button
            type="button"
            className={mode === 'login' ? 'tab-btn active' : 'tab-btn'}
            onClick={() => switchMode('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === 'register' ? 'tab-btn active' : 'tab-btn'}
            onClick={() => switchMode('register')}
          >
            Register
          </button>
        </div>

        {mode === 'login' ? (
          <form className="form-grid" onSubmit={handleLogin}>
            <label>
              Email
              <input
                value={loginForm.email}
                onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={loginForm.password}
                onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })}
                required
              />
            </label>
            <button type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>
        ) : (
          <form className="form-grid" onSubmit={handleRegister}>
            <label>
              Name
              <input
                value={registerForm.name}
                onChange={(event) => setRegisterForm({ ...registerForm, name: event.target.value })}
                required
              />
            </label>
            <label>
              Email
              <input
                value={registerForm.email}
                onChange={(event) => setRegisterForm({ ...registerForm, email: event.target.value })}
                required
              />
            </label>
            <label>
              Address
              <textarea
                value={registerForm.address}
                onChange={(event) => setRegisterForm({ ...registerForm, address: event.target.value })}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={registerForm.password}
                onChange={(event) => setRegisterForm({ ...registerForm, password: event.target.value })}
                required
              />
            </label>
            <button type="submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>
        )}

        {message ? <p className="ok-text">{message}</p> : null}
        {error ? <p className="error-text">{error}</p> : null}
      </section>
    </div>
  )
}
