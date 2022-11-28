import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function LoginPage() {
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
    function handleLogin(event: any) {
        //TODO: authorize credentials
        if (email.value === "taylor") {
            navigate('/admin');

        }
        else {
            setAuthorize(true);
        }

    }

    return <div className="loginPage">
        <form className="loginForm">
            <label className="title">Login</label>
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
            <button onClick={handleLogin}>Submit</button>
            {authorize ? <label>Error: incorrect credentials, please check your email and password.</label> : null}
        </form>
    </div>
}
export default LoginPage;