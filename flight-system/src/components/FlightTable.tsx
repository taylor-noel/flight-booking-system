import { Fragment, useState } from "react";
import Select from "react-select";
import EditableRow from "./EditableRow";
import ReadOnlyRow from "./ReadOnlyRow";
import './FlightTable.css';
import { useNavigate } from 'react-router-dom';



function FlightTable(props:any) {

    //TODO: get all value for citites, flights, and airlines from database
    const cities = ["calgary", "victoria", "toronto"];
    const airlines = ["Air Canada", "West Jet"];
    const airplaneModels = ["model1", "model2"];
    const navigate = useNavigate();

    interface Flight {
        airline: string
        flightNumber: string,
        departure: string,
        arrival: string,
        departureDate: string,
        arrivalDate: string,
        airplaneModel: string
    }

    const [formData, setFormData] = useState<Flight>({
        "airline": '',
        "flightNumber": '',
        "departure": '',
        "arrival": '',
        "departureDate": '',
        "arrivalDate": '',
        "airplaneModel": ''
    });


    const [editFlightData, setEditFlightData] = useState<Flight>({
        "airline": '',
        "flightNumber": '',
        "departure": '',
        "arrival": '',
        "departureDate": '',
        "arrivalDate": '',
        "airplaneModel": ''
    });

    const [flightData, setFlightData] = useState([{
        "flightNumber": "AC-123",
        "departure": "Calgary",
        "arrival": "Toronto",
        "departureDate": "2022-11-28 10:00:00",
        "arrivalDate": "2022-11-28 14:00:00",
        "airplaneModel": "123"
    },
    {
        "flightNumber": "AC-124",
        "departure": "Calgary",
        "arrival": "Victoria",
        "departureDate": "2022-11-28 10:00:00",
        "arrivalDate": "2022-11-28 12:00:00",
        "airplaneModel": "123"
    }]);

    const [editFlightNumber, setEditFlightNumber] = useState('');

    function handleEditClick(event: any, flight: any) {
        setEditFlightNumber(flight.flightNumber);
        const splitted = flight.flightNumber.split("-", 2);

        const editFlight = {
            "airline": splitted[0],
            "flightNumber": splitted[1],
            "departure": flight.departure,
            "arrival": flight.arrival,
            "departureDate": flight.departureDate,
            "arrivalDate": flight.arrivalDate,
            "airplaneModel": flight.airplaneModel
        };

        setEditFlightData(editFlight);
    }

    function handleEditFlightChange(event: any) {
        const newFlightData = { ...editFlightData };
        newFlightData[event.target.name as keyof typeof editFlightData] = event.target.value;

        setEditFlightData(newFlightData);

    }

    function handleChange(options: any) {
        const newFormData = { ...formData };
        newFormData[options.value as keyof typeof newFormData] = options.label;

        setFormData(newFormData);
    }

    function handleDateChange(event: any) {
        const newFormData = { ...formData };
        newFormData[event.target.name as keyof typeof formData] = event.target.value;

        setFormData(newFormData);
    }

    function handleCancelFlight() {
        setEditFlightNumber('');
    }

    function handleDeleteClick(event: any, flight: any) {
        const newFlights = [...flightData];
        const index = flightData.findIndex((flight) => flight.flightNumber === editFlightNumber);

        newFlights.splice(index, 1);
        setFlightData(newFlights);
    }

    function handleSaveFlight(event: any) {
        const flightNumber = editFlightData.airline + "-1";
        const editedFlight = {
            "flightNumber": flightNumber,
            "departure": editFlightData.departure,
            "arrival": editFlightData.arrival,
            "departureDate": editFlightData.departureDate,
            "arrivalDate": editFlightData.arrivalDate,
            "airplaneModel": editFlightData.airplaneModel
        }
        const newFlightData = [...flightData];
        const index = flightData.findIndex((flight) => flight.flightNumber === editFlightNumber);
        newFlightData[index] = editedFlight;

        setFlightData(newFlightData);
        setEditFlightNumber('');
    }


    // TODO: update to push formdata to database
    function handleForm(event: any) {
        const flightNumber = formData.airline + "-1";
        const newFlight = {
            "flightNumber": flightNumber,
            "departure": formData.departure,
            "arrival": formData.arrival,
            "departureDate": formData.departureDate,
            "arrivalDate": formData.arrivalDate,
            "airplaneModel": formData.airplaneModel
        }

        const newFlightData = [...flightData];
        newFlightData.push(newFlight);
        setFlightData(newFlightData);
        setFormData({
            "airline": '',
            "flightNumber": '',
            "departure": '',
            "arrival": '',
            "departureDate": '',
            "arrivalDate": '',
            "airplaneModel": ''
        })
    }

    function handleBookClick(event:any, flight:any){
        navigate('/loginCustomer');
    }


    return <div>
        <h3>Flights</h3>
        <table className="flightTable">
            <thead>
                <tr>
                    <th>Flight ID</th>
                    <th>Departure City</th>
                    <th>Arrival City</th>
                    <th>Departure Time</th>
                    <th>Arrival Time</th>
                    <th>Airplane Model</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {flightData.map((flight) => (
                    <Fragment>
                        {editFlightNumber === flight.flightNumber ?
                            <EditableRow
                                editFlightData={editFlightData}
                                handleEditFlightChange={handleEditFlightChange}
                                handleSaveFlight={handleSaveFlight}
                                handleCancelFlight={handleCancelFlight} 
                                admin={props.admin}/>
                            :
                            <ReadOnlyRow
                                flight={flight}
                                handleEditClick={handleEditClick}
                                handleDeleteClick={handleDeleteClick} 
                                admin={props.admin}
                                handleBookClick={handleBookClick}/>
                        }
                    </Fragment>
                ))}
            </tbody>
        </table>
        {props.admin ? 
        <div>
        <h3>Add a Flight</h3>
        <form className="addFlight" onSubmit={handleForm}>
            <Select
                placeholder="Airline"
                options={airlines.map(t => ({ value: 'airline', label: t }))}
                required={true}
                onChange={handleChange} />

            <Select
                name="departure"
                placeholder="Departure City"
                options={cities.map(t => ({ value: 'departure', label: t }))}
                required={true}
                onChange={handleChange} />

            <Select
                name="arrival"
                placeholder="Arrival City"
                options={cities.map(t => ({ value: 'arrival', label: t }))}
                required={true}
                onChange={handleChange} />

            <input
                name="departureDate"
                type="datetime-local"
                required={true}
                onChange={handleDateChange} />

            <input
                name="arrivalDate"
                type="datetime-local"
                required={true}
                onChange={handleDateChange} />

            <Select
                name="airplaneModel"
                placeholder="Airplane Model"
                options={airplaneModels.map(t => ({ value: 'airplaneModel', label: t }))}
                required={true}
                onChange={handleChange} />
            <button type="submit">Add</button>
        </form>
        </div>
        :
        null
    }
        

    </div>
}

export default FlightTable;