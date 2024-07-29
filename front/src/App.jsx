import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import './App.css';
import { urls } from './constants/urls';
import { BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import publicRoutes from './routes/PublicRoutes';


function App() {

  return (
    <>
    <Router>
      <Routes key="main route">
        {publicRoutes}

      </Routes>
    </Router>
    <Toaster />
  </>
  );
}

export default App;
