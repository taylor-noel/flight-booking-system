import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './BookingSummaryPage.css';

function BookingSummaryPage() {
    const location = useLocation();

    const { passport, flight_number } = location.state;

    const navigate = useNavigate();

    const [customer, setCustomer] = useState({
        "passport_number": "test",
        "fname": "jon",
        "lname": "doe",
        "phone": "test",
        "email": "test",
        "credit_card_name": "test",
        'credit_card_expiry_date': '2022-12-06',
        "credit_card_csc": 0,
        "credit_card_number": 0
    });

    const [flight, setFlight] = useState({
        "flight_number": '',
            "departure_airport": '',
            "arrival_airport": '',
            "departure_time": '',
            "arrival_time": '',
            "airplane_id": ''
    });

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/selectCustomer' + passport)
            .then(response => {
                console.log(response.data)

                setCustomer(response.data)
            });
            
        axios.get('http://127.0.0.1:8000/selectFlight' + flight_number)
        .then(response => {
            console.log(response.data)

            setFlight(response.data);
        });
    }, [])

    function handleConfirm(event:any){
        event.preventDefault();
        const id = Math.floor(Math.random()*1000)
        axios.put('http://127.0.0.1:8000/createFlightBooked?boarding_id=' + id + '&flight_number=' +flight_number + '&passport_number=' + passport)
        navigate("/confirmation");
    }

    return <div>
        <Header showLogin={false} />
        <h3>Booking Summary</h3>
        <div className="summary">
            <form className="registerForm">
                <label className="title">Customer Information</label>
                <div className="sameLine">
                    <div className="stacked">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="fname"
                            value={customer ? customer.fname : ""}
                            required={true}
                            readOnly />
                    </div>
                    <div className="stacked">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lname"
                            value={customer ? customer.lname : ""}
                            required={true}
                            readOnly />
                    </div>
                </div>

                <label>Passport Number</label>
                <input
                    type="text"
                    name="passport_number"
                    value={customer ? customer.passport_number : ""}
                    required={true}
                    readOnly />
                <label>Phone Number</label>
                <input
                    type="phone"
                    name="phone"
                    value={customer ? customer.phone : ""}
                    required={true}
                    readOnly />
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={customer ? customer.email : ""}
                    required={true}
                    readOnly />
                <label>Credit Card Number</label>
                <input
                    type="text"
                    name="credit_card_number"
                    value={customer ? customer.credit_card_number.toString() : ""}
                    required={true}
                    readOnly />
                <label>Name on Credit Card</label>
                <input
                    type="text"
                    name="credit_card_name"
                    value={customer ? customer.credit_card_name : ""}
                    required={true}
                    readOnly />

                <div className="sameLine">
                    <div className="stacked">
                        <label>CSC</label>
                        <input
                            type="text"
                            name="credit_card_csc"
                            value={customer ? customer.credit_card_csc.toString() : ""}
                            required={true}
                            readOnly />
                    </div>
                    <div className="stacked">
                        <label>Expiry Date</label>
                        <input
                            type="date"
                            name="credit_card_expiry_date"
                            value={customer ? customer.credit_card_expiry_date : ""}
                            readOnly
                            required={true} />
                    </div>
                </div>
            </form>
            <form className="registerForm">
                <label className="title">Flight Information</label>
                <label>Flight Number</label>
                <input
                    type="text"
                    name="flightNumber"
                    value={flight.flight_number}
                    readOnly />
                <label>Departure City</label>
                <input
                    type="text"
                    name="departure"
                    value={flight.departure_airport}
                    readOnly />
                <label>Destination City</label>
                <input
                    type="text"
                    name="arrival"
                    value={flight.arrival_airport}
                    readOnly />
                <label>Departure Date</label>
                <input
                    type="datetime-local"
                    name="departureDate"
                    value={flight.departure_time}
                    readOnly />
                <label>Arrival Date</label>
                <input
                    type="datetime-local"
                    name="arrivalDate"
                    value={flight.arrival_time}
                    readOnly />
                <label>Airplane Model</label>
                <input
                    type="text"
                    name="airplaneModel"
                    value={flight.airplane_id}
                    readOnly />
            </form>
        </div>
        <button onClick={handleConfirm}>Confirm</button>
    </div>
}
export default BookingSummaryPage;