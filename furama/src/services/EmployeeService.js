import axios from "axios";

export const getAallEmployee = async() => {
    try {
        const res = await axios.get("http://localhost:8080/employees");
        return res.data;
        
    } catch (error) {
        console.log(error);
        
    }
}