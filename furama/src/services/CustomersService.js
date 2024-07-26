
import axios from "axios";
export const getListCustomer = async() => {
    try {
        const res = await axios.get("http://localhost:8080/customers");
        return res.data;
    } catch (error) {
        console.log(error);
    }
   

}

export const getAllCustomer = async(page) => {

    try {
            const res = await axios.get(`http://localhost:8080/customers?page=${page}`);
            console.log(res);
            return res.data

    }catch(e){
        console.log(e);
    }
}

export const deleteById = async(id) => {

    try {

        await axios.delete(`http://localhost:8080/customers/${id}`)
        return true;
    }catch(e) {
        return false;
    }
}

export const getAllCustomerTypes = async() => {

    
    try {

        const res = await axios.get("http://localhost:8080/customer_type");
        return res.data;

    }catch(e){
        console.log(e);

    }
}

export const createCustomer =async (customer) => {

    try {

        await axios.post("http://localhost:8080/customers",customer);
        return true;

    }catch(e){
        return false;
    }

}

export const findById = async(id) => {
    try {
        const res = await axios.get(`http://localhost:8080/customers/${id}`);
        return res.data;
    }catch(e){
        console.log(e);
    }
}

export const updateCustomer = async (customer) => {

    try {

        await axios.put(`http://localhost:8080/customers/${customer.id}`,customer);
        return true;

    }catch(e) {
        return false;
    }
}