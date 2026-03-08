import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Unav from '../../components/Unav';

export default function Uhome() {
  const { user } = useAuth();

  const quickActions = [
    { label: 'Book a Cab', icon: '🚕', desc: 'Find and book available cabs instantly', to: '/cabs', color: '#ffc107' },
    { label: 'My Bookings', icon: '📋', desc: 'View your booking history and status', to: '/mybookings', color: '#0dcaf0' },
  ];

  const tips = [
    { icon: '⚡', text: 'Book in advance for scheduled trips' },
    { icon: '📍', text: 'Enter accurate pickup location for faster driver assignment' },
    { icon: '💳', text: 'Multiple payment methods supported' },
    { icon: '⭐', text: 'Rate your driver after each trip' },
  ];

  return (
    <div style={{ background: '#f0f4ff', minHeight: '100vh' }}>
      <Unav />
      <div className="container py-4">
        {/* Welcome Banner */}
        <div className="card border-0 text-white mb-4"
          style={{ background: 'linear-gradient(135deg, #1a1a2e, #0f3460)', borderRadius: '16px' }}>
          <div className="card-body p-4 d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div>
              <h3 className="fw-bold mb-1">Welcome back, {user?.name?.split(' ')[0]}! 👋</h3>
              <p className="mb-0 opacity-75">Where are you headed today?</p>
            </div>
            <div style={{ fontSize: '4rem' }}>🚗</div>
          </div>
        </div>

        {/* Quick Actions */}
        <h5 className="fw-bold mb-3 text-dark">Quick Actions</h5>
        <div className="row g-4 mb-4">
          {quickActions.map((action, i) => (
            <div className="col-md-6" key={i}>
              <Link to={action.to} className="text-decoration-none">
                <div className="card border-0 shadow-sm h-100 p-4" style={{ borderRadius: '16px', transition: 'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div className="d-flex align-items-center gap-3">
                    <div style={{ fontSize: '3rem', background: action.color + '22', borderRadius: '12px', padding: '10px' }}>
                      {action.icon}
                    </div>
                    <div>
                      <h5 className="fw-bold text-dark mb-1">{action.label}</h5>
                      <p className="text-muted mb-0 small">{action.desc}</p>
                    </div>
                    <i className="bi bi-chevron-right ms-auto text-muted"></i>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Cab Types Preview */}
        <h5 className="fw-bold mb-3 text-dark">Available Ride Types</h5>
        <div className="row g-3 mb-4">
          {[
            { type: 'Mini', icon: '🚗', price: '₹8/km', color: '#e8f5e9' },
            { type: 'Sedan', icon: '🚙', price: '₹12/km', color: '#e3f2fd' },
            { type: 'SUV', icon: '🛻', price: '₹18/km', color: '#fff3e0' },
            { type: 'Luxury', icon: '🏎️', price: '₹30/km', color: '#fce4ec' },
          ].map((c, i) => (
            <div className="col-6 col-md-3" key={i}>
              <div className="card border-0 text-center p-3" style={{ background: c.color, borderRadius: '12px' }}>
                <div style={{ fontSize: '2rem' }}>{c.icon}</div>
                <div className="fw-bold mt-1">{c.type}</div>
                <div className="text-muted small">{c.price}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <h5 className="fw-bold mb-3 text-dark">Ride Tips</h5>
        <div className="card border-0 shadow-sm p-3" style={{ borderRadius: '16px' }}>
          <div className="row g-2">
            {tips.map((tip, i) => (
              <div className="col-md-6" key={i}>
                <div className="d-flex align-items-center gap-2 p-2">
                  <span style={{ fontSize: '1.3rem' }}>{tip.icon}</span>
                  <span className="text-muted small">{tip.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
