//service files are strictly for making http requests, sending data back, and sending any data in local storage 
import axios from 'axios' 
import {REACT_APP_BACKEND_SERVER_API} from '@env'

// the url has to consist of the devices local ip 
const apiURL = REACT_APP_BACKEND_SERVER_API+'user/'
// register user with Four backend api 

export const login = async (token) =>{
 
    const response =await axios.post(apiURL +"login", {token}) 
 
    return response.data.token; 
}