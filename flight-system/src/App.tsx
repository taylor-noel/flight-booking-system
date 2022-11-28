import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AdminPage from './pages/AdminPage';
import BookingPage from './pages/BookingPage';
import FlightPage from './pages/FlightPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (<Router>
    <div className="App">
      <Routes>
        <Route path="admin" element={<AdminPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="booking" element={<BookingPage />} />
        <Route path="/flights" element={<FlightPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
