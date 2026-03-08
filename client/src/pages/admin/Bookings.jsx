import { useState, useEffect } from 'react';
import Anav from '../../components/Anav';
import API from '../../api';

const STATUS_OPTIONS = ['Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'];
const STATUS_COLORS = { Pending: 'warning', Confirmed: 'info', 'In Progress': 'primary', Completed: 'success', Cancelled: 'danger' };

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  const fetchBookings = async () => {
    try {
      const { data } = await API.get('/bookings');
      setBookings(data.bookings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/bookings/${id}`, { status });
      fetchBookings();
    } catch (err) {
      alert('Update failed.');
    }
  };

  const filtered = filter === 'All' ? bookings : bookings.filter(b => b.status === filter);

  return (
    <div style={{ background: '#f0f4ff', minHeight: '100vh' }}>
      <Anav />
      <div className="container-fluid px-4 py-4">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <h4 className="fw-bold mb-0">All Bookings</h4>
            <p className="text-muted mb-0">{bookings.length} total bookings</p>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            {['All', ...STATUS_OPTIONS].map(s => (
              <button key={s} className={`btn btn-sm ${filter === s ? 'btn-warning text-dark fw-bold' : 'btn-outline-secondary'}`}
                onClick={() => setFilter(s)}>{s}</button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5"><div className="spinner-border text-warning"></div></div>
        ) : (
          <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead style={{ background: '#f8f9fa' }}>
                  <tr>
                    <th className="ps-4">User</th>
                    <th>Car</th>
                    <th>Route</th>
                    <th>Date</th>
                    <th>Fare</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan="7" className="text-center py-4 text-muted">No bookings found.</td></tr>
                  ) : filtered.map(b => (
                    <tr key={b._id}>
                      <td className="ps-4">
                        <div className="fw-semibold">{b.user?.name}</div>
                        <div className="text-muted small">{b.user?.email}</div>
                      </td>
                      <td>
                        <div className="fw-semibold">{b.car?.name}</div>
                        <div className="text-muted small">{b.car?.cabType}</div>
                      </td>
                      <td style={{ maxWidth: '200px' }}>
                        <div className="small text-success"><i className="bi bi-geo-alt-fill me-1"></i>{b.pickup}</div>
                        <div className="small text-danger"><i className="bi bi-geo-alt-fill me-1"></i>{b.destination}</div>
                      </td>
                      <td className="text-muted small">{new Date(b.bookingDate).toLocaleDateString()}</td>
                      <td className="fw-bold text-warning">₹{b.estimatedFare}</td>
                      <td>
                        <span className={`badge bg-${STATUS_COLORS[b.status]}`}>{b.status}</span>
                      </td>
                      <td>
                        <select className="form-select form-select-sm" style={{ minWidth: '130px' }}
                          value={b.status} onChange={e => updateStatus(b._id, e.target.value)}>
                          {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                        </select>
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
