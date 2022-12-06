import { Fragment, useEffect, useState } from "react";
import Select from "react-select";
import EditableRow from "./EditableRow";
import ReadOnlyRow from "./ReadOnlyRow";
import './Table.css';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchForm from "./SearchForm";
import axios from "axios";



function FlightTable(props: any) {
    const location = useLocation();
            
    const { departure, arrival, date } = location.state;

    const [airports, setAirports] = useState<string[]>([]);
    const [airplane_ids, setAirplaneIds] = useState<string[]>([]);
    const [isNull, setIsNull] = useState(false);

    interface Flight {
        flight_number: string,
        departure_airport: string,
        arrival_airport: string,
        departure_time: string,
        arrival_time: string,
        airplane_id: string
    }

    const [flightData, setFlightData] = useState<Array<Flight>>([{
        airplane_id: "1",
        arrival_airport: "1",
        arrival_time: "2022-12-05T08:30:00",
        departure_airport: "2",
        departure_time : "2022-12-05T06:30:00",
        flight_number: "1"
    }]);
    const navigate = useNavigate();

    useEffect(() =>{
        if(props.admin){
            axios.get('http://127.0.0.1:8000/getFlights')
            .then(response => {
                setFlightData(response.data);
            });
        }else{
            axios.get('http://127.0.0.1:8000/getFlightsBySearch/departure='+ departure+'arrival='+ arrival +'date=' + date)
            .then(response => {
                if(response.data.length === 0){
                    setIsNull(true);
                }
                setFlightData(response.data);
            });

        }
        
        axios.get('http://127.0.0.1:8000/getAirportCities')
        .then(response => {
            const cities: string[] = []
            response.data.forEach((x: { [x: string]: any; }) =>{cities.push(x["city"])})
            setAirports(cities);
        });
        axios.get('http://127.0.0.1:8000/getAirplaneModels')
        .then(response => {
            const models: string[] = []
            response.data.forEach((x: { [x: string]: any; }) =>{models.push(x["name"] + "-" +x["model"])})
            setAirplaneIds(models);
        });
    }, []);
    

    const [formData, setFormData] = useState<Flight>({
        "flight_number": '',
        "departure_airport": '',
        "arrival_airport": '',
        "departure_time": '',
        "arrival_time": '',
        "airplane_id": ''
    });


    const [editFlightData, setEditFlightData] = useState<Flight>({
        "flight_number": '',
        "departure_airport": '',
        "arrival_airport": '',
        "departure_time": '',
        "arrival_time": '',
        "airplane_id": ''
    });


    const [editFlightNumber, setEditFlightNumber] = useState('');

    function handleEditClick(event: any, flight: any) {
        setEditFlightNumber(flight.flight_number);
        const splitted = flight.flight_number.split("-", 2);

        const editFlight = {
            "flight_number": splitted[1],
            "departure_airport": flight.departure_airport,
            "arrival_airport": flight.arrival_airport,
            "departure_time": flight.departure_time,
            "arrival_time": flight.arrival_time,
            "airplane_id": flight.airplane_id
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

    //TODO: CHECK - not working yet
    function handleDeleteClick(event: any, flight: any) {
        axios.delete("http://127.0.0.1:8000/deleteFlight/"+ flight.flight_number)
    }

    
    //TODO: CHECK - not working yet
    function handleSaveFlight(event: any) {
        const editedFlight = {
            "flight_number": editFlightData.flight_number,
            "departure_airport": editFlightData.departure_airport,
            "arrival_airport": editFlightData.arrival_airport,
            "departure_time": editFlightData.departure_time,
            "arrival_time": editFlightData.arrival_time,
            "airplane_id": editFlightData.airplane_id
        }
        const newFlightData = [...flightData];
        const index = flightData.findIndex((flight) => flight.flight_number === editFlightNumber);
        newFlightData[index] = editedFlight;

        setFlightData(newFlightData);
        setEditFlightNumber('');
    }


    
    //TODO: CHECK - not working yet
    function handleForm(event: any) {
        const splitted = formData.airplane_id.split("-", 2);

        const flight_number = splitted[0] + "-1";
        const newFlight = {
            "flight_number": flight_number,
            "departure_airport": formData.departure_airport,
            "arrival_airport": formData.arrival_airport,
            "departure_time": formData.departure_time,
            "arrival_time": formData.arrival_time,
            "airplane_model": splitted[1],
            "airline_carrier": splitted[0]
        }

        axios.post("http://127.0.0.1:8000/createFlight", newFlight);
        // const newFlightData = [...flightData];
        // newFlightData.push(newFlight);
        // setFlightData(newFlightData);
        setFormData({
            "flight_number": '',
            "departure_airport": '',
            "arrival_airport": '',
            "departure_time": '',
            "arrival_time": '',
            "airplane_id": ''
        })
    }

    function handleBookClick(event: any, flight: any) {
        navigate('/loginCustomer', {state:{flight_number: flight.flight_number}});
    }

    //TODO: CHECK - not working yet
    function handleDepartFilter() {
        //TODO: call to the database
    }

    //TODO: CHECK - not working yet
    function handleArriveFilter() {
        //TODO: call to the database
    }
    return <div>
        <h3>Flights</h3>
{props.admin ? null :
            <div className="filterDiv">
                <label className="filter">
                    Depart After
                    <input type="time"
                        onChange={handleDepartFilter} />
                </label>
                <label className="filter">
                    Arrive Before
                    <input type="time"
                        onChange={handleArriveFilter} />
                </label>
            </div>
        }
{isNull? <label>No Flights Match Your Search</label> :
        <table className="table">
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
                        {editFlightNumber === flight.flight_number ?
                            <EditableRow
                                editFlightData={editFlightData}
                                handleEditFlightChange={handleEditFlightChange}
                                handleSaveFlight={handleSaveFlight}
                                handleCancelFlight={handleCancelFlight}
                                admin={props.admin} />
                            :
                            <ReadOnlyRow
                                flight={flight}
                                handleEditClick={handleEditClick}
                                handleDeleteClick={handleDeleteClick}
                                admin={props.admin}
                                handleBookClick={handleBookClick} />
                        }
                    </Fragment>
                ))}
            </tbody>
        </table>}
        {props.admin ?
            <div>
                <h3>Add a Flight</h3>
                <form className="addForm" onSubmit={handleForm}>
                    <div className="formItem">
                        <label>Departure City</label>
                        <Select
                            name="departure_airport"
                            placeholder="Departure City"
                            options={airports.map(t => ({ value: 'departure_airport', label: t }))}
                            required={true}
                            onChange={handleChange} />
                    </div>
                    <div className="formItem">
                        <label>Arrival City</label>
                        <Select
                            name="arrival_airport"
                            placeholder="Arrival City"
                            options={airports.map(t => ({ value: 'arrival_airport', label: t }))}
                            required={true}
                            onChange={handleChange} />
                    </div>
                    <div className="formItem">
                        <label>Departure Date</label>
                        <input
                            name="departure_time"
                            type="datetime-local"
                            required={true}
                            onChange={handleDateChange} />
                    </div>
                    <div className="formItem">
                        <label>Arrival Date</label>
                        <input
                            name="arrival_time"
                            type="datetime-local"
                            required={true}
                            onChange={handleDateChange} />
                    </div>
                    <div className="formItem">
                        <label>Airplane Model</label>
                        <Select
                            name="airplane_id"
                            placeholder="Airplane Model"
                            options={airplane_ids.map(t => ({ value: 'airplane_id', label: t }))}
                            required={true}
                            onChange={handleChange} />
                    </div>
                    <button type="submit">Add</button>
                </form>
            </div>
            :
            null
        }

    </div>
}

export default FlightTable;