import React from "react";
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import "./LandingPage.css";

function LandingPage () {

    return <div className="landing">
        <Header showLogin={true}/>
        <SearchForm/>
    </div>
}
export default LandingPage;