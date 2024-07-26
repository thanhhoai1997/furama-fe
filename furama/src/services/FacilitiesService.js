
import axios from "axios";

export const getListFacility =  async() => {
    try {
        const res = await axios.get("http://localhost:8080/facilities");
        return res.data;
        
    } catch (error) {
        console.log(error);
    }
}

export const getAllRentType = async() => {
    try{
            const res = await axios.get("http://localhost:8080/rent_type");
            return res.data;
    }catch(e){
        console.log(e);
    }
};

export const getAllFalilityType = async() => {
    try {
            const res = await axios.get("http://localhost:8080/facility_type");
            return res.data;
    }catch(e){
        console.log(e);
    }
}

export const getAllFalility = async(page) => {

    try {
        const res = await axios.get(`http://localhost:8080/facilities?_page=${page}&_per_page=4`);

            console.log(res);


        return res.data;

        
    }catch (e){
        console.log(e);
    }

}

export const deleteById =  async(id) => {
    try {

        console.log(id);
            await axios.delete(`http://localhost:8080/facilities/${id}`)
            return true;
    }catch(e) {
        return false;
    }
}
export const findById = async(id) => {
    try {
            const res = await axios.get(`http://localhost:8080/facilities/${id}`);
            return res.data;
    }catch(e){
        console.log(e);
    }
}
export const updateFacility = async(facility) => {
    try {
        await axios.put(`http://localhost:8080/facilities/${facility.id}`,facility);
        return true;

    }catch(e){
        return false;
    }
}

export const createFacility = async (facility) => {
    try {
            await axios.post("http://localhost:8080/facilities",facility);
        return true
    }catch(e){
        return false
    }
}