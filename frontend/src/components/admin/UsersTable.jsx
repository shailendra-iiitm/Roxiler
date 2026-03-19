import EmptyState from '../common/EmptyState'

export default function UsersTable({ filters, users, selectedUser, onFilterChange, onSelectUser }) {
  return (
    <section className="card span-full">
      <h2>Users</h2>
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
        <select value={filters.role} onChange={(event) => onFilterChange('role', event.target.value)}>
          <option value="">All roles</option>
          <option value="USER">USER</option>
          <option value="OWNER">OWNER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <select value={filters.sortBy} onChange={(event) => onFilterChange('sortBy', event.target.value)}>
          <option value="name">Sort by name</option>
          <option value="email">Sort by email</option>
          <option value="address">Sort by address</option>
          <option value="role">Sort by role</option>
        </select>
        <select value={filters.order} onChange={(event) => onFilterChange('order', event.target.value)}>
          <option value="ASC">ASC</option>
          <option value="DESC">DESC</option>
        </select>
      </div>

      {users.length === 0 ? (
        <EmptyState title="No users found" message="Try adjusting user filters." />
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="clickable-row" onClick={() => onSelectUser(user)}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedUser ? (
        <div className="detail-card">
          <h3>User Details</h3>
          <p>
            <strong>Name:</strong> {selectedUser.name}
          </p>
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <p>
            <strong>Address:</strong> {selectedUser.address}
          </p>
          <p>
            <strong>Role:</strong> {selectedUser.role}
          </p>
        </div>
      ) : null}
    </section>
  )
}
