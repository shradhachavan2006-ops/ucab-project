import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Anav from '../../components/Anav';
import API from '../../api';

export default function Acabedit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', model: '', plateNumber: '', seats: '', cabType: 'Sedan',
    pricePerKm: '', driverName: '', driverPhone: '', rating: '', isAvailable: true,
  });
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get(`/cars/${id}`)
      .then(({ data }) => {
        const c = data.car;
        setForm({
          name: c.name, model: c.model, plateNumber: c.plateNumber,
          seats: c.seats, cabType: c.cabType, pricePerKm: c.pricePerKm,
          driverName: c.driverName || '', driverPhone: c.driverPhone || '',
          rating: c.rating, isAvailable: c.isAvailable,
        });
        setCurrentImage(c.image);
      })
      .catch(() => navigate('/admin/cabs'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (image) formData.append('image', image);
      await API.put(`/cars/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      navigate('/admin/cabs');
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
          <div className="col-lg-7">
            <h4 className="fw-bold mb-4">Edit Cab</h4>
            {loading ? (
              <div className="text-center py-5"><div className="spinner-border text-warning"></div></div>
            ) : (
              <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '16px' }}>
                {error && <div className="alert alert-danger">{error}</div>}
                {currentImage && (
                  <div className="mb-3 text-center">
                    <img src={`/uploads/${currentImage}`} alt="Current"
                      style={{ height: '120px', objectFit: 'cover', borderRadius: '12px' }} />
                    <div className="text-muted small mt-1">Current image</div>
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Car Name</label>
                      <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Model</label>
                      <input type="text" name="model" className="form-control" value={form.model} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Plate Number</label>
                      <input type="text" name="plateNumber" className="form-control" value={form.plateNumber} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Seats</label>
                      <input type="number" name="seats" className="form-control" min="2" max="15" value={form.seats} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Cab Type</label>
                      <select name="cabType" className="form-select" value={form.cabType} onChange={handleChange}>
                        {['Mini', 'Sedan', 'SUV', 'Luxury', 'XL'].map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Price per km (₹)</label>
                      <input type="number" name="pricePerKm" className="form-control" min="0" value={form.pricePerKm} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Driver Name</label>
                      <input type="text" name="driverName" className="form-control" value={form.driverName} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Driver Phone</label>
                      <input type="tel" name="driverPhone" className="form-control" value={form.driverPhone} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Rating</label>
                      <input type="number" name="rating" className="form-control" min="0" max="5" step="0.1" value={form.rating} onChange={handleChange} />
                    </div>
                    <div className="col-md-6 d-flex align-items-end">
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" name="isAvailable" id="isAvailable"
                          checked={form.isAvailable} onChange={handleChange} />
                        <label className="form-check-label fw-semibold" htmlFor="isAvailable">Available for Booking</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold">Replace Image</label>
                      <input type="file" className="form-control" accept="image/*" onChange={e => setImage(e.target.files[0])} />
                    </div>
                  </div>
                  <div className="d-flex gap-2 mt-4">
                    <button type="submit" className="btn btn-warning fw-bold text-dark" disabled={saving}>
                      {saving ? <span className="spinner-border spinner-border-sm me-2"></span> : null}
                      Save Changes
                    </button>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/admin/cabs')}>Cancel</button>
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
