import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Unav() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#1a1a2e' }}>
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/uhome">
          <i className="bi bi-car-front-fill text-warning me-2"></i>UCab
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#userNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="userNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">
            <li className="nav-item"><Link className="nav-link" to="/uhome"><i className="bi bi-house me-1"></i>Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/cabs"><i className="bi bi-taxi-front me-1"></i>Book Cab</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/mybookings"><i className="bi bi-clock-history me-1"></i>My Bookings</Link></li>
            <li className="nav-item ms-2">
              <span className="navbar-text text-warning me-3">
                <i className="bi bi-person-circle me-1"></i>{user?.name}
              </span>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-warning btn-sm" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1"></i>Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
