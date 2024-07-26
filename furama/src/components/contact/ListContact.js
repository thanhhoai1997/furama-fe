import { useEffect, useState } from "react";
import * as contactsService from '../../services/ContactService.js'
import ReactPaginate from "react-paginate";

const ListContact = () => {

    const [contacts , setContacts] = useState([]);
    const [totalPages,setTotalPages] = useState(0);


    const getAll = async(page) => {

        const getList = await contactsService.getAllContact(page);

        setTotalPages(getList.pages)
        setContacts(getList.data)


    }

    useEffect(()=> {
        if(contacts.length === 0) {
            getAll(1);
        }
        
    },[])

    const handlePageClick = (e) => {

        
        getAll(+e.selected + 1);

    }

    return(
        <>
        <h3> List Contact </h3>
        <table className="table table-striped">
            <tr>
                <th>Start Day</th>
                <th>End Day</th>
                <th>Deposit</th>
                <th>Total Money</th>
                <th>Employee Name</th>
                <th>Customer Name</th>
                <th>Facility Name</th>
            </tr>
            {
                contacts.map (contact => (
                    <tr key={contact.id}>
                        <td>{contact.start_date}</td>
                        <td>{contact.end_date}</td>
                        <td>{contact.deposit}</td>
                        <td>{contact.total_money}</td>
                        <td>{contact.employee.name}</td>
                        <td>{contact.customer.name}</td>
                        <td>{contact.facility.name}</td>
                    </tr>
                ))
            }

        </table>

        <div style={{marginLeft : '30rem',marginTop : '3rem'}}>
        <ReactPaginate 
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null} 
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        
      />

    </div>


        </>
    )



}

export default ListContact;