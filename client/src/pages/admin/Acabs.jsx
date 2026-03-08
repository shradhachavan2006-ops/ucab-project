import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Anav from '../../components/Anav';
import API from '../../api';

export default function Acabs() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    try {
      const { data } = await API.get('/cars');
      setCars(data.cars);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCars(); }, []);

  const deleteCar = async (id) => {
    if (!confirm('Delete this cab? This cannot be undone.')) return;
    try {
      await API.delete(`/cars/${id}`);
      fetchCars();
    } catch (err) {
      alert('Delete failed.');
    }
  };

  const cabIcons = { Mini: '🚗', Sedan: '🚙', SUV: '🛻', Luxury: '🏎️', XL: '🚐' };

  return (
    <div style={{ background: '#f0f4ff', minHeight: '100vh' }}>
      <Anav />
      <div className="container-fluid px-4 py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4 className="fw-bold mb-0">Manage Cabs</h4>
            <p className="text-muted mb-0">{cars.length} cabs in fleet</p>
          </div>
          <Link to="/admin/cabs/add" className="btn btn-warning fw-bold text-dark">
            <i className="bi bi-plus-lg me-2"></i>Add Cab
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-5"><div className="spinner-border text-warning"></div></div>
        ) : cars.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: '4rem' }}>🚗</div>
            <h5 className="mt-3 text-muted">No cabs yet</h5>
            <Link to="/admin/cabs/add" className="btn btn-warning mt-3">Add First Cab</Link>
          </div>
        ) : (
          <div className="row g-4">
            {cars.map(car => (
              <div className="col-md-4 col-lg-3" key={car._id}>
                <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                  {car.image ? (
                    <img src={`/uploads/${car.image}`} alt={car.name}
                      style={{ height: '150px', objectFit: 'cover', width: '100%' }} />
                  ) : (
                    <div className="d-flex align-items-center justify-content-center"
                      style={{ height: '150px', background: '#f8f9fa', fontSize: '4rem' }}>
                      {cabIcons[car.cabType] || '🚗'}
                    </div>
                  )}
                  <div className="card-body p-3">
                    <div className="fw-bold">{car.name}</div>
                    <div className="text-muted small mb-2">{car.model} · {car.plateNumber}</div>
                    <div className="d-flex gap-1 mb-2 flex-wrap">
                      <span className="badge bg-warning text-dark">{car.cabType}</span>
                      <span className={`badge bg-${car.isAvailable ? 'success' : 'danger'}`}>
                        {car.isAvailable ? 'Available' : 'Busy'}
                      </span>
                    </div>
                    <div className="small text-muted mb-1">
                      <i className="bi bi-currency-rupee"></i>{car.pricePerKm}/km · {car.seats} seats
                    </div>
                    {car.driverName && (
                      <div className="small text-muted mb-2">
                        <i className="bi bi-person me-1"></i>{car.driverName}
                      </div>
                    )}
                    <div className="d-flex gap-2 mt-3">
                      <Link to={`/admin/cabs/edit/${car._id}`} className="btn btn-sm btn-outline-primary flex-grow-1">
                        <i className="bi bi-pencil me-1"></i>Edit
                      </Link>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => deleteCar(car._id)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
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
