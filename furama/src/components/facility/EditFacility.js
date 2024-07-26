import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as Yup from 'yup';
import { ErrorMessage,Field,Form,Formik } from "formik";

import * as facilityService from '../../services/FacilitiesService.js'


const EditFacility = () => {

    const {id} = useParams();
    const [facility,setFacility] =useState();
    const [rentTypes,setRentTypes] = useState([]);
    const [facilityTypes,setFacilityTypes] = useState([]);

    const [facilityTypeId,setFacilityTypeId] = useState();

    const navigate = useNavigate();


    useEffect(() =>{
        const getAllRentType = async() => {

            const newList = await facilityService.getAllRentType();

            setRentTypes(newList);

        }

        if(rentTypes.length === 0){
            getAllRentType()
        }
    },[]);

    useEffect(()=>{
        const getAllFalilityType = async () => {
            const newList = await facilityService.getAllFalilityType();

            setFacilityTypes(newList);
            
        }

        if(facilityTypes.length === 0) {
            getAllFalilityType();
        }
        

    },[])

    


    useEffect(()=> {
        const getFacility = async() => {

            const facilityNew = await facilityService.findById(id);
    
            setFacility(facilityNew);
            setFacilityTypeId(facilityNew.facility_type.id)
               
        }
            getFacility();
    },[])
    

    

    const validateFacility = {
        name : Yup.string().required("required").min(5,">5 character"),
        area : Yup.number("Not characte").min(1, "> 0"),
        cost : Yup.number("Not characte").min(1, "> 0"),
        max_people : Yup.number("Not characte").min(1, "> 0"),
    }

    
    

    const updateFacility = async (values) => {
            console.log(values);

            const isSuccsec =  await facilityService.updateFacility(values);
            if(isSuccsec){
                alert("Update Thanh Cong")
                navigate("/listFacility")
            }else {
                alert("Update That Bai")
            }
    }

    const handleChange = (e,setFieldValue) => {
        setFieldValue("facility_type",e.target.value)

        if(e.target.value === '1'){
            setFieldValue("facility_free",'');
        }else if(e.target.value === '2') {
            setFieldValue("facility_free",'');
            setFieldValue("pool_area",'')

        }else {
            setFieldValue('standard_room','');
            setFieldValue("pool_area",'');
            setFieldValue('desscription','');
            setFieldValue('number_of_floors','');

        }
        setFieldValue('desscription', '')
      setFacilityTypeId(JSON.parse(e.target.value).id);
    }
    

    

    

    if(facility){
        return (
            <>
    
    <h3>Edit Facility</h3>
                <Formik initialValues={facility} 
                onSubmit={updateFacility}
                validationSchema={Yup.object(validateFacility)}>
                    {({ setFieldValue }) => {
                       return <Form>
                       <table>
                        <tr>
                            <th>ID</th>
                            <td>
                                <Field readOnly  name = "id"/><br></br>
                            </td>
                        </tr>

                        <tr>
                            <th>Name</th>
                            <td>
                                <Field name ="name"/><br></br>            
                                <ErrorMessage name="name"component="p"></ErrorMessage>
                             </td>
                        </tr>

                        <tr>
                            <th>Cost</th>
                            <td>
                                <Field name ="cost"/><br></br>            
                                <ErrorMessage name="cost"component="p"></ErrorMessage>
                             </td>
                        </tr>

                        <tr>
                            <th>Max People</th>
                            <td>
                                <Field name ="max_people"/><br></br>            
                                <ErrorMessage name="max_people"component="p"></ErrorMessage>
                             </td>
                        </tr>

                        <tr>
                            <th>Rent Type</th>
                            <td>
                            <Field as ="select" name="rent_type">
                        <option selected value={facility.rent_type}>{facility.rent_type.name}</option>

                            {
                                rentTypes.map(rentType  => {
                                
                                    if(facility.rent_type.id !== rentType.id){
                                         return <option  value={JSON.stringify(rentType)}>{rentType.name}</option>
                                    }
                                })
                            }
                        </Field><br></br>
                            
                             </td>
                        </tr>

                        <tr>
                            <th>Facility Type </th>
                            <td>
                            <Field  onChange={(e) => handleChange(e, setFieldValue)}  as = "select" name ="facility_type">

                            
                         <option selected value={JSON.stringify(facility.facility_type)}>{facility.facility_type.name}</option>
                                {

                                    facilityTypes.map(facilityType => {
                                        if(facilityType.id !== facility.facility_type.id){
                                            return <option  value={JSON.stringify(facilityType)}>{facilityType.name}</option>
                                        }
                                    })
                                }
                            </Field><br></br>
                            
                             </td>
                        </tr>
                       


                       </table>
                                           

                       
                        
                       

                        {facilityTypeId === "1" &&
                         (
                            <>
                        <tr>
                            <th>Sandard Room</th>
                            <td>
                            <Field name = "standard_room"/><br></br>
                            </td>
                        </tr>

                        <tr>
                            <th>Description</th>
                            <td>
                            <Field name ="desscription"/><br></br>
                            </td>
                        </tr>

                        <tr>
                            <th>Pool Area</th>
                            <td>
                            <Field name ="pool_area"/><br></br>
                            </td>
                        </tr>

                        <tr>
                            <th>Number Of Floors</th>
                            <td>
                            <Field name ="number_of_floors"/><br></br>
                            </td>
                        </tr>

                        
                            </>
                         )
                         }

                        {facilityTypeId === "2" &&
                         (
                            <>

                        <tr>
                            <th>Facility Free</th>
                            <td>
                            <Field name = "facility_free"/><br></br>
                            </td>
                        </tr>
                            
                            </>
                         )
                         }

                        {facilityTypeId === "3" &&
                         (
                            <>
                            <tr>
                            <th>Sandard Room</th>
                            <td>
                            <Field name = "standard_room"/><br></br>
                            </td>
                        </tr>

                        <tr>
                            <th>Description</th>
                            <td>
                            <Field name ="desscription"/><br></br>
                            </td>
                        </tr>

                

                        <tr>
                            <th>Number Of Floors</th>
                            <td>
                            <Field name ="number_of_floors"/><br></br>
                            </td>
                        </tr>
                            </>
                         )
                         }



                            
                            




                        <br></br>
                        <button type="submit">Update</button>

                    </Form>
                    }}
                </Formik> 
    
            </>
        )

}else {
   return (
    <h1>Loading...</h1>
   )
}

}

export default EditFacility;