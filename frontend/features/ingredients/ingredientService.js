// handles http requests 
import axios from 'axios' 


// setIngr from our backend api 
const createIngr = async (ingrData , token) =>{
    // for protected routes 
    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    
    const response =await axios.post("http://192.168.1.35:5000/api/ingredients/", ingrData, config) 
    return response.data
}
// deleteIngr from our backend api 
const deleteIngr = async (id , token) =>{
    // for protected routes 
    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    console.log("id from service: "+ id)
    const response =await axios.delete("http://192.168.1.35:5000/api/ingredients/"+id,  config) 
    return response.data
}
// get ingredients  
const getIngrs = async ( token )=>{
    // for protected routes 
    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get("http://192.168.1.35:5000/api/ingredients/", config)
    return response.data // list of ingredients 
}

const ingredientService = {
    createIngr, 
    getIngrs,
    deleteIngr,

}

export default ingredientService; 