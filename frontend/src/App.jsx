
import Shell from './components/layout/Shell'
import PasswordForm from './components/forms/PasswordForm'
import { useSession } from './hooks/useSession'
import AdminPage from './pages/AdminPage'
import AuthPage from './pages/AuthPage'
import OwnerPage from './pages/OwnerPage'
import UserPage from './pages/UserPage'
import './styles/app.css'

function App() {
  const { session, login, logout } = useSession()

  if (!session) {
    return <AuthPage onLogin={login} />
  }

  return (
    <Shell role={session.role} onLogout={logout}>
      {session.role === 'ADMIN' ? <AdminPage token={session.token} /> : null}
      {session.role === 'USER' ? <UserPage token={session.token} /> : null}
      {session.role === 'OWNER' ? <OwnerPage token={session.token} /> : null}
      <PasswordForm token={session.token} />
    </Shell>
  )
}

export default App
