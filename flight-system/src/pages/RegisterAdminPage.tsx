import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/Header';

function RegisterAdminPage() {
    const [authorize, setAuthorize] = useState(false);
    const [email, setEmail] = useState({ value: '' });
    const [password, setPassword] = useState({ value: '' });

    const navigate = useNavigate();

    function handleEmail(event: any) {
        setEmail({ value: event.target.value });
    }
    function handlePassword(event: any) {
        setPassword({ value: event.target.value });
    }
    function handleSubmit(event: any) {
        //TODO: Check if there is a record with that email
        if (email.value === "taylor") {
            setAuthorize(true);
        }
        else {
            //TODO: write to database
            
        }
        navigate('/login');

    }

    return <div className="loginPage">
        <Header showLogin={false}/>
        <form className="loginForm">
            <label className="title">Register as an Admin</label>
            <label>Email Address</label>
            <input
                type="email"
                value={email.value}
                placeholder="Enter email"
                onChange={handleEmail}
            />
            <label>Password</label>
            <input
                type="password"
                value={password.value}
                placeholder="Enter password"
                onChange={handlePassword}
            />
            <button onClick={handleSubmit}>Submit</button>
            {authorize ? <label>Error: There is already an account with that email.</label> : null}
        </form>
    </div>
}
export default RegisterAdminPage;