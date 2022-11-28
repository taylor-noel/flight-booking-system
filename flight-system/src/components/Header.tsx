import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    function handleLogin(){
        navigate('/login');
    }
    return (<div className="header">
        <label className="company">Alberta Air</label>
        <button className="login" onClick={handleLogin}>Login</button>
    </div>)
}

export default Header;