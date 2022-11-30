import { Fragment, useState } from "react";
import Select from "react-select";
import EditableRow from "./EditableRow";
import ReadOnlyRow from "./ReadOnlyRow";
import ReadOnlyRowAirplane from "./ReadOnlyRowAirplane";
import './FlightTable.css';

function AirplaneTable(props: any) {

    //TODO: get all value for citites, airplanes, and airlines from database
    const carriers = ["Air Canada", "West Jet"];

    interface Airplane {
        "id": string,
        "model": string,
        "rows": string,
        "seats_per_row": string,
        "carrier_name": string
    }

    const [formData, setFormData] = useState<Airplane>({
        "id": '',
        "model": '',
        "rows": '',
        "seats_per_row": '',
        "carrier_name": ''
    });


    const [editAirplaneData, setEditAirplaneData] = useState<Airplane>({
        "id": '',
        "model": '',
        "rows": '',
        "seats_per_row": '',
        "carrier_name": ''
    });

    const [airplaneData, setAirplaneData] = useState([{
        "id": '1',
        "model": "model1",
        "rows": '10',
        "seats_per_row": '4',
        "carrier_name": 'Air Canada'
    }]);

    const [editAirplaneNumber, setEditAirplaneNumber] = useState('');

    function handleEditClick(event: any, airplane: any) {
        setEditAirplaneNumber(airplane.id);

        setEditAirplaneData(airplane);
    }

    function handleEditAirplaneChange(event: any) {
        const newAirplaneData = { ...editAirplaneData };
        newAirplaneData[event.target.name as keyof typeof editAirplaneData] = event.target.value;

        setEditAirplaneData(newAirplaneData);

    }

    function handleChange(event: any) {
        const newFormData = { ...formData };
        newFormData[event.target.name as keyof typeof formData] = event.target.value;

        setFormData(newFormData);
    }

    function handleDateChange(event: any) {
        const newFormData = { ...formData };
        newFormData[event.target.name as keyof typeof formData] = event.target.value;

        setFormData(newFormData);
    }

    function handleCancelAirplane() {
        setEditAirplaneNumber('');
    }

    function handleDeleteClick(event: any, airplane: any) {
        const newAirplanes = [...airplaneData];
        const index = airplaneData.findIndex((airplane) => airplane.id === editAirplaneNumber);

        newAirplanes.splice(index, 1);
        setAirplaneData(newAirplanes);
    }

    function handleSaveAirplane(event: any) {
        // const airplaneNumber = editAirplaneData.airline + "-1";
        const editedAirplane = {
            id: editAirplaneData.id,
            model: editAirplaneData.model,
            rows: editAirplaneData.rows,
            seats_per_row: editAirplaneData.seats_per_row,
            carrier_name: editAirplaneData.carrier_name
        }
        const newAirplaneData = [...airplaneData];
        const index = airplaneData.findIndex((airplane) => airplane.id === editAirplaneNumber);
        newAirplaneData[index] = editedAirplane;

        setAirplaneData(newAirplaneData);
        setEditAirplaneNumber('');
    }


    // TODO: update to push formdata to database
    function handleForm(event: any) {
        // const airplaneNumber = formData.airline + "-1";
        const newAirplane = {
            id: formData.id,
            model: formData.model,
            rows: formData.rows,
            seats_per_row: formData.seats_per_row,
            carrier_name: formData.carrier_name
        }

        const newAirplaneData = [...airplaneData];
        newAirplaneData.push(newAirplane);
        setAirplaneData(newAirplaneData);
        setFormData({
            id: '',
            model: '',
            rows: '',
            seats_per_row: '',
            carrier_name: ''
        })
    }

    return <div>
        <h3>Airplanes</h3>
        <table className="flightTable">
            <thead>
                <tr>
                    <th>Airplane ID</th>
                    <th>Model</th>
                    <th>Number of Rows</th>
                    <th>Number of Seats Per Row</th>
                    <th>Airline Carrier</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {airplaneData.map((airplane) => (
                    <Fragment>
                        {editAirplaneNumber === airplane.id ?
                            <EditableRow
                                editFlightData={editAirplaneData}
                                handleEditFlightChange={handleEditAirplaneChange}
                                handleSaveFlight={handleSaveAirplane}
                                handleCancelFlight={handleCancelAirplane}
                                admin={props.admin}
                            />
                            :
                            <ReadOnlyRowAirplane
                                airplane={airplane}
                                handleEditClick={handleEditClick}
                                handleDeleteClick={handleDeleteClick}
                                admin={props.admin} />
                        }
                    </Fragment>
                ))}
            </tbody>
        </table>
        <h3>Add a Airplane</h3>
        <form className="addFlight" onSubmit={handleForm}>
            <input
                name="model"
                placeholder="Model"
                type="text"
                required={true}
                onChange={handleChange}
            />

            <input
                name="rows"
                type="number"
                required={true}
                onChange={handleChange}
            />

            <input
                name="seats_per_row"
                type="number"
                required={true}
                onChange={handleChange}
            />

            <Select
                name="carrier"
                placeholder="Carrier"
                options={carriers.map(t => ({ value: 'carrier_name', label: t }))}
                required={true}
                onChange={handleChange}
            />
            <button type="submit">Add</button>
        </form>

    </div>
}

export default AirplaneTable;