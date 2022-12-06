import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';

function LoginPage() {
    const [authorize, setAuthorize] = useState(false);
    const [email, setEmail] = useState({ value: '' });
    const [password, setPassword] = useState({ value: '' });

    const navigate = useNavigate();

    function handleEmail(event: any) {
        event.preventDefault();
        setEmail({ value: event.target.value });
    }
    function handlePassword(event: any) {
        event.preventDefault();

        setPassword({ value: event.target.value });
    }
    function handleLogin(event: any) {
        event.preventDefault();

        axios.get('http://127.0.0.1:8000/selectAdmin' + email.value)
        .then(response => { 
            if (response.data.password === password.value) {
                navigate('/admin', {state:{}});
            }
        });
       
        setAuthorize(true);

    }


    function handleRegister() {
        navigate('/register');
    }

    return <div className="loginPage">
        <Header showLogin={false} />
        <form className="loginForm" id="form" onSubmit={handleLogin}>
            <label className="title">Login</label>
            <label>Email Address</label>
            <input
                type="email"
                name="email"
                value={email.value}
                placeholder="Enter email"
                onChange={handleEmail}
            />
            <label>Password</label>
            <input
                type="password"
                name="password"
                value={password.value}
                placeholder="Enter password"
                onChange={handlePassword}
            />
            <button type="submit">Submit</button>
            <a className="link" onClick={handleRegister}>Create an account</a>
            {authorize ? <label>Error: incorrect credentials, please check your email and password.</label> : null}
        </form>
    </div>
}
export default LoginPage;