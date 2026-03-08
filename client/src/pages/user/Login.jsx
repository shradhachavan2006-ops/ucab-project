import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await API.post('/users/login', form);
      loginUser(data.user, data.token);
      navigate('/uhome');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
      <div className="card border-0 shadow-lg p-4" style={{ width: '100%', maxWidth: '420px', borderRadius: '20px' }}>
        <div className="text-center mb-4">
          <div style={{ fontSize: '3rem' }}>🚕</div>
          <h2 className="fw-bold">Welcome Back</h2>
          <p className="text-muted">Sign in to your UCab account</p>
        </div>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input type="email" name="email" className="form-control form-control-lg"
              placeholder="you@example.com" value={form.email} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input type="password" name="password" className="form-control form-control-lg"
              placeholder="Your password" value={form.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-warning btn-lg w-100 fw-bold text-dark" disabled={loading}>
            {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="bi bi-box-arrow-in-right me-2"></i>}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-4 mb-0">
          Don't have an account? <Link to="/register" className="text-warning fw-bold">Register</Link>
        </p>
        <p className="text-center mt-2 mb-0">
          <Link to="/" className="text-muted small">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}
