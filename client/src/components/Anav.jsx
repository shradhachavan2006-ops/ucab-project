import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Anav() {
  const { admin, logoutAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#0f3460' }}>
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold" to="/admin/home">
          <i className="bi bi-shield-fill text-warning me-2"></i>UCab Admin
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#adminNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="adminNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">
            <li className="nav-item"><Link className="nav-link" to="/admin/home"><i className="bi bi-speedometer2 me-1"></i>Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/admin/users"><i className="bi bi-people me-1"></i>Users</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/admin/bookings"><i className="bi bi-journal-check me-1"></i>Bookings</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/admin/cabs"><i className="bi bi-taxi-front me-1"></i>Cabs</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/admin/cabs/add"><i className="bi bi-plus-circle me-1"></i>Add Cab</Link></li>
            <li className="nav-item ms-2">
              <span className="navbar-text text-warning me-3">
                <i className="bi bi-person-badge me-1"></i>{admin?.name}
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
