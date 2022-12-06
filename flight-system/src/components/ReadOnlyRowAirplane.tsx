import React from 'react';

const ReadOnlyRow = (props:any) => {
    return (
        <tr>
             <td>{props.airplane.id}</td>
            <td>{props.airplane.model}</td>
            <td>{props.airplane.rowss}</td>
            <td>{props.airplane.seats_per_row}</td>
            <td>{props.airplane.carrier_name}</td>
            {props.admin ? 
            <td><button type="button" onClick={(event) => props.handleEditClick(event, props.airplane)}>Edit</button>
            <button type="button" onClick={(event) => props.handleDeleteClick(event, props.airplane)}>Delete</button></td>
            :
            <td><button type="button" onClick={(event) => props.handleBookClick(event, props.airplane)}>Book</button></td>}
            
        </tr>
    )
}

export default ReadOnlyRow;