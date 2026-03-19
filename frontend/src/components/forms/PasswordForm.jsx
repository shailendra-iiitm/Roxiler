import { useState } from 'react'
import { apiRequest } from '../../api'
import { validatePassword } from '../../validation'

export default function PasswordForm({ token }) {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setError('')

    const passwordError = validatePassword(newPassword)
    if (passwordError) {
      setError(passwordError)
      return
    }

    setLoading(true)

    try {
      const data = await apiRequest('/auth/update-password', {
        method: 'PUT',
        token,
        body: { oldPassword, newPassword },
      })

      setMessage(data.message || 'Password updated successfully.')
      setOldPassword('')
      setNewPassword('')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="card">
      <h2>Update Password</h2>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Old Password
          <input
            type="password"
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
            required
          />
        </label>

        <label>
          New Password
          <input
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Password'}
        </button>
      </form>

      {message ? <p className="ok-text">{message}</p> : null}
      {error ? <p className="error-text">{error}</p> : null}
    </section>
  )
}
