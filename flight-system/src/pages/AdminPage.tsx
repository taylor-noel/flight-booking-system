import './AdminPage.css';
import Select from 'react-select';
import { useState } from 'react';

//TODO: get all value for citites, flights, and airlines from database
const cities = ["calgary", "victoria", "toronto"];
const airlines = ["Air Canada", "West Jet"];
const airplaneModels = ["model1", "model2"];
const flights = [{
    "flightNumber": "AC123",
    "departure": "Calgary",
    "arrival": "Toronto",
    "departureTime": "2022-11-28 10:00:00",
    "arrivalTime": "2022-11-28 14:00:00",
    "airplaneModel": "123"
}];

function AdminPage() {
    
    const [formData, setFormData] = useState({
        airline: '',
        departure:'',
        arrival:'',
        departureDate:'',
        arrivalDate:'',
        airplaneModel:''
    })
    
    return <div>
        <h3>Flights</h3>
        <table>
            <thead>
                <th>Flight ID</th>
                <th>Departure City</th>
                <th>Arrival City</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>Airplane Model</th>
            </thead>
            <tbody>
                {flights.map((flight) => (
                    <tr>
                        <td>{flight.flightNumber}</td>
                        <td>{flight.departure}</td>
                        <td>{flight.arrival}</td>
                        <td>{flight.departureTime}</td>
                        <td>{flight.arrivalTime}</td>
                        <td>{flight.airplaneModel}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <h3>Add a Flight</h3>
        <form>
            <Select
                placeholder="Airline"
                options={airlines.map(t => ({ value: t, label: t }))}
                required={true} />
            <Select
                placeholder="Departure City"
                options={cities.map(t => ({ value: t, label: t }))}
                required={true} />
            <Select
                placeholder="Arrival City"
                options={cities.map(t => ({ value: t, label: t }))}
                required={true} />
            <input
                type="datetime-local"
                required={true} />
            <input
                type="datetime-local"
                required={true} />
            <Select
                placeholder="Airplane Model"
                options={airplaneModels.map(t => ({ value: t, label: t }))}
                required={true} />
            <button type="submit">Add</button>
        </form>
    </div>
}
export default AdminPage;