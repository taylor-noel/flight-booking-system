import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import EditableRowAirplane from "./EditableRowAirplane";
import ReadOnlyRowAirplane from "./ReadOnlyRowAirplane";
import './Table.css';

function AirplaneTable(props: any) {
    const navigate = useNavigate();
    interface Airplane {
        "id": number,
        "model": string,
        "rowss": number,
        "seats_per_row": number,
        "carrier_name": string
    }

    //TODO: get all value for citites, airplanes, and airlines from database
    const [carriers, setCarriers] = useState<string[]>([]); 
    const [airplaneData, setAirplaneData] = useState<Airplane[]>([{
        "id": 0,
        "model": '',
        "rowss": 0,
        "seats_per_row": 0,
        "carrier_name": ''
    }]);

    useEffect(() =>{

            axios.get('http://127.0.0.1:8000/getAirplaneCarrierNames')
            .then(response => {
                const airlines: string[] = []
            response.data.forEach((x: { [x: string]: any; }) =>{airlines.push(x["name"])})
            setCarriers(airlines);
            });
            axios.get('http://127.0.0.1:8000/getAirplanesFormatted')
            .then(response => {
             setAirplaneData(response.data);
            });

    }, []);

    const [formData, setFormData] = useState<Airplane>({
        "id": 0,
        "model": '',
        "rowss": 0,
        "seats_per_row": 0,
        "carrier_name": ''
    });


    const [editAirplaneData, setEditAirplaneData] = useState<Airplane>({
        "id": 0,
        "model": '',
        "rowss": 0,
        "seats_per_row": 0,
        "carrier_name": ''
    });

    

    const [editAirplaneNumber, setEditAirplaneNumber] = useState(0);

    function handleEditClick(event: any, airplane: any) {
        setEditAirplaneNumber(airplane.id);

        setEditAirplaneData(airplane);
    }

    function handleEditAirplaneChange(event: any) {
        const newAirplaneData:any = { ...editAirplaneData };
        newAirplaneData[event.target.name as keyof typeof editAirplaneData] = event.target.value;

        setEditAirplaneData(newAirplaneData);

    }

    function handleChange(event: any) {
        const newFormData:any = { ...formData };
        newFormData[event.target.name as keyof typeof formData] = event.target.value;

        setFormData(newFormData);
    }

    function handleSelectChange(options: any) {
        const newFormData:any = { ...formData };
        newFormData[options.value as keyof typeof formData] = options.label;

        setFormData(newFormData);
    }

    function handleCancelAirplane() {
        setEditAirplaneNumber(0);
    }

    function handleDeleteClick(event: any, airplane: any) {
        axios.delete('http://127.0.0.1:8000/deleteAirplane' + airplane.id)
        .then(response => {
            setAirplaneData(response.data);
        });
    }

    function handleSaveAirplane(event: any) {
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/updateAirplane?id='+editAirplaneData.id  + '&model=' + editAirplaneData.model + '&rowss='+editAirplaneData.rowss + '&seats_per_row=' + editAirplaneData.seats_per_row + '&carrier_name=' + editAirplaneData.carrier_name)
        .then(response =>{
            setAirplaneData(response.data)
        })
        setEditAirplaneNumber(0);
    }


    // TODO: update to push formdata to database
    function handleForm(event: any) {
    event.preventDefault();

        const id = Math.floor(Math.random()*1000);
        axios.put('http://127.0.0.1:8000/createAirplane?id=' + id + '&model=' + formData.model + '&rowss='+formData.rowss + '&seats_per_row=' + formData.seats_per_row + '&carrier_name=' + formData.carrier_name)
        .then(response =>{
            setFormData({
                "id": 0,
                "model": '',
                "rowss": 0,
                "seats_per_row": 0,
                "carrier_name": ''
            });
            setAirplaneData(response.data);
           
        })
        axios.put('http://127.0.0.1:8000/createInsertAirplane?airplane_id=' + id + '&email=' + 'admin@admin.com' + '&timestamp=' + new Date())        
        
    }

    return <div>
        <h3>Airplanes</h3>
        <table className="table">
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
                            <EditableRowAirplane
                                airplane={editAirplaneData}
                                handleEditAirplaneChange={handleEditAirplaneChange}
                                handleSaveAirplane={handleSaveAirplane}
                                handleCancelAirplane={handleCancelAirplane}
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
        <form className="addForm">
            <div className="formItem">
                <label>Airplane Model</label>
                <input
                    name="model"
                    placeholder="Model"
                    type="text"
                    required={true}
                    onChange={handleChange}
                />
            </div>
            <div className="formItem">
                <label>Number of Rows</label>
                <input
                    name="rowss"
                    type="number"
                    placeholder="30"
                    required={true}
                    onChange={handleChange}
                />
            </div>
            <div className="formItem">
                <label>Number of Seats Per Row</label>
                <input
                    name="seats_per_row"
                    type="number"
                    placeholder="6"
                    required={true}
                    onChange={handleChange}
                />
            </div>
            <div className="formItem">
                <label>Airline Carrier</label>
                <Select
                    name="carrier"
                    placeholder="Carrier"
                    options={carriers.map(t => ({ value: 'carrier_name', label: t }))}
                    required={true}
                    onChange={handleSelectChange}
                />
            </div>
            <button onClick={handleForm}>Add</button>
        </form>

    </div>
}

export default AirplaneTable;