import EmptyState from '../common/EmptyState'

export default function StoresTable({ filters, stores, onFilterChange }) {
  return (
    <section className="card span-full">
      <h2>Stores</h2>
      <div className="toolbar">
        <input
          placeholder="Filter by name"
          value={filters.name}
          onChange={(event) => onFilterChange('name', event.target.value)}
        />
        <input
          placeholder="Filter by email"
          value={filters.email}
          onChange={(event) => onFilterChange('email', event.target.value)}
        />
        <input
          placeholder="Filter by address"
          value={filters.address}
          onChange={(event) => onFilterChange('address', event.target.value)}
        />
        <select value={filters.sortBy} onChange={(event) => onFilterChange('sortBy', event.target.value)}>
          <option value="name">Sort by name</option>
          <option value="email">Sort by email</option>
          <option value="address">Sort by address</option>
          <option value="rating">Sort by rating</option>
        </select>
        <select value={filters.order} onChange={(event) => onFilterChange('order', event.target.value)}>
          <option value="ASC">ASC</option>
          <option value="DESC">DESC</option>
        </select>
      </div>

      {stores.length === 0 ? (
        <EmptyState title="No stores found" message="Try adjusting store filters." />
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => (
                <tr key={store.id}>
                  <td>{store.name}</td>
                  <td>{store.email}</td>
                  <td>{store.address}</td>
                  <td>{Number(store.rating).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
