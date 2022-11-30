import './AdminPage.css';
import FlightTable from '../components/FlightTable';
import AirplaneTable from '../components/AirplaneTable';


function AdminPage() {

  
    
    return <div>
        <FlightTable admin={true}/>
        {/* <AirplaneTable/> */}
    </div>
}
export default AdminPage;