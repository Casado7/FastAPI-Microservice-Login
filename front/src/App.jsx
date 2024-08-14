import { Toaster } from 'react-hot-toast';
import './App.css';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';
import { AuthProvider } from './auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/list_users");
    } else {
      navigate('/login');
    }
  }, [navigate, user]);

  return (
    <Routes key="main route">
      {PublicRoutes}
      {PrivateRoutes}
    </Routes>
  );
}

function AppWrapper() {
  return (
    <AuthProvider>
      <Router>
        <App />
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default AppWrapper;
