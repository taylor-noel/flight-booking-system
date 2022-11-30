import React from 'react';

const ReadOnlyRow = (props:any) => {
    return (
        <tr>
            <td>{props.flight.flightNumber}</td>
            <td>{props.flight.departure}</td>
            <td>{props.flight.arrival}</td>
            <td>{props.flight.departureDate}</td>
            <td>{props.flight.arrivalDate}</td>
            <td>{props.flight.airplaneModel}</td>
            {props.admin ? 
            <td><button type="button" onClick={(event) => props.handleEditClick(event, props.flight)}>Edit</button>
            <button type="button" onClick={(event) => props.handleDeleteClick(event, props.flight)}>Delete</button></td>
            :
            <td><button type="button" onClick={(event) => props.handleBookClick(event, props.flight)}>Book</button></td>}
            
        </tr>
    )
}

export default ReadOnlyRow;