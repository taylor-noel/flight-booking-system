import React from "react";
import './SearchForm.css'
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

function SearchForm(props: any) {
    const list = ["calgary", "victoria", "toronto"];

    const navigate = useNavigate();
    const handleSearch = (event: { preventDefault: () => void; }) => {
        navigate('/flights');

    }
    return <div >
        <form className="search">
            <label>
                <Select placeholder="Where from?" options={list.map(t => ({ value: t, label: t }))} />
            </label>
            <label>
                <Select placeholder="Where to?" options={list.map(t => ({ value: t, label: t }))} />
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
                <input type="number" name="vol" min="0" max="50" />
            </label>
            <input type="button" value="Search Flights!" onClick={handleSearch} />
        </form>
    </div>

}

export default SearchForm;