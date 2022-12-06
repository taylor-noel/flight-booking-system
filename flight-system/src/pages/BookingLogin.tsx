import './LoginPage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';

function BookingLoginPage() {

    const location = useLocation();

    const { flight_number } = location.state;
    const [passport, setPassport] = useState({ value: '' });

    const navigate = useNavigate();

    function handlePassport(event: any) {
        event.preventDefault();
        setPassport({ value: event.target.value });
    }
    function handleLogin(event: any) {
        event.preventDefault();

        axios.get('http://127.0.0.1:8000/selectCustomer' + passport.value)
        .then(response => { 
            if (response.data != null) {

                navigate('/summary', {state: {passport:passport.value, flight_number:flight_number}});
            } else{
                navigate('/registerCustomer', {state: {passport:passport.value, flight_number:flight_number}});
            }
        });

    }

    return <div className="loginPage">
        <Header showLogin={false}/>
        <form className="loginForm">
            <label className="title">Login</label>
            <label>Passport Number</label>
            <input
                type="text"
                value={passport.value}
                placeholder="Enter Passport"
                onChange={handlePassport}
            />
            <button onClick={handleLogin}>Submit</button>
        </form>
    </div>
}
export default BookingLoginPage;