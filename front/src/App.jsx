import { Toaster } from 'react-hot-toast';
import './App.css';
import { BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import publicRoutes from './routes/PublicRoutes';
import { AuthProvider } from './auth/AuthContext';

function App() {

  return (
    <>
    <AuthProvider>
    <Router>
      <Routes key="main route">
        {publicRoutes}

      </Routes>
    </Router>
    <Toaster />
    </AuthProvider>
  </>
  );
}

export default App;
