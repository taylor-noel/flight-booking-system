import React, { useEffect, useState } from "react";
import './SearchForm.css'
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function SearchForm(props: any) {
    const [airports, setAirports] = useState<string[]>([]);
    const [info, setInfo] = useState({
        departure: '',
        arrival: '',
        date: ''
    });


    useEffect(() =>{
        axios.get('http://127.0.0.1:8000/getAirportCities')
        .then(response => {
            const cities: string[] = []
            response.data.forEach((x: { [x: string]: any; }) =>{cities.push(x["city"])})
            setAirports(cities);
        });
    }, []);

    function handleChange(event:any){
        const newFormData = { ...info };
        newFormData[event.target.name as keyof typeof info] = event.target.value;

        setInfo(newFormData);
    }

    function handleOptionsChange(options: any) {
        const newFormData = { ...info };
        newFormData[options.value as keyof typeof info] = options.label;

        setInfo(newFormData);
    }

    const navigate = useNavigate();
    const handleSearch = (event: { preventDefault: () => void; }) => {
        navigate('/flights', {state: {departure: info.departure, arrival: info.arrival, date: info.date}});
    }
    return <div >
        <div className="outline">
            <div className="covidBlurb outline"><label>Get up to date on the latest COVID-19 measures for your destination.</label> <a href="https://travel.gc.ca/travel-covid">Review Requirements</a></div>
        <form className="search">
            <Select
                className="selectInput"
                placeholder="From"
                name="departure"
                onChange={handleOptionsChange}
                options={airports.map(t => ({ value: "departure", label: t }))} />
                <FontAwesomeIcon icon={faPlane} className="planeIcon"/>
            <Select
                className="selectInput"
                placeholder="To"
                name="arrival"
                onChange={handleOptionsChange}
                options={airports.map(t => ({ value: "arrival", label: t }))} />
                <div className="space"/>
            <div className="dateInput">
                <label>Depart </label>
                <input type="date" 
                 name="date"
                 onChange={handleChange}/>
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