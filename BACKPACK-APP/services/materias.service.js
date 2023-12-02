import axios from "axios";


const baseurl = import.meta.env.VITE_API_URL;


export const getAllMaterias = async (token) => {
    try {

        const response = await axios.get(`${baseurl}/materia/carrera`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });

        if (response.status === 200) {
            return response.data
        }

    } catch (error) {
        console.log(error);
        return [];
    }
} 

export const postMaterial = async(material)=>{
    try {

        const response = await axios.post(`${baseurl}/document`, material, {
            method: 'POST',
            headers: {

                'Content-Type': 'application/json',
            },
        })


        console.log(response.data);
        return response.data;
        
    } catch (error) {
        console.log(error);
    }
}


export const getAllMateriales = async()=>{
    try {
        
        const response = await axios.get(`${baseurl}/document`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
              },
        });

        if (response.status === 200) {
            console.log(response.data);
            return response.data
        }

    } catch (error) {
        console.log(error);
        return [];
    }
} 

export const getAllMaterialesClient = async()=>{
    try {
        
        const response = await axios.get(`${baseurl}/document`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
              },
        });

        if (response.status === 200) {
            return response.data
        }

    } catch (error) {
        console.log(error);
        return [];
    }
} 


export const getMateriaEspecific = async(materia)=>{
    try {
        const response = await axios.get(`${baseurl}/document/search/?materia=${materia}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
              },
        });

        if (response.status === 200) {
            console.log(response.data);
            return response.data
        }

    } catch (error) {
        console.log(error);
    }
}