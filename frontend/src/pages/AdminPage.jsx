import { useCallback, useEffect, useMemo, useState } from 'react'
import { apiRequest } from '../api'
import {
  validateAddress,
  validateEmail,
  validatePassword,
  validateRole,
  validateStoreName,
  validateUserName,
} from '../validation'
import DashboardStats from '../components/admin/DashboardStats'
import CreateUserForm from '../components/admin/CreateUserForm'
import CreateStoreForm from '../components/admin/CreateStoreForm'
import UsersTable from '../components/admin/UsersTable'
import StoresTable from '../components/admin/StoresTable'

const defaultUserForm = {
  name: '',
  email: '',
  address: '',
  password: '',
  role: 'USER',
}

const defaultStoreForm = {
  name: '',
  email: '',
  address: '',
  owner_id: '',
}

export default function AdminPage({ token }) {
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [stores, setStores] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [userForm, setUserForm] = useState(defaultUserForm)
  const [storeForm, setStoreForm] = useState(defaultStoreForm)

  const [usersFilter, setUsersFilter] = useState({
    name: '',
    email: '',
    address: '',
    role: '',
    sortBy: 'name',
    order: 'ASC',
  })

  const [storesFilter, setStoresFilter] = useState({
    name: '',
    email: '',
    address: '',
    sortBy: 'name',
    order: 'ASC',
  })

  const ownerOptions = useMemo(() => users.filter((user) => user.role === 'OWNER'), [users])

  const loadStats = useCallback(async () => {
    const data = await apiRequest('/admin/dashboard', { token })
    setStats(data)
  }, [token])

  const loadUsers = useCallback(async () => {
    const data = await apiRequest('/admin/users', { token, query: usersFilter })
    setUsers(data)
  }, [token, usersFilter])

  const loadStores = useCallback(async () => {
    const data = await apiRequest('/admin/stores', { token, query: storesFilter })
    setStores(data)
  }, [token, storesFilter])

  const loadAll = useCallback(async () => {
    setBusy(true)
    setError('')

    try {
      await Promise.all([loadStats(), loadUsers(), loadStores()])
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setBusy(false)
    }
  }, [loadStats, loadStores, loadUsers])

  useEffect(() => {
    loadStats().catch((requestError) => setError(requestError.message))
  }, [loadStats])

  useEffect(() => {
    loadUsers().catch((requestError) => setError(requestError.message))
  }, [loadUsers])

  useEffect(() => {
    loadStores().catch((requestError) => setError(requestError.message))
  }, [loadStores])

  function updateUserForm(field, value) {
    setUserForm((prev) => ({ ...prev, [field]: value }))
  }

  function updateStoreForm(field, value) {
    setStoreForm((prev) => ({ ...prev, [field]: value }))
  }

  function updateUsersFilter(field, value) {
    setUsersFilter((prev) => ({ ...prev, [field]: value }))
  }

  function updateStoresFilter(field, value) {
    setStoresFilter((prev) => ({ ...prev, [field]: value }))
  }

  async function handleCreateUser(event) {
    event.preventDefault()
    setMessage('')
    setError('')

    const firstError =
      validateUserName(userForm.name) ||
      validateEmail(userForm.email) ||
      validateAddress(userForm.address) ||
      validatePassword(userForm.password) ||
      validateRole(userForm.role)

    if (firstError) {
      setError(firstError)
      return
    }

    setBusy(true)

    try {
      const data = await apiRequest('/admin/users', {
        method: 'POST',
        token,
        body: {
          ...userForm,
          name: userForm.name.trim(),
          email: userForm.email.trim().toLowerCase(),
          address: userForm.address.trim(),
        },
      })

      setMessage(data.message || 'User created successfully.')
      setUserForm(defaultUserForm)
      await loadAll()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setBusy(false)
    }
  }

  async function handleCreateStore(event) {
    event.preventDefault()
    setMessage('')
    setError('')

    const firstError =
      validateStoreName(storeForm.name) ||
      validateEmail(storeForm.email) ||
      validateAddress(storeForm.address)

    if (firstError) {
      setError(firstError)
      return
    }

    setBusy(true)

    try {
      const data = await apiRequest('/stores', {
        method: 'POST',
        token,
        body: {
          name: storeForm.name.trim(),
          email: storeForm.email.trim().toLowerCase(),
          address: storeForm.address.trim(),
          owner_id: storeForm.owner_id ? Number(storeForm.owner_id) : null,
        },
      })

      setMessage(data.message || 'Store created successfully.')
      setStoreForm(defaultStoreForm)
      await loadAll()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="admin-grid">
      <DashboardStats stats={stats} busy={busy} onRefresh={loadAll} />
      <CreateUserForm form={userForm} onChange={updateUserForm} onSubmit={handleCreateUser} busy={busy} />
      <CreateStoreForm
        form={storeForm}
        owners={ownerOptions}
        onChange={updateStoreForm}
        onSubmit={handleCreateStore}
        busy={busy}
      />
      <UsersTable
        filters={usersFilter}
        users={users}
        selectedUser={selectedUser}
        onFilterChange={updateUsersFilter}
        onSelectUser={setSelectedUser}
      />
      <StoresTable filters={storesFilter} stores={stores} onFilterChange={updateStoresFilter} />

      {message ? <p className="ok-text">{message}</p> : null}
      {error ? <p className="error-text">{error}</p> : null}
    </div>
  )
}
