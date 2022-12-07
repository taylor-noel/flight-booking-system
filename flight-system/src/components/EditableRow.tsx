import React from 'react';

const EditableRow = (props: any) => {
    return (
        <tr>
            <td>{props.editFlightData.flight_number}</td>
            <td>
                <input
                    type="text"
                    value={props.editFlightData.departure_airport}
                    onChange={props.handleEditFlightChange}
                    name="departure_airport"></input>
            </td>
            <td>
                <input
                    type="text"
                    value={props.editFlightData.arrival_airport}
                    onChange={props.handleEditFlightChange}
                    name="arrival_airport"></input>
            </td>
            <td>
                <input
                    type="datetime-local"
                    value={props.editFlightData.departure_time}
                    onChange={props.handleEditFlightChange}
                    name="departure_time"></input>
            </td>
            <td>
                <input
                    type="datetime-local"
                    value={props.editFlightData.arrival_time}
                    onChange={props.handleEditFlightChange}
                    name="arrival_time"></input>
            </td>
            <td>
                <input
                    type="text"
                    value={props.editFlightData.airplane_id}
                    onChange={props.handleEditFlightChange}
                    name="airplane_id"></input>
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