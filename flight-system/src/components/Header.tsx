import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { faCanadianMapleLeaf } from "@fortawesome/free-brands-svg-icons";


function Header(props: any) {
    const navigate = useNavigate();

    function handleLogin(){
        navigate('/login');
    }
    return (<div className="header">        
        <div className="company">
        <FontAwesomeIcon icon={faCanadianMapleLeaf} />
        <label>ALBERTA AIR</label>
            </div>
        {props.showLogin ? <button className="login" onClick={handleLogin}>Login</button> : null}
    </div>)
}

export default Header;

