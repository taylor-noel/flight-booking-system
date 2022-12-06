import React from 'react';

const EditableRow = (props: any) => {
    return (
        <tr>
            <td>{props.editFlightData.flight_number}</td>
            <td>
                <input
                    type="text"
                    required={true}
                    value={props.editFlightData.departure_airport}
                    onChange={props.handleEditFlightChange}
                    name="departure"></input>
            </td>
            <td>
                <input
                    type="text"
                    required={true}
                    value={props.editFlightData.arrival_airport}
                    onChange={props.handleEditFlightChange}
                    name="arrival"></input>
            </td>
            <td>
                <input
                    type="datetime-local"
                    required={true}
                    value={props.editFlightData.departure_time}
                    onChange={props.handleEditFlightChange}
                    name="departureDate"></input>
            </td>
            <td>
                <input
                    type="datetime-local"
                    required={true}
                    value={props.editFlightData.arrival_time}
                    onChange={props.handleEditFlightChange}
                    name="arrivalDate"></input>
            </td>
            <td>
                <input
                    type="text"
                    required={true}
                    value={props.editFlightData.airplane_model}
                    onChange={props.handleEditFlightChange}
                    name="airplaneModel"></input>
            </td>
            {props.admin ?
                <td>
                    <button onClick={props.handleSaveFlight}>Save</button>
                    <button type="button" onClick={props.handleCancelFlight}>Cancel</button>
                </td>
                :
                null
            }

        </tr>
    )
}

export default EditableRow;