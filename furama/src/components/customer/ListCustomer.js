import { useEffect, useState } from "react";
import * as customersService from '../../services/CustomersService.js';
import { Link } from "react-router-dom";
import  Modal  from "react-modal";
import ReactPaginate from "react-paginate";



const ListCustomer = () => {

    const [customers,setCustomers] = useState([]);
    const [customerDelete,setCustomerDelete] = useState({});
    const [isModalOpen,setIsModalOpen] = useState(false);

    const [totalPages,setTotalPages] = useState(0)

    const [nameSearch,setNameSearch] = useState("");

    



    const customStyles = {
        content: {
            top: '30%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };





    const getAll = async(page) => {

        const getList = await customersService.getAllCustomer(page);

       
      
       
        setTotalPages(getList.totalPages)

        console.log(getList.content);

       
       
        setCustomers(getList.content)

    }

    
    const openModal = (customer) => {
            setCustomerDelete(customer);
            setIsModalOpen(true)

    }

    const removeCustomer =  async () => {
           const isSuccsec = await customersService.deleteById(customerDelete.id) ;

           if(isSuccsec) {
            alert("Xoa Thanh Cong");
            getAll(0);
            setIsModalOpen(false);
           }else {
            alert ("Xoa That Bai")
            setIsModalOpen(false)
           }
    }

    const handlePageClick = (e) => {

        getAll(+e.selected)
        
    }


    useEffect(() => {
            

            
                getAll(0);
            

    },[]);

   

   


    return (
        <>
        <div className="row">
        <h3 className="col-md-8">List Customer</h3>
        <input className="col-md-4" placeholder="Enter Name" onChange={(e)=>setNameSearch(e.target.value)}/>
        </div>
        

        <table className="table table-striped">

            <tr>
            
                <th>Name</th>
                <th>Day Of Birth</th>
                <th>Gender</th>
                <th>ID Card</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>Action</th>
            </tr>

            {
                customers.map (customer => (
                    <tr key={customer.id}>
                        <td>{customer.name}</td>
                        <td>{customer.dateOfBirth}</td>
                        {customer.gender === true ? <td>Nam</td> : <td>Nu</td>}
                        <td>{customer.idCard}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.email}</td>
                        <td>{customer.address}</td>
                        <td>
                            <Link className="btn btn-primary" to={`/editCustomer/${customer.id}`}>Edit</Link>
                            <button onClick={() =>openModal(customer)} className="btn btn-danger" type="submit">Delete</button>
                        </td>
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

        <Modal
                isOpen={isModalOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={() => setIsModalOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2>Xóa Customer</h2>

                <p>Bạn có muốn xóa Customer {customerDelete.name}?</p>
                <button onClick={removeCustomer}>Xác nhận</button>
            </Modal>
        </>
    )
}

export default ListCustomer;