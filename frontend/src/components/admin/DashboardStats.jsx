export default function DashboardStats({ stats, busy, onRefresh }) {
  return (
    <section className="card">
      <div className="card-head">
        <h2>Dashboard</h2>
        <button type="button" onClick={onRefresh} disabled={busy}>
          {busy ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="stats-grid">
        <article className="stat-card">
          <h3>{stats?.totalUsers || 0}</h3>
          <p>Total Users</p>
        </article>
        <article className="stat-card">
          <h3>{stats?.totalStores || 0}</h3>
          <p>Total Stores</p>
        </article>
        <article className="stat-card">
          <h3>{stats?.totalRatings || 0}</h3>
          <p>Total Ratings</p>
        </article>
      </div>
    </section>
  )
}
