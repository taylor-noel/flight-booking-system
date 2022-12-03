import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/Header';

function BookingLoginPage() {
    const [passport, setPassport] = useState({ value: '' });

    const navigate = useNavigate();

    function handlePassport(event: any) {
        setPassport({ value: event.target.value });
    }
    function handleLogin(event: any) {
        //TODO: authorize passport if there is no customer navigate to a different page
        if (passport.value === "taylor") {
            navigate('/summary');
        }
        else {
            navigate('/registerCustomer');
        }

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