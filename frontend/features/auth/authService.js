//service files are strictly for making http requests, sending data back, and sending any data in local storage 
import axios from 'axios' 
import AsyncStorage from '@react-native-async-storage/async-storage'



// the url has to consist of the devices local ip 
const API_URL ='/api/user/'// proxy didn't work :*(

// register user with Four backend api 
const register = async (userData) =>{

    const response =await axios.post("http://172.17.53.6:5000/api/user/", userData) // await axios.post(API_URL, userData) // HERE IS THE ERROR 

        if(response.data){
            //localStorage.setIteam('user', JSON.stringify(response.data))
            await AsyncStorage.setItem('userToken', response.data.token)
            
        }
    return response.data.token 
}

const login = async (userData) =>{

    const response =await axios.post("http://172.17.53.6:5000/api/user/login/", userData) // await axios.post(API_URL, userData) // HERE IS THE ERROR 


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