import React from 'react';
import {
  Navigate, Route, Routes, useLocation,
} from 'react-router-dom';
import { Box } from '@mui/material';

import './App.css';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('fitnessAuth') === 'true';
  const hideLayout = location.pathname === '/login' || !isAuthenticated;

  return (
    <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/exercise/:id" element={isAuthenticated ? <ExerciseDetail /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />} />
      </Routes>
      {!hideLayout && <Footer />}
    </Box>
  );
};

export default App;
