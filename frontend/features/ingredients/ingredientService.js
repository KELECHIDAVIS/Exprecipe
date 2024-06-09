// handles http requests 
import axios from 'axios' 
import {BACKEND_SERVER_API} from '@env'
const apiURL = BACKEND_SERVER_API+'ingredients/'
// setIngr from our backend api 
const createIngr = async (ingrData , token) =>{
    // for protected routes 
    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    
    const response =await axios.post(apiURL, ingrData, config) 
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
    
    const response =await axios.delete(apiURL+id,  config) 
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
    const response = await axios.get(apiURL, config)
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
    const response = await axios.get(apiUrl+'recipes', config)
    return response.data // list of recipes
}

// get possible recipes  
const getRecipeInfo = async (id ,  token )=>{
    // for protected routes 
    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(apiUrl+'recipes/'+id, config)
    return response.data //specific info about that recipe 
}

const ingredientService = {
    createIngr, 
    getIngrs,
    deleteIngr,
    getPossibleRecipes,
    getRecipeInfo,

}

export default ingredientService; 