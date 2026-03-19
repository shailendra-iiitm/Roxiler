export default function Header({ role, onLogout }) {
  return (
    <header className="site-header">
      <div>
        <h1>Store Rating Portal</h1>
        <p>Signed in as {role}</p>
      </div>
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </header>
  )
}
