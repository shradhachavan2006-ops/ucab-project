import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Anav from '../../components/Anav';
import API from '../../api';

export default function Ahome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/bookings/stats')
      .then(({ data }) => setStats(data.stats))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const cards = stats ? [
    { label: 'Total Bookings', value: stats.totalBookings, icon: '📋', color: '#0f3460', light: '#e3f2fd' },
    { label: 'Completed Rides', value: stats.completedBookings, icon: '✅', color: '#1b5e20', light: '#e8f5e9' },
    { label: 'Pending Bookings', value: stats.pendingBookings, icon: '⏳', color: '#e65100', light: '#fff3e0' },
    { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: '💰', color: '#1a237e', light: '#ede7f6' },
  ] : [];

  const quickLinks = [
    { label: 'Manage Users', icon: 'bi-people-fill', to: '/admin/users', desc: 'View, edit or remove users' },
    { label: 'All Bookings', icon: 'bi-journal-check', to: '/admin/bookings', desc: 'Monitor and update booking statuses' },
    { label: 'Manage Cabs', icon: 'bi-taxi-front-fill', to: '/admin/cabs', desc: 'Edit or delete cab listings' },
    { label: 'Add New Cab', icon: 'bi-plus-circle-fill', to: '/admin/cabs/add', desc: 'Register a new cab to the fleet' },
  ];

  return (
    <div style={{ background: '#f0f4ff', minHeight: '100vh' }}>
      <Anav />
      <div className="container-fluid px-4 py-4">
        <div className="d-flex align-items-center gap-3 mb-4">
          <div style={{ fontSize: '2.5rem' }}>🛡️</div>
          <div>
            <h4 className="fw-bold mb-0">Admin Dashboard</h4>
            <p className="text-muted mb-0">Overview of UCab operations</p>
          </div>
        </div>

        {/* Stats Cards */}
        {loading ? (
          <div className="text-center py-5"><div className="spinner-border text-warning"></div></div>
        ) : (
          <div className="row g-4 mb-4">
            {cards.map((c, i) => (
              <div className="col-6 col-lg-3" key={i}>
                <div className="card border-0 shadow-sm h-100 p-3" style={{ borderRadius: '16px', background: c.light }}>
                  <div className="d-flex align-items-center gap-3">
                    <div style={{ fontSize: '2.5rem' }}>{c.icon}</div>
                    <div>
                      <div className="fw-bold fs-4" style={{ color: c.color }}>{c.value}</div>
                      <div className="text-muted small">{c.label}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Links */}
        <h5 className="fw-bold mb-3">Quick Actions</h5>
        <div className="row g-4">
          {quickLinks.map((link, i) => (
            <div className="col-md-6 col-lg-3" key={i}>
              <Link to={link.to} className="text-decoration-none">
                <div className="card border-0 shadow-sm h-100 p-4" style={{ borderRadius: '16px', transition: 'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <i className={`bi ${link.icon} fs-2 text-warning mb-2`}></i>
                  <h6 className="fw-bold text-dark">{link.label}</h6>
                  <p className="text-muted small mb-0">{link.desc}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
