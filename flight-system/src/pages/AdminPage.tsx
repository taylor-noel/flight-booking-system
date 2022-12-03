import './AdminPage.css';
import FlightTable from '../components/FlightTable';
import AirplaneTable from '../components/AirplaneTable';
import Header from '../components/Header';


function AdminPage() {

  
    
    return <div>
        <Header showLogin={false}/>
        <FlightTable admin={true}/>
        <AirplaneTable admin={true}/>
    </div>
}
export default AdminPage;