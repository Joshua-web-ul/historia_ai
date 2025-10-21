import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { login, logout } from './features/auth';
import Chat from './components/Chat';
import Timeline from './components/Timeline';
import ARTour from './components/ARTour';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import './App.css';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleLogin = (userData: any) => {
    dispatch(login(userData));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
        <Route 
          path="/chat" 
          element={isAuthenticated ? <Chat /> : <Auth onLogin={handleLogin} />} 
        />
        <Route 
          path="/timeline" 
          element={isAuthenticated ? <Timeline /> : <Auth onLogin={handleLogin} />} 
        />
        <Route 
          path="/ar-tour" 
          element={isAuthenticated ? <ARTour /> : <Auth onLogin={handleLogin} />} 
        />
      </Routes>
    </div>
  );
}

export default App;
