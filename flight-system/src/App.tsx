import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AdminPage from './pages/AdminPage';
import BookingLoginPage from './pages/BookingLogin';
import BookingSummaryPage from './pages/BookingSummaryPage';
import FlightPage from './pages/FlightPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterAdminPage from './pages/RegisterAdminPage';
import RegisterCustomerPage from './pages/RegisterCustomerPage';

function App() {
  return (<Router>
    <div className="App">
      <Routes>
        <Route path="admin" element={<AdminPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="loginCustomer" element={<BookingLoginPage/>}/>
        <Route path="summary" element={<BookingSummaryPage />} />
        <Route path="flights" element={<FlightPage />} />
        <Route path="register" element={<RegisterAdminPage/>}/>
        <Route path="registerCustomer" element={<RegisterCustomerPage/>}/>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
