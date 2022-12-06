import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/Header";

function FinalPage () {

    return <div>
        <Header showLogin={false}/>
        <h2>Booking Completed!</h2>
        
        <FontAwesomeIcon icon={faPlane} className="fa-10x"/>
    </div>
}
export default FinalPage;