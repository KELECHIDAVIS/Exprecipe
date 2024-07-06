// handles http requests 
import axios from 'axios' 
import {REACT_APP_BACKEND_SERVER_API} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
const apiURL = REACT_APP_BACKEND_SERVER_API+'ingredients/'
// setIngr from our backend api 
export const createIngr = async (ingrData) =>{
    // for protected routes 

    try{
        const response =await axios.post(apiURL, ingrData);  
    
        return response.data
    }catch (err) {
        console.log("Error in creatIngr"); 
        return null; 
    }
    
}
// deleteIngr from our backend api 
export const deleteIngr = async (info ) =>{
    const response =await axios.delete(apiURL+info.id,  {data:{uuid:info.uuid}}) 
    return response.data.id
}
// get ingredients  
export const getIngrs = async (uuid )=>{
    try {
        // for protected routes 

    const config ={
        params:{
            uuid:uuid
        }
    }
    
    const response = await axios.get(apiURL, config)
    

    return response.data // list of ingredients 
    } catch (error) {
        console.error(error.message)
    }
}

// get possible recipes  
export const getPossibleRecipes = async (uuid)=>{
    // for protected routes 
    
    const config ={                                         
        params:{
            uuid:uuid
        }
    }
    const response = await axios.get(apiURL+'recipes', config)
    return response.data // list of recipes
}

// get possible recipes  
 export const getRecipeInfo = async (id )=>{
    // for protected routes 
    
    const response = await axios.get(apiURL+'recipes/'+id)
    return response.data //specific info about that recipe 
}


