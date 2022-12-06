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
                    onChange={props.handleEditAirplaneChange}
                    name="model"></input>
            </td>
            <td>
                <input
                    type="number"
                    required={true}
                    value={props.airplane.rowss}
                    onChange={props.handleEditAirplaneChange}
                    name="rows"></input>
            </td>
            <td>
                <input
                    type="number"
                    required={true}
                    value={props.airplane.seats_per_row}
                    onChange={props.handleEditAirplaneChange}
                    name="seats_per_row"></input>
            </td>
            <td>
                <input
                    type="text"
                    required={true}
                    value={props.airplane.carrier_name}
                    onChange={props.handleEditAirplaneChange}
                    name="carrier_name"></input>
            </td>
            {props.admin ?
                <td>
                    <button onClick={props.handleSaveAirplane}>Save</button>
                    <button type="button" onClick={props.handleCancelAirplane}>Cancel</button>
                </td>
                :
                null
            }

        </tr>
    )
}

export default EditableRowAirplane;