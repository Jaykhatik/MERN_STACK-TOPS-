import { useEffect, useState } from 'react'
import Avatar from '../components/Avatar'
import { StatusBadge, CategoryBadge } from '../components/Badges'
import Toast from '../components/Toast'
import { BASE_URL } from '../hooks/useFetch'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState(null)

  const [form, setForm] = useState({
    name: '', email: '', role: '', department: '', location: '',
  })

  const fetchUsers = () => {
    setLoading(true)
    fetch(`${BASE_URL}/users`)
      .then((r) => { if (!r.ok) throw new Error('Failed to fetch'); return r.json() })
      .then((d) => { setUsers(d); setLoading(false) })
      .catch((e) => { setError(e.message); setLoading(false) })
  }

  useEffect(() => { fetchUsers() }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      setUsers((prev) => [...prev, data.user])
      setForm({ name: '', email: '', role: '', department: '', location: '' })
      setShowForm(false)
      showToast('✅ User added successfully!', 'success')
    } catch (err) {
      showToast(`❌ ${err.message}`, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const showToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const active = users.filter((u) => u.status === 'Active').length
  const depts = [...new Set(users.map((u) => u.department))].length

  if (loading) return <div className="loading">Loading users...</div>
  if (error) return <div className="error-msg">Error: {error}</div>

  return (
    <div className="page">
      <Toast toast={toast} />

      <div className="page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1>Team Members</h1>
          <p>Manage and view all employees across departments.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Add Member'}
        </button>
      </div>

      {showForm && (
        <form className="add-form" onSubmit={handleSubmit}>
          <h3 className="form-title">New Team Member</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Riya Kapoor" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="e.g. riya@techcorp.in" required />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input name="role" value={form.role} onChange={handleChange} placeholder="e.g. Frontend Developer" required />
            </div>
            <div className="form-group">
              <label>Department</label>
              <select name="department" value={form.department} onChange={handleChange} required>
                <option value="">Select department</option>
                <option>Engineering</option>
                <option>Design</option>
                <option>Product</option>
                <option>Infrastructure</option>
                <option>Quality</option>
                <option>Analytics</option>
              </select>
            </div>
            <div className="form-group">
              <label>Location</label>
              <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Bangalore" required />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Adding...' : 'Add Member'}
            </button>
            <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="stats-bar">
        <div className="stat-card">
          <span className="stat-value">{users.length}</span>
          <span className="stat-label">Total Members</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{active}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{depts}</span>
          <span className="stat-label">Departments</span>
        </div>
      </div>

      <div className="table-wrapper">
        <div className="table-toolbar">
          <h2>All Members</h2>
          <span className="count-badge">{users.length} records</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Member</th>
              <th>Role</th>
              <th>Department</th>
              <th>Location</th>
              <th>Joined</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-cell">
                    <Avatar name={user.name} id={user.id} />
                    <div>
                      <div className="name">{user.name}</div>
                      <div className="email">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>{user.role}</td>
                <td><CategoryBadge category={user.department} /></td>
                <td>{user.location}</td>
                <td>
                  {new Date(user.joined).toLocaleDateString('en-IN', {
                    year: 'numeric', month: 'short', day: 'numeric',
                  })}
                </td>
                <td><StatusBadge status={user.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
