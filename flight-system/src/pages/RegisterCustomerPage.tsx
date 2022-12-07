import "./RegisterCustomerPage.css";
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import { useState } from "react";
import axios from "axios";


function RegisterCustomerPage() {
    const location = useLocation();

    const { flight_number } = location.state;
    const navigate = useNavigate();

    interface Customer {"passport_number": string, 
    "phone": string, "email": string, "fname": string, "lname": string, 
    "credit_card_number": number, "credit_card_csc": number, "credit_card_expiry": string, "credit_card_name": string}

    const [customer, setCustomer] = useState<Customer>({
        passport_number: '',
        phone: '',
        email: '',
        fname: '',
        lname: '',
        credit_card_number: 0,
        credit_card_csc: 0,
        credit_card_expiry: '2022-12-06',
        credit_card_name: ''
    });

    //TODO: check post
    function handleSubmit(event:any) {
        event.preventDefault();
        axios.put("http://127.0.0.1:8000/createCustomer?passport_number="+ customer.passport_number + "&phone="+customer.phone +"&email="+customer.email+"&fname="+customer.fname +"&lname="+ customer.lname +"&credit_card_number=" +customer.credit_card_number + "&credit_card_csc="+customer.credit_card_csc+"&credit_card_expiry="+customer.credit_card_expiry +"&credit_card_name="+ customer.credit_card_name)
        navigate('/summary', { state: { passport: customer.passport_number, flight_number: flight_number } });
    }
    function handleChange(event: any) {
        const newCustomerData:any = { ...customer };
        newCustomerData[event.target.name as keyof typeof customer] = event.target.value;

        setCustomer(newCustomerData);

    }

    return <div className="registerPage">
        <Header showLogin={false} />
        <form className="registerForm">
            <label className="title">Register as a Customer</label>
            <div className="sameLine">
                <div className="stacked">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="fname"
                        placeholder="First Name"
                        required={true} 
                        value={customer.fname}
                onChange={handleChange}/>
                </div>
                <div className="stacked">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lname"
                        placeholder="Last Name"
                        required={true} 
                        value={customer.lname}
                onChange={handleChange}/>
                </div>
            </div>

            <label>Passport Number</label>
            <input
                type="text"
                name="passport_number"
                placeholder="Passport Number"
                required={true}
                value={customer.passport_number}
                onChange={handleChange} />
            <label>Phone Number</label>
            <input
                type="phone"
                name="phone"
                placeholder="Phone Number"
                required={true} 
                value={customer.phone}
                onChange={handleChange}/>
            <label>Email</label>
            <input
                type="email"
                name="email"
                placeholder="Email"
                required={true}
                value={customer.email}
                onChange={handleChange} />
            <label>Credit Card Number</label>
            <input
                type="text"
                name="credit_card_number"
                placeholder="Credit Card Number"
                required={true} 
                value={customer.credit_card_number}
                onChange={handleChange}/>
            <label>Name on Credit Card</label>
            <input
                type="text"
                name="credit_card_name"
                placeholder="Name on Credit Card"
                required={true} 
                value={customer.credit_card_name}
                onChange={handleChange}/>
            
            <div className="sameLine">
                <div className="stacked">
                <label>CSC</label>
            <input
                type="text"
                name="credit_card_csc"
                value={customer.credit_card_csc}
                placeholder="CSC"
                required={true} 
                onChange={handleChange}/>
                </div>
                <div className="stacked">
                    <label>Credit Card Expiry</label>
                    <input
                        type="date"
                        name="credit_card_expiry"
                        required={true}
                        value={customer.credit_card_expiry}
                        onChange={handleChange} />
                </div>
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </form>
    </div>

}

export default RegisterCustomerPage;