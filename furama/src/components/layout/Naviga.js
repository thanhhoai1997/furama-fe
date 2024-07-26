import { Link } from "react-router-dom"
import Dropdown from 'react-bootstrap/Dropdown';



const Naviga = () => { 
     

    return (
        <>
  < div className="navbar" style={{backgroundColor: '#0c5460',height: '10%', paddingTop: '2vh'}}>
        <div className="row col-md-12" style={{paddingLeft: '5%'}}>
            <div className="col-md-9 row">
                <Link   to="/" className="nav-item col-md-2 bt">Home</Link>


                <Dropdown className="col-md-2 ">
        <Dropdown.Toggle as="button"  className ="bt" variant="0c5460" id="dropdown-basic">
                 Employee
        </Dropdown.Toggle>

      <Dropdown.Menu style={{marginTop: '2vh'}} as="ul">
        <Dropdown.Item  as ="li"><Link to={"/listEmployee"} style={{textDecoration : 'none',color : 'black'}}>List Employee</Link></Dropdown.Item>
        <Dropdown.Item  as ="li"><Link to={"/createEmployee"} style={{textDecoration : 'none',color : 'black'}}>Add New Employee</Link></Dropdown.Item>
      </Dropdown.Menu>
                </Dropdown>

                <Dropdown className="col-md-2 ">
        <Dropdown.Toggle as="button"  className ="bt" variant="0c5460" id="dropdown-basic">
                 Customer
        </Dropdown.Toggle>

      <Dropdown.Menu style={{marginTop: '2vh'}} as="ul">
        <Dropdown.Item  as ="li"><Link to={"/listCustomer"} style={{textDecoration : 'none',color : 'black'}}>List Customer</Link></Dropdown.Item>
        <Dropdown.Item  as ="li"><Link to={"/createCustomer"} style={{textDecoration : 'none',color : 'black'}}>Add New Customer</Link></Dropdown.Item>
      </Dropdown.Menu>
                </Dropdown>


                <Dropdown className="col-md-2 ">
        <Dropdown.Toggle as="button"  className ="bt" variant="0c5460" id="dropdown-basic">
                 Facility
        </Dropdown.Toggle>

      <Dropdown.Menu style={{marginTop: '2vh'}} as="ul">
        <Dropdown.Item  as ="li"><Link to={"/listFacility"} style={{textDecoration : 'none',color : 'black'}}>List Facility</Link></Dropdown.Item>
        <Dropdown.Item  as ="li"><Link to={"/createFacility"} style={{textDecoration : 'none',color : 'black'}}>Add New Facility</Link></Dropdown.Item>
      </Dropdown.Menu>
                </Dropdown>

                <Dropdown className="col-md-2 ">
        <Dropdown.Toggle as="button"  className ="bt" variant="0c5460" id="dropdown-basic">
                 Contact
        </Dropdown.Toggle>

      <Dropdown.Menu style={{marginTop: '2vh'}} as="ul">
        <Dropdown.Item  as ="li"><Link to={"/listContacts"} style={{textDecoration : 'none',color : 'black'}}>List Contact</Link></Dropdown.Item>
        <Dropdown.Item  as ="li"><Link to={"/createContact"} style={{textDecoration : 'none',color : 'black'}}>Add New Contact</Link></Dropdown.Item>
      </Dropdown.Menu>
                </Dropdown>
               



                </div>

                </div>

               
        </div>
        </>

    


    )
}

export default Naviga;