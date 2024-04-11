//service files are strictly for making http requests, sending data back, and sending any data in local storage 
import axios from 'axios' 
import * as SecureStore from 'expo-secure-store';



// the url has to consist of the devices local ip 

const API_URL = '/api/user/' // proxy didn't work :*(

// register user with Four backend api 
const register = async (userData) =>{

    
    const response =await axios.post("http://172.17.53.6:5000/api/user/", userData)  //axios.post("http://192.168.1.35:5000/api/user/", userData) // await axios.post(API_URL, userData) // HERE IS THE ERROR 
    
    if(response.data){
        //localStorage.setIteam('user', JSON.stringify(response.data))

        // only store token from response b/c thats all we need 
        await  SecureStore.setItemAsync('userToken', JSON.stringify(response.data.token))

        try {
            await SecureStore.setItemAsync('userToken', JSON.stringify(response.data.token)); 
            
        } catch (error) {
            const message = (error.response&& error.response.data&&error.response.data.message) || error.message || error.toString()
            console.log(`Error in getting data from local storage: ${message} `)
            
        }
    }

    return response.data
    
}

const logout = async (userData)=>{
    await SecureStore.deleteItemAsync('user') 
}
const authService = {
    register,
    logout,
}

export default authService