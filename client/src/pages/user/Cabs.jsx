import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Unav from '../../components/Unav';
import API from '../../api';

export default function Cabs() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  const types = ['All', 'Mini', 'Sedan', 'SUV', 'Luxury', 'XL'];

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const params = filter !== 'All' ? { cabType: filter } : {};
        const { data } = await API.get('/cars', { params });
        setCars(data.cars);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [filter]);

  const cabIcons = { Mini: '🚗', Sedan: '🚙', SUV: '🛻', Luxury: '🏎️', XL: '🚐' };

  return (
    <div style={{ background: '#f0f4ff', minHeight: '100vh' }}>
      <Unav />
      <div className="container py-4">
        <h4 className="fw-bold mb-1">Available Cabs</h4>
        <p className="text-muted mb-4">Select a cab to book your ride</p>

        {/* Filters */}
        <div className="d-flex gap-2 flex-wrap mb-4">
          {types.map((t) => (
            <button key={t}
              className={`btn btn-sm ${filter === t ? 'btn-warning text-dark fw-bold' : 'btn-outline-secondary'}`}
              onClick={() => { setFilter(t); setLoading(true); }}>
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" style={{ width: '3rem', height: '3rem' }}></div>
            <p className="mt-3 text-muted">Loading cabs...</p>
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: '4rem' }}>🚫</div>
            <h5 className="mt-3 text-muted">No cabs available for this type</h5>
            <button className="btn btn-warning mt-3" onClick={() => setFilter('All')}>Show All</button>
          </div>
        ) : (
          <div className="row g-4">
            {cars.map((car) => (
              <div className="col-md-4 col-lg-3" key={car._id}>
                <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                  {car.image ? (
                    <img src={`/uploads/${car.image}`} alt={car.name}
                      style={{ height: '160px', objectFit: 'cover', width: '100%' }} />
                  ) : (
                    <div className="d-flex align-items-center justify-content-center"
                      style={{ height: '160px', background: '#f8f9fa', fontSize: '4rem' }}>
                      {cabIcons[car.cabType] || '🚗'}
                    </div>
                  )}
                  <div className="card-body p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h6 className="fw-bold mb-0">{car.name}</h6>
                        <small className="text-muted">{car.model}</small>
                      </div>
                      <span className={`badge ${car.isAvailable ? 'bg-success' : 'bg-danger'}`}>
                        {car.isAvailable ? 'Available' : 'Busy'}
                      </span>
                    </div>

                    <div className="d-flex gap-2 mb-2 flex-wrap">
                      <span className="badge bg-warning text-dark">{car.cabType}</span>
                      <span className="badge bg-light text-dark border">
                        <i className="bi bi-people me-1"></i>{car.seats} seats
                      </span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="text-muted small"><i className="bi bi-currency-rupee"></i>{car.pricePerKm}/km</span>
                      <span className="text-warning small">
                        <i className="bi bi-star-fill me-1"></i>{car.rating}
                      </span>
                    </div>

                    {car.driverName && (
                      <div className="text-muted small mb-2">
                        <i className="bi bi-person-circle me-1"></i>{car.driverName}
                      </div>
                    )}

                    <Link to={`/bookcab/${car._id}`}
                      className={`btn w-100 fw-bold ${car.isAvailable ? 'btn-warning text-dark' : 'btn-secondary'}`}
                      style={{ pointerEvents: car.isAvailable ? 'auto' : 'none' }}>
                      {car.isAvailable ? 'Book Now' : 'Unavailable'}
                    </Link>
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
