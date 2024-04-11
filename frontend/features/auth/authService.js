//service files are strictly for making http requests, sending data back, and sending any data in local storage 
import axios from 'axios' 
import * as SecureStore from 'expo-secure-store';
import * as Network from 'expo-network'; 





// the url has to consist of the devices local ip 

const API_URL = '/api/user/' // proxy didn't work :*(

// register user with our backend api 
const register = async (userData) =>{

    
    const response =await  axios.post("http://192.168.1.35:5000/api/user/", userData) // await axios.post(API_URL, userData) // HERE IS THE ERROR 
    
    if(response.data){
        //localStorage.setItem('user', JSON.stringify(response.data))

        // only store token from response b/c thats all we need 
        await  SecureStore.setItemAsync('userToken', JSON.stringify(response.data.token))

    }

    return response.data
    
}

const logout = async (userData)=>{
    await SecureStore.deleteItemAsync('user') 
}
const authService = {
    register
}

export default authService