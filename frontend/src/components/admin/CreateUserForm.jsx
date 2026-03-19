export default function CreateUserForm({ form, onChange, onSubmit, busy }) {
  return (
    <section className="card">
      <h2>Add User</h2>
      <form className="form-grid" onSubmit={onSubmit}>
        <label>
          Name
          <input value={form.name} onChange={(event) => onChange('name', event.target.value)} required />
        </label>
        <label>
          Email
          <input value={form.email} onChange={(event) => onChange('email', event.target.value)} required />
        </label>
        <label>
          Address
          <textarea value={form.address} onChange={(event) => onChange('address', event.target.value)} required />
        </label>
        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => onChange('password', event.target.value)}
            required
          />
        </label>
        <label>
          Role
          <select value={form.role} onChange={(event) => onChange('role', event.target.value)}>
            <option value="USER">USER</option>
            <option value="OWNER">OWNER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </label>

        <button type="submit" disabled={busy}>
          {busy ? 'Saving...' : 'Create User'}
        </button>
      </form>
    </section>
  )
}
