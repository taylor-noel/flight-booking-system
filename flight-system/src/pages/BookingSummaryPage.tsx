import './BookingSummaryPage.css';

function BookingSummaryPage(props: any) {

    //call to database get the customer
    const customer = {
        "passport_number": "HN431",
        "fname": "Jon",
        "lname": "Doe",
        "phone": "250-889-2241",
        "email": "jon.doe@outlook.com",
        "credit_card_name": "Jon Doe",
        "credit_card_expiry_month": "9",
        "credit_card_expiry_year": "2023",
        "credit_card_expiry_csc": "943"
    }

    const flight = {
        "flightNumber": "AC-123",
        "departure": "Calgary",
        "arrival": "Toronto",
        "departureDate": "2018-06-12T19:30",
        "arrivalDate": "2018-06-12T21:30",
        "airplaneModel": "123"
    }

    return <div className="summaryPage">
        <label className="summaryTitle">Booking Summary</label>
        <div className="summary">
            <form className="registerForm">
                <label className="title">Customer Information</label>
                <div className="sameLine">
                    <div className="stacked">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="fname"
                            placeholder={customer.fname}
                            required={true}
                            readOnly />
                    </div>
                    <div className="stacked">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lname"
                            placeholder={customer.lname}
                            required={true}
                            readOnly />
                    </div>
                </div>

                <label>Passport Number</label>
                <input
                    type="text"
                    name="passport_number"
                    placeholder={customer.passport_number}
                    required={true}
                    readOnly />
                <label>Phone Number</label>
                <input
                    type="phone"
                    name="phone"
                    placeholder={customer.phone}
                    required={true}
                    readOnly />
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder={customer.email}
                    required={true}
                    readOnly />
                <label>Credit Card Number</label>
                <input
                    type="text"
                    name="credit_card_number"
                    placeholder="Credit Card Number"
                    required={true}
                    readOnly />
                <label>Name on Credit Card</label>
                <input
                    type="text"
                    name="credit_card_name"
                    placeholder={customer.credit_card_name}
                    required={true}
                    readOnly />
                <label>CSC</label>
                <input
                    type="text"
                    name="credit_card_csc"
                    placeholder={customer.credit_card_expiry_csc}
                    required={true}
                    readOnly />
                <div className="sameLine">
                    <div className="stacked">
                        <label>Credit Card Expiry</label>
                        <input
                            type="number"
                            name="credit_card_expiry_month"
                            placeholder={customer.credit_card_expiry_month}
                            readOnly
                            required={true} />
                    </div>
                    <div className="stacked">
                        <input
                            type="number"
                            name="credit_card_expiry_year"
                            placeholder={customer.credit_card_expiry_year}
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
                    placeholder={flight.flightNumber}
                    readOnly />
                <label>Departure City</label>
                <input
                    type="text"
                    name="departure"
                    placeholder={flight.departure}
                    readOnly />
                <label>Destination City</label>
                <input
                    type="text"
                    name="arrival"
                    placeholder={flight.arrival}
                    readOnly />
                <label>Departure Date</label>
                <input
                    type="datetime-local"
                    name="departureDate"
                    value={flight.departureDate}
                    readOnly />
                <label>Arrival Date</label>
                <input
                    type="datetime-local"
                    name="arrivalDate"
                    value={flight.arrivalDate}
                    readOnly />
                <label>Airplane Model</label>
                <input
                    type="text"
                    name="airplaneModel"
                    placeholder={flight.airplaneModel}
                    readOnly />
            </form>
        </div>
        <button>Confirm</button>
    </div>
}
export default BookingSummaryPage;