
import { Formik,Field,Form, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import * as contactsServices from '../../services/ContactService.js';
import * as employeesService from '../../services/EmployeeService.js';
import * as customersServices from '../../services/CustomersService.js';
import * as facilitiesService from '../../services/FacilitiesService.js';
const CreateContact = () => {

    const [contact,setContact] = useState({});
    const navigate = useNavigate();
    const [employees,setEmployees] = useState([]);
    const [customers,setCustomers] = useState([]);
    const [facilities,setFacilities] = useState([]);

    const validateContact = {
        deposit : Yup.number("not Character").required("Required").min(100000,">100000"),
        total_money : Yup.number("notCharacter").required("Required").min(100000,">100000")



    }

    const createContact = async(values) => {
        values.employee = JSON.parse(values.employee);
        values.customer = JSON.parse(values.customer);
        values.facility = JSON.parse(values.facility);
        const isSuccsec = await contactsServices.createContact(values);
        if(isSuccsec){
            alert("Them Moi Thanh Cong");
            console.log(values);
            navigate("/listContacts");

        }else {
            alert("Them Moi That Bai")
        }


           
    }

    useEffect(() => {
        const getCustomers = async() => {
            const newList = await customersServices.getListCustomer();
            setCustomers(newList);

        };
        if(customers.length === 0){
            getCustomers();
        }
    },[])

    useEffect(() => {
        const getEmployees = async() => {
            const newList = await employeesService.getAallEmployee();
            setEmployees(newList);

        };
        if(customers.length === 0){
            getEmployees();
        }
    },[])

    useEffect(() => {
        const getFacilities = async() => {
            const newList = await facilitiesService.getListFacility();
            setFacilities(newList);

        };
        if(customers.length === 0){
            getFacilities();
        }
    },[])

    return (
        <>
        <Formik
        initialValues={contact}
        validationSchema={Yup.object(validateContact)}
        onSubmit={createContact}
        >
            <Form>

            <table>
                <tr>
                    <th>Start Day</th>
                    <Field type = "date" name = "start_date"/>

                </tr>
                <tr>
                    <th>End Day</th>
                    <Field type = "date" name = "end_date"/>
                    
                </tr>
                <tr>
                    <th>Deposit</th>
                    <Field  name = "deposit"/>
                    <ErrorMessage name="deposit" component="p"/>
                </tr>

                <tr>
                    <th>Total Money</th>
                    <Field  name = "total_money"/>
                    <ErrorMessage name="total_money" component="p"/>
                </tr>

                <tr>
                    <th>Employee Name</th>
                    <Field name = "employee" as="select">

                    {
                        employees.map(employee => (
                            <option key={employee.id} value={JSON.stringify(employee)}>{employee.name}</option>
                        ))
                    }
                    </Field>
                </tr>

                <tr>
                    <th>Customer Name</th>
                    <Field name = "customer" as="select">

                    {
                        customers.map(customer => (
                            <option key={customer.id} value={JSON.stringify(customer)}>{customer.name}</option>
                        ))
                    }
                    </Field>
                </tr>

                <tr>
                    <th>Facility Name</th>
                    <Field name = "facility" as="select">

                    {
                        facilities.map(facility => {

                            if(facility.facility_type.id !== "3"){
                                return <option key={facility.id} value={JSON.stringify(facility)}>{facility.name}</option>
                            }
                            
})
                    }
                    </Field>
                </tr>

                <button type="submit">Create</button>

            </table>



            </Form>
           

        </Formik>
        
        </>
    )

}

export default CreateContact;