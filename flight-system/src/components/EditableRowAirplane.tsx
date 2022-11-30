import React from 'react';

const EditableRowAirplane = (props: any) => {
    return (
        <tr>
            <td>{props.airplane.id}</td>
            <td>
                <input
                    type="text"
                    required={true}
                    value={props.airplane.model}
                    onChange={props.handleEditFlightChange}
                    name="model"></input>
            </td>
            <td>
                <input
                    type="number"
                    required={true}
                    value={props.airplane.rows}
                    onChange={props.handleEditFlightChange}
                    name="rows"></input>
            </td>
            <td>
                <input
                    type="number"
                    required={true}
                    value={props.airplane.seats_per_row}
                    onChange={props.handleEditFlightChange}
                    name="seats_per_row"></input>
            </td>
            <td>
                <input
                    type="text"
                    required={true}
                    value={props.airplane.carrier_name}
                    onChange={props.handleEditFlightChange}
                    name="carrier_name"></input>
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

export default EditableRowAirplane;