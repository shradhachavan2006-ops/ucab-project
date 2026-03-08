import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Anav from '../../components/Anav';
import API from '../../api';

export default function Addcar() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', model: '', plateNumber: '', seats: '', cabType: 'Sedan',
    pricePerKm: '', driverName: '', driverPhone: '', rating: '4.5',
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (image) formData.append('image', image);
      await API.post('/cars', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      navigate('/admin/cabs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add car.');
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#f0f4ff', minHeight: '100vh' }}>
      <Anav />
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <h4 className="fw-bold mb-4">Add New Cab</h4>
            <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '16px' }}>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Car Name *</label>
                    <input type="text" name="name" className="form-control" placeholder="e.g., Toyota Innova"
                      value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Model *</label>
                    <input type="text" name="model" className="form-control" placeholder="e.g., Crysta 2023"
                      value={form.model} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Plate Number *</label>
                    <input type="text" name="plateNumber" className="form-control" placeholder="e.g., MH12AB1234"
                      value={form.plateNumber} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Number of Seats *</label>
                    <input type="number" name="seats" className="form-control" placeholder="e.g., 4"
                      min="2" max="15" value={form.seats} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Cab Type *</label>
                    <select name="cabType" className="form-select" value={form.cabType} onChange={handleChange}>
                      {['Mini', 'Sedan', 'SUV', 'Luxury', 'XL'].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Price per km (₹) *</label>
                    <input type="number" name="pricePerKm" className="form-control" placeholder="e.g., 12"
                      min="0" value={form.pricePerKm} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Driver Name</label>
                    <input type="text" name="driverName" className="form-control" placeholder="Optional"
                      value={form.driverName} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Driver Phone</label>
                    <input type="tel" name="driverPhone" className="form-control" placeholder="Optional"
                      value={form.driverPhone} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Rating (0-5)</label>
                    <input type="number" name="rating" className="form-control"
                      min="0" max="5" step="0.1" value={form.rating} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Car Image</label>
                    <input type="file" className="form-control" accept="image/*"
                      onChange={e => setImage(e.target.files[0])} />
                  </div>
                </div>

                <div className="d-flex gap-2 mt-4">
                  <button type="submit" className="btn btn-warning fw-bold text-dark" disabled={loading}>
                    {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="bi bi-plus-circle me-2"></i>}
                    {loading ? 'Adding...' : 'Add Cab'}
                  </button>
                  <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/admin/cabs')}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
