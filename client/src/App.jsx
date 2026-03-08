import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AuthProvider, useAuth } from './context/AuthContext';

// Public
import Home from './pages/Home';

// User pages
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Uhome from './pages/user/Uhome';
import Cabs from './pages/user/Cabs';
import BookCab from './pages/user/BookCab';
import Mybookings from './pages/user/Mybookings';

// Admin pages
import Alogin from './pages/admin/Alogin';
import Aregister from './pages/admin/Aregister';
import Ahome from './pages/admin/Ahome';
import Users from './pages/admin/Users';
import UserEdit from './pages/admin/UserEdit';
import Bookings from './pages/admin/Bookings';
import Acabs from './pages/admin/Acabs';
import Acabedit from './pages/admin/Acabedit';
import Addcar from './pages/admin/Addcar';

const PrivateUserRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const PrivateAdminRoute = ({ children }) => {
  const { admin } = useAuth();
  return admin ? children : <Navigate to="/admin/login" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/uhome" element={<PrivateUserRoute><Uhome /></PrivateUserRoute>} />
      <Route path="/cabs" element={<PrivateUserRoute><Cabs /></PrivateUserRoute>} />
      <Route path="/bookcab/:id" element={<PrivateUserRoute><BookCab /></PrivateUserRoute>} />
      <Route path="/mybookings" element={<PrivateUserRoute><Mybookings /></PrivateUserRoute>} />

      <Route path="/admin/login" element={<Alogin />} />
      <Route path="/admin/register" element={<Aregister />} />
      <Route path="/admin/home" element={<PrivateAdminRoute><Ahome /></PrivateAdminRoute>} />
      <Route path="/admin/users" element={<PrivateAdminRoute><Users /></PrivateAdminRoute>} />
      <Route path="/admin/users/edit/:id" element={<PrivateAdminRoute><UserEdit /></PrivateAdminRoute>} />
      <Route path="/admin/bookings" element={<PrivateAdminRoute><Bookings /></PrivateAdminRoute>} />
      <Route path="/admin/cabs" element={<PrivateAdminRoute><Acabs /></PrivateAdminRoute>} />
      <Route path="/admin/cabs/edit/:id" element={<PrivateAdminRoute><Acabedit /></PrivateAdminRoute>} />
      <Route path="/admin/cabs/add" element={<PrivateAdminRoute><Addcar /></PrivateAdminRoute>} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
