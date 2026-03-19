export default function CreateStoreForm({ form, owners, onChange, onSubmit, busy }) {
  return (
    <section className="card">
      <h2>Add Store</h2>
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
          Owner
          <select value={form.owner_id} onChange={(event) => onChange('owner_id', event.target.value)}>
            <option value="">No owner</option>
            {owners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {owner.name}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" disabled={busy}>
          {busy ? 'Saving...' : 'Create Store'}
        </button>
      </form>
    </section>
  )
}
