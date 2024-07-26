import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik,Field,Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import * as customersService from '../../services/CustomersService.js';


const EditCustomer = () => {
    const [customer,setCustomer] = useState();
    const {id} = useParams();
    const [customerTypes,setCustomerTypes] = useState([]);
    const navigate = useNavigate();


    useEffect(()=>{
            const getAll = async() => {
                const newList = await customersService.getAllCustomerTypes();
                setCustomerTypes(newList);
            }
            if(customerTypes.length === 0) {
                getAll();
            }

    },[])
    useEffect ( () => {

        const getCustomer = async() => {
            const customerNew = await customersService.findById(id);
            setCustomer(customerNew);
        }
        getCustomer();
        
    },[])

    

   


    const validateCustomer = {
             name : Yup.string()
                .required("required")
                .matches(/^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/,"Name isValid"),
            phone : Yup.string()
                .required("required")
                .matches(/^(090|091){1}[0-9]{7}$/,"phone isValid"),
            idCard : Yup.string()
                .required("required")
                .matches(/^([0-9]{7})|([0-9]{12})$/,"idCard isValis"),
            email : Yup.string()
                .required("required")
                .matches(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,"email isValid"),
            dayOfBirth : Yup.string()
                .required("Required")

    }

    const updateCustomer = async(values) => {
  
        console.log(values);


        values.customerType = JSON.parse(values.customerType);
        const isSuccsec = await customersService.updateCustomer(values);

        if(isSuccsec){
            alert("Update Thanh Cong");
            navigate("/listCustomer");
        }else{
              alert("Update That Bai");
        }
    }

    


    if(customer) {

        return (
            <>
                <Formik
                initialValues={customer}
                onSubmit={updateCustomer}
                validationSchema={Yup.object(validateCustomer)}
                 
                >
                    <Form>

                        <table>
                            <tr>
                                <td>
                                    <Field type ="hidden" name="id"/>
                                </td>
                            </tr>

                            <tr>
                                <th>Name</th>
                                <td>
                                    <Field  name="name"/>
                                    <ErrorMessage name="name" component="p"/>
                                </td>
                            </tr>

                            <tr>
                        <th>Day Of Birth</th>
                        <td>
                            <Field type = "date" name = " "/>
                            <ErrorMessage name="dayOfBirth" component="p"/>
                        </td>
                    </tr>

                    <tr>
                        <th>Gender</th>
                        <td>
                            <Field  type = "radio" value = 'true' name = "gender" /> Nam
                            <Field  type = "radio" value = 'false' name = "gender" /> Nu
                            
                        </td>
                    </tr>

                    <tr>
                        <th>ID Card</th>
                        <td>
                            <Field  name = "idCard"/>
                            <ErrorMessage name="idCard" component="p"/>
                        </td>
                    </tr>

                    <tr>
                        <th>Phone Number</th>
                        <td>
                            <Field  name = "phone"/>
                            <ErrorMessage name="phone" component="p"/>
                        </td>
                    </tr>

                    <tr>
                        <th>Email</th>
                        <td>
                            <Field  name = "email"/>
                            <ErrorMessage name="email" component="p"/>
                        </td>
                    </tr>

                    <tr>
                        <th>Address</th>
                        <td>
                            <Field  name = "address"/>
                            
                        </td>
                    </tr>

                    <tr>
                        <th>Customer Type</th>
                        <Field as="select" name = "customerType">
                        <option value={JSON.stringify(customer.customerType)}>{customer.customerType.name}</option>
                        {
                            
                            customerTypes.map(customerType => {
                                    if(customer.customerType.id !== customerType.id){
                                        return <option value={JSON.stringify(customerType)}>{customerType.name}</option>
                                    }
                            })
                        }

                        </Field>
                    </tr>

                        

                        </table>
                         <button type="submit">Update</button>
                    </Form>

                </Formik>
            </>
        )
    }else {
        return <h1>Loading...</h1>
    }


}

export default EditCustomer;