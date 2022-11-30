import React from 'react';

const EditableRow = (props:any) =>{
    return (
        <tr>
            <td>{props.editFlightData.airline + "-" + props.editFlightData.flightNumber}</td>
            <td>
                <input 
                type="text" 
                required={true}
                value={props.editFlightData.departure}                
                onChange={props.handleEditFlightChange}
                name="departure"></input>
            </td>
            <td>
                <input 
                type="text" 
                required={true}
                value={props.editFlightData.arrival}                
                onChange={props.handleEditFlightChange}
                name="arrival"></input>
            </td>
            <td>
                <input 
                type="datetime-local" 
                required={true}
                value={props.editFlightData.departureDate}                
                onChange={props.handleEditFlightChange}
                name="departureDate"></input>
            </td>
            <td>
                <input 
                type="datetime-local" 
                required={true}
                value={props.editFlightData.arrivalDate}
                onChange={props.handleEditFlightChange}
                name="arrivalDate"></input>
            </td>
            <td>
                <input 
                type="text" 
                required={true}
                value={props.editFlightData.airplaneModel}
                onChange={props.handleEditFlightChange}
                name="airplaneModel"></input>
            </td>
            <td>
                <button onClick={props.handleSaveFlight}>Save</button>
                <button type="button" onClick={props.handleCancelFlight}>Cancel</button>
            </td>
        </tr>
    )
}

export default EditableRow;