import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Anav from '../../components/Anav';
import API from '../../api';

export default function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', isActive: true });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get(`/admin/users/${id}`)
      .then(({ data }) => setForm({
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone || '',
        isActive: data.user.isActive,
      }))
      .catch(() => navigate('/admin/users'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await API.put(`/admin/users/${id}`, form);
      navigate('/admin/users');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed.');
      setSaving(false);
    }
  };

  return (
    <div style={{ background: '#f0f4ff', minHeight: '100vh' }}>
      <Anav />
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h4 className="fw-bold mb-4">Edit User</h4>
            {loading ? (
              <div className="text-center py-5"><div className="spinner-border text-warning"></div></div>
            ) : (
              <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '16px' }}>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input type="text" className="form-control" value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <input type="email" className="form-control" value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Phone</label>
                    <input type="tel" className="form-control" value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div className="mb-4">
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" id="isActive"
                        checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} />
                      <label className="form-check-label fw-semibold" htmlFor="isActive">Account Active</label>
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-warning fw-bold text-dark" disabled={saving}>
                      {saving ? <span className="spinner-border spinner-border-sm me-2"></span> : null}
                      Save Changes
                    </button>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/admin/users')}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
