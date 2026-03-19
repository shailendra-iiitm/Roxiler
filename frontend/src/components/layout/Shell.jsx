import Header from './Header'
import Footer from './Footer'

export default function Shell({ role, onLogout, children }) {
  return (
    <div className="app-shell">
      <Header role={role} onLogout={onLogout} />
      <main className="app-content">{children}</main>
      <Footer />
    </div>
  )
}
