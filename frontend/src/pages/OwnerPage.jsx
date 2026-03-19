import { useCallback, useEffect, useState } from 'react'
import { apiRequest } from '../api'
import EmptyState from '../components/common/EmptyState'

export default function OwnerPage({ token }) {
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadDashboard = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const data = await apiRequest('/stores/owner-dashboard', { token })
      setDashboard(data)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    loadDashboard()
  }, [loadDashboard])

  return (
    <section className="card">
      <div className="card-head">
        <h2>Owner Dashboard</h2>
        <button type="button" onClick={loadDashboard} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <article className="stat-card">
        <h3>{Number(dashboard?.average_rating || 0).toFixed(2)}</h3>
        <p>Average Store Rating</p>
      </article>

      {!dashboard?.users?.length ? (
        <EmptyState title="No ratings yet" message="User ratings for your stores will appear here." />
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Store</th>
                <th>User</th>
                <th>Email</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.users.map((row, index) => (
                <tr key={`${row.store_id}-${row.email}-${index}`}>
                  <td>{row.store_name}</td>
                  <td>{row.user_name}</td>
                  <td>{row.email}</td>
                  <td>{row.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {error ? <p className="error-text">{error}</p> : null}
    </section>
  )
}
