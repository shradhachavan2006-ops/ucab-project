import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Anav from '../../components/Anav';
import API from '../../api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      const { data } = await API.get('/admin/users');
      setUsers(data.users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const deleteUser = async (id) => {
    if (!confirm('Delete this user? This cannot be undone.')) return;
    try {
      await API.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed.');
    }
  };

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: '#f0f4ff', minHeight: '100vh' }}>
      <Anav />
      <div className="container-fluid px-4 py-4">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <h4 className="fw-bold mb-0">Manage Users</h4>
            <p className="text-muted mb-0">{users.length} total users</p>
          </div>
          <input type="text" className="form-control" style={{ maxWidth: '280px' }}
            placeholder="🔍 Search by name or email..." value={search}
            onChange={e => setSearch(e.target.value)} />
        </div>

        {loading ? (
          <div className="text-center py-5"><div className="spinner-border text-warning"></div></div>
        ) : (
          <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead style={{ background: '#f8f9fa' }}>
                  <tr>
                    <th className="ps-4">Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan="6" className="text-center py-4 text-muted">No users found.</td></tr>
                  ) : filtered.map(u => (
                    <tr key={u._id}>
                      <td className="ps-4 fw-semibold">
                        <i className="bi bi-person-circle text-muted me-2"></i>{u.name}
                      </td>
                      <td className="text-muted">{u.email}</td>
                      <td className="text-muted">{u.phone || '—'}</td>
                      <td>
                        <span className={`badge bg-${u.isActive ? 'success' : 'danger'}`}>
                          {u.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="text-muted small">{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td className="text-center">
                        <Link to={`/admin/users/edit/${u._id}`} className="btn btn-sm btn-outline-primary me-2">
                          <i className="bi bi-pencil"></i>
                        </Link>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteUser(u._id)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
