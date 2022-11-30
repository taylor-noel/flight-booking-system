import "./RegisterCustomerPage.css";
import { useNavigate } from 'react-router-dom';


function RegisterCustomerPage() {
    const navigate = useNavigate();

    function handleSubmit(){
        navigate('/summary');
    }

    return <div className="registerPage">
        <form className="registerForm">
            <label className="title">Register as a Customer</label>
            <div className="sameLine">
                <div className="stacked">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="fname"
                        placeholder="First Name" 
                        required={true}/>
                </div>
                <div className="stacked">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lname"
                        placeholder="Last Name"                         
                        required={true}/>
                </div>
            </div>

            <label>Passport Number</label>
            <input
                type="text"
                name="passport_number"
                placeholder="Passport Number" 
                required={true}/>
            <label>Phone Number</label>
            <input
                type="phone"
                name="phone"
                placeholder="Phone Number" 
                required={true}/>
            <label>Email</label>
            <input
                type="email"
                name="email"
                placeholder="Email" 
                required={true}/>
            <label>Credit Card Number</label>
            <input
                type="text"
                name="credit_card_number"
                placeholder="Credit Card Number" 
                required={true}/>
            <label>Name on Credit Card</label>
            <input
                type="text"
                name="credit_card_name"
                placeholder="Name on Credit Card" 
                required={true}/>
            <label>CSC</label>
            <input
                type="text"
                name="credit_card_csc"
                placeholder="CSC" 
                required={true}/>
            <div className="sameLine">
                <div className="stacked">
                    <label>Credit Card Expiry</label>
                    <input
                        type="number"
                        name="credit_card_expiry_month"
                        placeholder="Month"
                        min="1"
                        max="12" 
                        required={true}/>
                </div>
                <div className="stacked">
                    <input
                        type="number"
                        name="credit_card_expiry_year"
                        placeholder="Year" 
                        required={true}/>
                </div>
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </form>
    </div>

}

export default RegisterCustomerPage;