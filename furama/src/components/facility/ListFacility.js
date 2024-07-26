import { useEffect, useState } from "react"
import * as facilitiesService from '../../services/FacilitiesService.js';
import { Link } from "react-router-dom";

import  Modal  from "react-modal";
import ReactPaginate from 'react-paginate';



const ListFacility = () => {


    const [facilities,setFacilities] = useState([]);

    const [facilityDelete, setFacilityDelete] = useState ({});
    const [isModalOpen,setIsModalOpen] = useState (false);
    
    const [totalPages,setTotalPages] =useState(0);


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


    const getAll = async (page) => {

        const getList = await  facilitiesService.getAllFalility(page);
         
            setTotalPages(getList.pages)

            // console.log(getList.items);
            // console.log(getList.pages);
            // console.log(getList.data);
           
            // console.log(getList);

            setFacilities(getList.data);
           
            
    }

    useEffect(()=> {


        if(facilities.length === 0){
            getAll(1);
        } 
       
    },[])

   


    const openModal = (facility) => {

        setFacilityDelete(facility)
        setIsModalOpen(true);

        

    }

    const removeFacility = async() => {

        const isSuccsec = await facilitiesService.deleteById(facilityDelete.id);

        if(isSuccsec){
            alert("Delete Thanh Cong")
            getAll();
            setIsModalOpen(false);
            
        }else{
            alert("Delete That Bai")
            setIsModalOpen(false)
        }

    }

const handlePageClick = (e) => {
    console.log(e);

    getAll(+e.selected +1)

}

return (

    <>
    <div style={{ marginTop : '2rem',paddingLeft: '4rem'}} className=" container-fluid row col-md-12 gap-3 ">


    {facilities.map (facility => (

    <div key={facility.id} className=" card col-md-4 " style={{width: '18rem',position : 'relative'}}>

        <button type="submit" onClick={() => openModal(facility)} style={{width : '2rem',height : '0rem',position : 'absolute', bottom : '2.2rem',right :'6rem'}} className="btn btn-link">

        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
        </button>

<img    className="card-img-top" src={facility.img} alt="">

    
</img>
   <div className="card-body">
       <h3 className="card-text">{facility.name}</h3>
       <i>Room size : {facility.area}</i>

       <br></br>

       <Link style={{position : 'absolute', right : '2rem',bottom :'1rem'}} className="icon-link" to={`/editFacility/${facility.id}`}>
            Edit
  <svg className="bi" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brush" viewBox="0 0 16 16">
  <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.1 6.1 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.1 8.1 0 0 1-3.078.132 4 4 0 0 1-.562-.135 1.4 1.4 0 0 1-.466-.247.7.7 0 0 1-.204-.288.62.62 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896q.19.012.348.048c.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04M4.705 11.912a1.2 1.2 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.4 3.4 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3 3 0 0 0 .126-.75zm1.44.026c.12-.04.277-.1.458-.183a5.1 5.1 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005zm3.582-3.043.002.001h-.002z"/>
</svg></svg>
</Link>
   </div>
</div>


    ))}
    



    </div>

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
                <h2>Xóa Facility</h2>

                <p>Bạn có muốn xóa Facility {facilityDelete.name}?</p>
                <button onClick={removeFacility}>Xác nhận</button>
            </Modal>


   
        
    
    </>
)


}

export default ListFacility;