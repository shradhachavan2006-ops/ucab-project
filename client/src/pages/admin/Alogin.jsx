import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api';

export default function Alogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await API.post('/admin/login', form);
      loginAdmin(data.admin, data.token);
      navigate('/admin/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: 'linear-gradient(135deg, #0f3460, #16213e, #1a1a2e)' }}>
      <div className="card border-0 shadow-lg p-4" style={{ width: '100%', maxWidth: '420px', borderRadius: '20px' }}>
        <div className="text-center mb-4">
          <div style={{ fontSize: '3rem' }}>🛡️</div>
          <h2 className="fw-bold">Admin Portal</h2>
          <p className="text-muted">Sign in to manage UCab</p>
        </div>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Admin Email</label>
            <input type="email" className="form-control form-control-lg" placeholder="admin@ucab.com"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input type="password" className="form-control form-control-lg" placeholder="Admin password"
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          </div>
          <button type="submit" className="btn btn-warning btn-lg w-100 fw-bold text-dark" disabled={loading}>
            {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="bi bi-shield-lock me-2"></i>}
            {loading ? 'Signing in...' : 'Admin Login'}
          </button>
        </form>
        <p className="text-center mt-4 mb-0">
          New admin? <Link to="/admin/register" className="text-warning fw-bold">Register here</Link>
        </p>
        <p className="text-center mt-2 mb-0">
          <Link to="/" className="text-muted small">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}
