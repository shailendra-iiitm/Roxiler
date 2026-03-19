import { useCallback, useEffect, useState } from 'react'
import { apiRequest } from '../api'
import EmptyState from '../components/common/EmptyState'

export default function UserPage({ token }) {
  const [stores, setStores] = useState([])
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [order, setOrder] = useState('ASC')
  const [ratingDraft, setRatingDraft] = useState({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const loadStores = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const data = await apiRequest('/stores', {
        token,
        query: { search, sortBy, order },
      })
      setStores(data)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }, [order, search, sortBy, token])

  useEffect(() => {
    loadStores()
  }, [loadStores])

  async function handleRatingSubmit(store) {
    const value = Number(ratingDraft[store.id] || store.user_rating || 0)

    if (value < 1 || value > 5) {
      setError('Rating should be between 1 and 5.')
      return
    }

    setMessage('')
    setError('')

    try {
      const data = await apiRequest('/ratings', {
        method: 'POST',
        token,
        body: {
          store_id: store.id,
          rating: value,
        },
      })

      setMessage(data.message || 'Rating saved.')
      await loadStores()
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  return (
    <section className="card">
      <div className="card-head">
        <h2>Stores</h2>
        <button type="button" onClick={loadStores} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="toolbar">
        <input
          placeholder="Search by name or address"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          <option value="name">Sort by name</option>
          <option value="address">Sort by address</option>
          <option value="overall_rating">Sort by overall rating</option>
        </select>
        <select value={order} onChange={(event) => setOrder(event.target.value)}>
          <option value="ASC">ASC</option>
          <option value="DESC">DESC</option>
        </select>
      </div>

      {stores.length === 0 ? (
        <EmptyState title="No stores" message="No stores matched your search." />
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Store</th>
                <th>Address</th>
                <th>Overall Rating</th>
                <th>Your Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => (
                <tr key={store.id}>
                  <td>{store.name}</td>
                  <td>{store.address}</td>
                  <td>{Number(store.overall_rating).toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      className="small-input"
                      value={ratingDraft[store.id] ?? (store.user_rating || '')}
                      onChange={(event) =>
                        setRatingDraft({
                          ...ratingDraft,
                          [store.id]: event.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <button type="button" onClick={() => handleRatingSubmit(store)}>
                      {store.user_rating ? 'Update' : 'Submit'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {message ? <p className="ok-text">{message}</p> : null}
      {error ? <p className="error-text">{error}</p> : null}
    </section>
  )
}
