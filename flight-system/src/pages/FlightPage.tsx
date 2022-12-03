import React from "react";
import FlightTable from "../components/FlightTable";
import Header from "../components/Header";

function FlightPage () {

    return <div className="landing">
        <Header showLogin={true}/>
        <FlightTable admin={false}/>
    </div>
}
export default FlightPage;