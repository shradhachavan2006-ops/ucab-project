import { useState, useEffect } from 'react';
import Unav from '../../components/Unav';
import API from '../../api';

const STATUS_COLORS = {
  Pending: 'warning',
  Confirmed: 'info',
  'In Progress': 'primary',
  Completed: 'success',
  Cancelled: 'danger',
};

export default function Mybookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const { data } = await API.get('/bookings/my');
      setBookings(data.bookings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const cancelBooking = async (id) => {
    if (!confirm('Cancel this booking?')) return;
    try {
      await API.put(`/bookings/${id}/cancel`);
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || 'Cannot cancel.');
    }
  };

  return (
    <div style={{ background: '#f0f4ff', minHeight: '100vh' }}>
      <Unav />
      <div className="container py-4">
        <h4 className="fw-bold mb-1">My Bookings</h4>
        <p className="text-muted mb-4">View and manage your rides</p>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: '4rem' }}>📋</div>
            <h5 className="mt-3 text-muted">No bookings yet</h5>
            <a href="/cabs" className="btn btn-warning mt-3">Book Your First Ride</a>
          </div>
        ) : (
          <div className="row g-4">
            {bookings.map((b) => (
              <div className="col-lg-6" key={b._id}>
                <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '16px' }}>
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h6 className="fw-bold mb-0">{b.car?.name} — {b.car?.model}</h6>
                        <small className="text-muted">{b.car?.cabType}</small>
                      </div>
                      <span className={`badge bg-${STATUS_COLORS[b.status] || 'secondary'}`}>{b.status}</span>
                    </div>

                    <div className="mb-3">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <i className="bi bi-geo-alt-fill text-success"></i>
                        <span className="small">{b.pickup}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-geo-alt-fill text-danger"></i>
                        <span className="small">{b.destination}</span>
                      </div>
                    </div>

                    <div className="row g-2 text-center mb-3">
                      <div className="col-4">
                        <div className="bg-light rounded p-2">
                          <div className="fw-bold text-warning">₹{b.estimatedFare}</div>
                          <div style={{ fontSize: '0.7rem' }} className="text-muted">Fare</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="bg-light rounded p-2">
                          <div className="fw-bold">{b.estimatedDistance} km</div>
                          <div style={{ fontSize: '0.7rem' }} className="text-muted">Distance</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="bg-light rounded p-2">
                          <div className="fw-bold small">{b.paymentMethod}</div>
                          <div style={{ fontSize: '0.7rem' }} className="text-muted">Payment</div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        <i className="bi bi-calendar me-1"></i>
                        {new Date(b.bookingDate).toLocaleDateString()}
                      </small>
                      {['Pending', 'Confirmed'].includes(b.status) && (
                        <button className="btn btn-sm btn-outline-danger" onClick={() => cancelBooking(b._id)}>
                          Cancel
                        </button>
                      )}
                    </div>

                    {b.car?.driverName && (
                      <div className="mt-2 small text-muted border-top pt-2">
                        <i className="bi bi-person-circle me-1"></i>Driver: {b.car.driverName}
                        {b.car.driverPhone && <span className="ms-2"><i className="bi bi-telephone me-1"></i>{b.car.driverPhone}</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
