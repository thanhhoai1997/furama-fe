import { useEffect, useState } from "react";
import { Formik,Field,ErrorMessage, Form } from "formik";
import * as Yup from 'yup';
import * as customerServices from '../../services/CustomersService.js';
import { useNavigate } from "react-router-dom";

const CreateCustomer = () => {

        const [customer,setCustomer] = useState({})
        const [customerTypes,setCustomerTypes] =useState([]);
        const navigate = useNavigate();


        


        const validateCustomer = {
                name : Yup.string()
                .required("required")
                .matches(/^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/,"Name isValid"),
                phone : Yup.string()
                .required("required")
                .matches(/^(090|091){1}[0-9]{7}$/,"phone isValid"),
                id_card : Yup.string()
                .required("required")
                .matches(/^([0-9]{7})|([0-9]{12})$/,"idCard isValis"),
                email : Yup.string()
                .required("required")
                .matches(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,"email isValid"),
                day_of_birth : Yup.string()
                .required("Required")
                
        }

        const createCustomer = async(values) => {
           
            
            values.customer_type = JSON.parse(values.customer_type);
            const isSuccsec = await customerServices.createCustomer(values);
            if(isSuccsec){
                alert("Them Moi Thanh Cong");
                navigate("/listCustomer");
            }else {
                alert("Them Moi That Bai")
            }

        }

        useEffect(()=> {
            const getAllCustomerTypes = async() => {

                const customerTypesNew = await customerServices.getAllCustomerTypes();

                setCustomerTypes(customerTypesNew);

            }

            if(customerTypes.length === 0){
                getAllCustomerTypes();
            }
        },[])

       return (
        <Formik 
        initialValues={customer}
        validationSchema={Yup.object(validateCustomer)}
        onSubmit={createCustomer}
        >
            <Form>
                <table>
                    <tr>
                        <th>Name</th>
                        <td>
                            <Field name = "name"/>
                            <ErrorMessage name="name" component="p"/>
                        </td>
                    </tr>

                    <tr>
                        <th>Day Of Birth</th>
                        <td>
                            <Field type = "date" name = "day_of_birth"/>
                            <ErrorMessage name="day_of_birth" component="p"/>
                        </td>
                    </tr>

                    <tr>
                        <th>Gender</th>
                        <td>
                            <Field  type = "radio" value = "true" name = "gender" /> Nam
                            <Field  type = "radio" value = "false" name = "gender" /> Nu
                            
                        </td>
                    </tr>

                    <tr>
                        <th>ID Card</th>
                        <td>
                            <Field  name = "id_card"/>
                            <ErrorMessage name="id_card" component="p"/>
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
                        <td>
                            <Field as="select" name ="customer_type">
                            {
                                customerTypes.map(customerType => (
                                        <option key={customerType.id} value={JSON.stringify(customerType)}>{customerType.name}</option>
                                ))
                            }

                            </Field>

                           
                        </td>
                    </tr>

                    <button type="submit">Create</button>

                </table>

            </Form>


        </Formik>
       )



}

export default CreateCustomer;