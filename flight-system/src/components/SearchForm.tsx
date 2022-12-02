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
        <div className="outline">
            <div className="covidBlurb outline"><label>Get up to date on the latest COVID-19 measures for your destination.</label> <a href="https://travel.gc.ca/travel-covid">Review Requirements</a></div>
        <form className="search">
            <Select
                className="selectInput"
                placeholder="From"
                options={list.map(t => ({ value: t, label: t }))} />
            <Select
                className="selectInput"
                placeholder="To"
                options={list.map(t => ({ value: t, label: t }))} />
                <div className="space"/>
            <div className="dateInput">
                <label>Depart </label>
                <input type="date" name="departure" />
            </div>
            <div className="dateInput">
                <label>Return  </label>
                <input type="date" name="return" />
            </div>
            
        </form>
        
        <input 
        type="button" 
        value="Search Flights!" 
        className="searchButton"
        onClick={handleSearch} />
        </div>
    </div>

}

export default SearchForm;