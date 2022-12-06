import React from 'react';

const ReadOnlyRow = (props:any) => {
    return (
        <tr>
            <td>{props.flight.flight_number}</td>
            <td>{props.flight.departure_airport}</td>
            <td>{props.flight.arrival_airport}</td>
            <td>{props.flight.departure_time}</td>
            <td>{props.flight.arrival_time}</td>
            <td>{props.flight.airplane_id}</td>
            {props.admin ? 
            <td><button type="button" onClick={(event) => props.handleEditClick(event, props.flight)}>Edit</button>
            <button type="button" onClick={(event) => props.handleDeleteClick(event, props.flight)}>Delete</button></td>
            :
            <td><button type="button" onClick={(event) => props.handleBookClick(event, props.flight)}>Book</button></td>}
            
        </tr>
    )
}

export default ReadOnlyRow;