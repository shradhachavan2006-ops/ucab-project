import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
      {/* Navbar */}
      <nav className="navbar navbar-dark px-4 py-3" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
        <span className="navbar-brand fw-bold fs-4">
          <i className="bi bi-car-front-fill text-warning me-2"></i>UCab
        </span>
        <div className="d-flex gap-2">
          <Link to="/login" className="btn btn-outline-light btn-sm">Login</Link>
          <Link to="/register" className="btn btn-warning btn-sm text-dark fw-bold">Sign Up</Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="container text-center text-white py-5">
        <div className="py-5">
          <div className="mb-4" style={{ fontSize: '5rem' }}>🚕</div>
          <h1 className="display-4 fw-bold mb-3">Ride with <span className="text-warning">UCab</span></h1>
          <p className="lead text-light opacity-75 mb-5 mx-auto" style={{ maxWidth: '500px' }}>
            Book a cab in seconds. Real-time tracking, secure payments, and comfortable rides — all in one place.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/register" className="btn btn-warning btn-lg fw-bold px-5 text-dark">
              <i className="bi bi-person-plus me-2"></i>Get Started Free
            </Link>
            <Link to="/admin/login" className="btn btn-outline-light btn-lg px-5">
              <i className="bi bi-shield-lock me-2"></i>Admin Portal
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="row g-4 mt-4">
          {[
            { icon: '⚡', title: 'Instant Booking', desc: 'Book your cab in under 30 seconds with our streamlined process.' },
            { icon: '📍', title: 'Live Tracking', desc: 'Track your driver in real-time from pickup to destination.' },
            { icon: '💳', title: 'Secure Payments', desc: 'Multiple payment options with end-to-end encryption.' },
            { icon: '⭐', title: 'Top Rated Drivers', desc: 'All our drivers are verified and highly rated for safety.' },
          ].map((f, i) => (
            <div className="col-md-3" key={i}>
              <div className="card h-100 border-0 text-center p-4"
                style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)', borderRadius: '16px' }}>
                <div style={{ fontSize: '2.5rem' }}>{f.icon}</div>
                <h5 className="text-white mt-3 fw-bold">{f.title}</h5>
                <p className="text-light opacity-75 small mb-0">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Cab Types */}
        <div className="mt-5 pt-3">
          <h2 className="text-white fw-bold mb-4">Choose Your Ride</h2>
          <div className="row g-3 justify-content-center">
            {[
              { type: 'Mini', icon: '🚗', price: 'From ₹80', desc: '4 seats · Economy' },
              { type: 'Sedan', icon: '🚙', price: 'From ₹120', desc: '4 seats · Comfort' },
              { type: 'SUV', icon: '🛻', price: 'From ₹180', desc: '6 seats · Spacious' },
              { type: 'Luxury', icon: '🏎️', price: 'From ₹300', desc: '4 seats · Premium' },
            ].map((c, i) => (
              <div className="col-6 col-md-3" key={i}>
                <div className="card border-0 text-center p-3"
                  style={{ background: 'rgba(255,193,7,0.1)', borderRadius: '12px', border: '1px solid rgba(255,193,7,0.3) !important' }}>
                  <div style={{ fontSize: '2rem' }}>{c.icon}</div>
                  <div className="text-warning fw-bold mt-1">{c.type}</div>
                  <div className="text-light small">{c.price}</div>
                  <div className="text-light opacity-50" style={{ fontSize: '0.75rem' }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-5 text-light opacity-50 small">© 2026 UCab · Built with MERN Stack</p>
      </div>
    </div>
  );
}
