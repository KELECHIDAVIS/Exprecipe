// handles http requests 
import axios from 'axios' 
import {REACT_APP_BACKEND_SERVER_API} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
const apiURL = REACT_APP_BACKEND_SERVER_API+'ingredients/'
// setIngr from our backend api 
export const createIngr = async (ingrData) =>{
    // for protected routes 
    const token = await AsyncStorage.getItem("token"); 
    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    // console.log(token); 
    // console.log(apiURL); 
    const response =await axios.post(apiURL, ingrData, config) 
    
    return response.data
}
// deleteIngr from our backend api 
export const deleteIngr = async (id ) =>{
    const token = await AsyncStorage.getItem("token"); 
    // for protected routes 
    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    
    const response =await axios.delete(apiURL+id,  config) 
    return response.data.id
}
// get ingredients  
export const getIngrs = async ( token )=>{
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
export const getPossibleRecipes = async ( )=>{
    // for protected routes 
    const token = await AsyncStorage.getItem('token'); 
    const config ={                                         
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(apiURL+'recipes', config)
    return response.data // list of recipes
}

// get possible recipes  
 export const getRecipeInfo = async (id )=>{
    // for protected routes 
    const token = await AsyncStorage.getItem('token'); 
    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(apiURL+'recipes/'+id, config)
    return response.data //specific info about that recipe 
}


