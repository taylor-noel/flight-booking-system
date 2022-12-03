import Header from "../components/Header";
import SearchForm from "../components/SearchForm";

function LandingPage () {

    return <div>
        <Header showLogin={true}/>
        <SearchForm/>
    </div>
}
export default LandingPage;