import axios from "axios";


export const getAllContact = async(page) => {

    try{
        const res = await axios.get(`http://localhost:8080/contacts?_page=${page}&_per_page=3`);
        return res.data;
    }catch(e){
        console.log(e);
    }

}

export const createContact = async(contract) => {
    try {
        await axios.post("http://localhost:8080/contacts",contract);
        return true;

    } catch (error) {
        return false;
    }
}