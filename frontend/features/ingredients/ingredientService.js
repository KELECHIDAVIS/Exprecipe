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
    
    const response =await axios.post("http://172.17.53.6:5000/api/ingredients/", ingrData, config) 
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
    
    const response =await axios.delete("http://172.17.53.6:5000/api/ingredients/"+id,  config) 
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
    const response = await axios.get("http://172.17.53.6:5000/api/ingredients/", config)
    return response.data // list of ingredients 
}

// get possible recipes  
const getPossibleRecipes = async ( token )=>{
    // for protected routes 
    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get("http://172.17.53.6:5000/api/ingredients/recipes", config)
    return response.data // list of recipes
}

const ingredientService = {
    createIngr, 
    getIngrs,
    deleteIngr,
    getPossibleRecipes

}

export default ingredientService; 