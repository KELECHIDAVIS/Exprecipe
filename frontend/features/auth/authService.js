//service files are strictly for making http requests, sending data back, and sending any data in local storage 
import axios from 'axios' 
import * as SecureStore from 'expo-secure-store';
const API_URL = '/api/user/'

const saveUserData = async(key, value) =>{
    await SecureStore.setItemAsync(key, value)
}
// register user with our backend api 
const register = async (userData) =>{

    console.log("started calling axios api")
    //const response =await  axios.post(API_URL, userData) // await axios.post(API_URL, userData) // HERE IS THE ERROR 
    const res = await fetch("https://localhost:5000/api/user/", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then((response) => response.json())
      .then((json) => console.log(json));

    console.log(JSON.stringify(res))
    // res.
    // if(response.data){
    //     //localStorage.setItem('user', JSON.stringify(response.data))
    //     //await saveUserData('user', JSON.stringify(response.data))

    //     console.log(response.data); 
    // }


    // console.log("Response wasnt null")
    // return response.data
    return null 
}

const authService = {
    register
}

export default authService