//service files are strictly for making http requests, sending data back, and sending any data in local storage 
import axios from 'axios' 
import AsyncStorage from '@react-native-async-storage/async-storage'
import {REACT_APP_BACKEND_SERVER_API} from '@env'

// the url has to consist of the devices local ip 
const apiURL = REACT_APP_BACKEND_SERVER_API+'user/'
// register user with Four backend api 
const register = async (userData) =>{

    const response =await axios.post(apiURL, userData) // await axios.post(API_URL, userData) // HERE IS THE ERROR 

        if(response.data){
            //localStorage.setIteam('user', JSON.stringify(response.data))
            await AsyncStorage.setItem('userToken', response.data.token)
            
        }
    return response.data.token 
}

const login = async (userData) =>{

    console.log(REACT_APP_BACKEND_SERVER_API); 
    const response =await axios.post(apiURL+'login', userData) // await axios.post(API_URL, userData) // HERE IS THE ERROR 


    if(response.data){
        //localStorage.setIteam('user', JSON.stringify(response.data))
        await AsyncStorage.setItem('userToken', response.data.token)
        
    }

    return response.data.token
}

const checkLoggedIn = async() =>{
    return await AsyncStorage.getItem('userToken')
}
const logout = async ()=>{
    await AsyncStorage.removeItem('userToken')
}
const authService = {
    register,
    logout,
    checkLoggedIn,
    login
}

export default authService