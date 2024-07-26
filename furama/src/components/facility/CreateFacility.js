import { useState,useEffect } from "react";
import { ErrorMessage,Formik,Field,Form } from "formik";
import * as Yup from 'yup';
import * as facilitiesService from '../../services/FacilitiesService.js';
import {  useNavigate } from "react-router-dom";

const CreateFacility = () => {

    const [facility,setFacility] = useState({});

    const navigate = useNavigate();
    const [rentTypes,setRentTypes] = useState([]);
    const [facilityTypes,setFacilityTypes] = useState([]);
    const [mountForId,setMountForId] = useState(1);


    const validateFacility = {
        name : Yup.string().required("required"),
        area : Yup.number("Not characte").min(1, "> 0"),
        cost : Yup.number("Not characte").min(1, "> 0"),
        max_people : Yup.number("Not characte").min(1, "> 0"),
    }
    const createFacility = async(values) => {
        console.log(values);
        const isSuccsec = await facilitiesService.createFacility(values);
        if(isSuccsec){

            alert ("Them Moi Thanh Cong")
            navigate("/listFacility")

        }else {
            alert ("Them Moi That Bai")
        }


    }

    const handleChange = (e,setFieldValue) => {
            setFieldValue("facility_type",e.target.value);

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
            setMountForId(JSON.parse(e.target.value).id)
    }

    useEffect(()=>{
        const getAllRentType = async() => {
            const newList = await facilitiesService.getAllRentType();
            setRentTypes(newList)
        };

        if(rentTypes.length === 0){
            getAllRentType();
        }
    });

    useEffect(()=> {
        const getAllFalilityType = async() => {
            const newList = await facilitiesService.getAllFalilityType();
            setFacilityTypes(newList);
        };

        if(facilityTypes.length === 0){
            getAllFalilityType();
        }
    })

   
        return (

            <>
            <h1>Create Facility</h1>
                <Formik
                 initialValues={facility}
                 validationSchema={Yup.object(validateFacility)}
                 onSubmit={createFacility}
                 >

                {({ setFieldValue }) => {
                   return  <Form>
                        <table>
                            <tr>
                                <th>Link Img</th>
                                <td>
                                    <Field name="img"/>
                                </td>
                            </tr>
    
                            <tr>
                                <th>Name</th>
                                <td>
                                    <Field name="name"/>
                                    <ErrorMessage name="name" component="p"/>
                                </td>    
                            </tr>
                            
                            <tr>
                                <th>Cost</th>
                                <td>
                                    <Field name="cost"/>
                                    <ErrorMessage name="cost" component="p"/>
                                </td>    
                            </tr>
    
                            <tr>
                                <th>Area</th>
                                <td>
                                    <Field name="area"/>
                                    <ErrorMessage name="area" component="p"/>
                                </td>    
                            </tr>
    
                            <tr>
                                <th>Max People</th>
                                <td>
                                    <Field name="max_people"/>
                                    <ErrorMessage name="max_people" component="p"/>
                                </td>    
                            </tr>

                            <tr>
                                <th>Rent Type</th>
                                <td>
                                    <Field as ="select" name = "rent_type">
                                        {
                                            rentTypes.map(rentType =>
                                             (
                                                <option value={JSON.stringify(rentType)}>{rentType.name}</option>
                                            )
                                        )
                                        }

                                    </Field>
                                </td>
                            </tr>

                            <tr>

                                <th>facility Type</th>
                                <td>

                                    <Field onChange = {(e) => handleChange(e,setFieldValue)} as = "select" name = "facility_type">

                                        {
                                            facilityTypes.map(facilityType =>
                                                (
                                                    <option value={JSON.stringify(facilityType)}>{facilityType.name}</option>
                                                )
                                        )
                                        }
                                    </Field>
                                </td>
                            </tr>

                            {mountForId === "1" &&
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

                        {mountForId === "2" &&
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

                        {mountForId === "3" &&
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
    
                        </table>
                        <button type="submit">Create</button>
    
                    </Form>
                        }
                    }
                    
                    
    
    
    
                </Formik>
            </>
        )


   

   
    


}

export default CreateFacility;