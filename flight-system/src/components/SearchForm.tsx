import React from "react";
import './SearchForm.css'

function SearchForm (props: any) {
    return <div >
    <form className = "search">
        <label>
            From
            <input type="text" name="from" />
        </label>
        <label>
            To
            <input type="text" name="to" />
        </label>
        <label>
            Departure Date
            <input type="date" name="departure" />
        </label>
        <label>
            Return Date
            <input type="date" name="return" />
        </label>
        <label>
            Passenger(s)
            <input type="range" name="vol" min="0" max="50" />
        </label>
        <input type="submit" value="Search Flights!"/>
    </form>
    </div>

}

export default SearchForm;