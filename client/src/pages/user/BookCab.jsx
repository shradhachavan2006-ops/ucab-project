import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Unav from '../../components/Unav';
import API from '../../api';

export default function BookCab() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({
    pickup: '',
    destination: '',
    bookingDate: today,
    estimatedDistance: '',
    paymentMethod: 'Cash',
    notes: '',
  });

  const estimatedFare = form.estimatedDistance && car
    ? Math.round(30 + car.pricePerKm * Number(form.estimatedDistance))
    : null;

  useEffect(() => {
    API.get(`/cars/${id}`)
      .then(({ data }) => setCar(data.car))
      .catch(() => navigate('/cabs'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await API.post('/bookings', { carId: id, ...form });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div style={{ background: '#f0f4ff', minHeight: '100vh' }}>
      <Unav />
      <div className="text-center py-5"><div className="spinner-border text-warning"></div></div>
    </div>
  );

  if (success) return (
    <div style={{ background: '#f0f4ff', minHeight: '100vh' }}>
      <Unav />
      <div className="container py-5 text-center">
        <div style={{ fontSize: '5rem' }}>🎉</div>
        <h2 className="fw-bold mt-3">Booking Confirmed!</h2>
        <p className="text-muted">Your cab has been booked successfully. Your driver will be assigned shortly.</p>
        <div className="d-flex gap-3 justify-content-center mt-4">
          <button className="btn btn-warning fw-bold" onClick={() => navigate('/mybookings')}>
            View My Bookings
          </button>
          <button className="btn btn-outline-secondary" onClick={() => navigate('/cabs')}>
            Book Another
          </button>
        </div>
      </div>
    </div>
  );

  const cabIcons = { Mini: '🚗', Sedan: '🚙', SUV: '🛻', Luxury: '🏎️', XL: '🚐' };

  return (
    <div style={{ background: '#f0f4ff', minHeight: '100vh' }}>
      <Unav />
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h4 className="fw-bold mb-4">Complete Your Booking</h4>

            {/* Car Card */}
            <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '16px', overflow: 'hidden' }}>
              <div className="card-body d-flex align-items-center gap-3 p-3">
                <div style={{ fontSize: '3rem', background: '#fff9e6', borderRadius: '12px', padding: '10px' }}>
                  {cabIcons[car.cabType] || '🚗'}
                </div>
                <div className="flex-grow-1">
                  <h5 className="fw-bold mb-0">{car.name} <span className="text-muted fw-normal">— {car.model}</span></h5>
                  <div className="d-flex gap-2 mt-1">
                    <span className="badge bg-warning text-dark">{car.cabType}</span>
                    <span className="badge bg-light text-dark border">{car.seats} seats</span>
                    <span className="text-warning small"><i className="bi bi-star-fill me-1"></i>{car.rating}</span>
                  </div>
                  {car.driverName && <small className="text-muted"><i className="bi bi-person me-1"></i>{car.driverName}</small>}
                </div>
                <div className="text-end">
                  <div className="fw-bold text-warning fs-5">₹{car.pricePerKm}/km</div>
                  <small className="text-muted">+ ₹30 base fare</small>
                </div>
              </div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {/* Booking Form */}
            <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '16px' }}>
              <h5 className="fw-bold mb-4">Ride Details</h5>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-geo-alt-fill text-success me-1"></i>Pickup Location
                    </label>
                    <input type="text" name="pickup" className="form-control" placeholder="e.g., Airport Terminal 1"
                      value={form.pickup} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-geo-alt-fill text-danger me-1"></i>Destination
                    </label>
                    <input type="text" name="destination" className="form-control" placeholder="e.g., City Center"
                      value={form.destination} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-calendar me-1"></i>Booking Date
                    </label>
                    <input type="date" name="bookingDate" className="form-control" min={today}
                      value={form.bookingDate} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-signpost me-1"></i>Estimated Distance (km)
                    </label>
                    <input type="number" name="estimatedDistance" className="form-control" placeholder="Optional"
                      min="1" value={form.estimatedDistance} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-credit-card me-1"></i>Payment Method
                    </label>
                    <select name="paymentMethod" className="form-select" value={form.paymentMethod} onChange={handleChange}>
                      <option value="Cash">Cash</option>
                      <option value="Card">Card</option>
                      <option value="Wallet">Wallet</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Special Notes (optional)</label>
                    <input type="text" name="notes" className="form-control" placeholder="e.g., I have luggage"
                      value={form.notes} onChange={handleChange} />
                  </div>
                </div>

                {/* Fare Estimate */}
                {estimatedFare && (
                  <div className="alert alert-warning mt-4 d-flex justify-content-between align-items-center">
                    <span><i className="bi bi-calculator me-2"></i>Estimated Fare</span>
                    <strong className="fs-5">₹{estimatedFare}</strong>
                  </div>
                )}

                <button type="submit" className="btn btn-warning btn-lg w-100 fw-bold text-dark mt-4" disabled={submitting}>
                  {submitting ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="bi bi-check-circle me-2"></i>}
                  {submitting ? 'Booking...' : 'Confirm Booking'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
