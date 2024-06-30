//service files are strictly for making http requests, sending data back, and sending any data in local storage 
import axios from 'axios' 
import {REACT_APP_BACKEND_SERVER_API} from '@env'

// the url has to consist of the devices local ip 
const apiURL = REACT_APP_BACKEND_SERVER_API+'user/'
// register user with Four backend api 
export const register = async (userData) =>{

    const response =await axios.post(apiURL, userData) // await axios.post(API_URL, userData) // HERE IS THE ERROR 

    return response.data.token; 
}



export const login = async (userData) =>{
    const response =await axios.post(apiURL +"login", userData) // await axios.post(API_URL, userData) // HERE IS THE ERROR 
    return response.data; 
}