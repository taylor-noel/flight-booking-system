import React from 'react';

const ReadOnlyRow = (props:any) => {
    return (
        <tr>
             <td>{props.airplane.id}</td>
            <td>{props.airplane.modle}</td>
            <td>{props.airplane.rows}</td>
            <td>{props.airplane.seats_per_row}</td>
            <td>{props.airplane.carrier_name}</td>
            {props.admin ? 
            <td><button type="button" onClick={(event) => props.handleEditClick(event, props.flight)}>Edit</button>
            <button type="button" onClick={(event) => props.handleDeleteClick(event, props.flight)}>Delete</button></td>
            :
            <td><button type="button" onClick={(event) => props.handleBookClick(event, props.flight)}>Book</button></td>}
            
        </tr>
    )
}

export default ReadOnlyRow;