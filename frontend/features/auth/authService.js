//service files are strictly for making http requests, sending data back, and sending any data in local storage 
import axios from 'axios' 
import * as SecureStore from 'expo-secure-store';
const API_URL = '/api/user/'

const saveUserData = async(key, value) =>{
    await SecureStore.setItemAsync(key, value)
}
// register user with our backend api 
const register = async (userData) =>{
    const response = await axios.post(API_URL, userData)

    console.log("Reaching inside")
    if(response.data){
        //localStorage.setItem('user', JSON.stringify(response.data))
        //await saveUserData('user', JSON.stringify(response.data))
    }

    return response.data
}

const authService = {
    register
}

export default authService