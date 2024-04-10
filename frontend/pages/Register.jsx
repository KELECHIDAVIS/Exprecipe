import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Text, TextInput, StyleSheet , Button, View, ViewStyle, TextStyle, TextInputProps} from 'react-native'
import {FieldError} from 'react-hook-form'
import {useState,useEffect} from "react" // component level state and useeffect
import {FaUser} from 'react-icons/fa'
import Toast from 'react-native-root-toast';

// bring in register and reset function (through redux) from slice
import { register, reset } from '../features/auth/authSlice'

 
function Register( {navigation}) {
  const [name , setName] = useState("")
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [password2 , setPassword2] = useState("")


  const dispatch = useDispatch()
  const {user, isLoading, isError, isSuccess, message} = useSelector( 
    (state) => state.auth
  )

  useEffect(() =>{
    if(isError){
      let toast = Toast.show(message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        }); 
    }
    // created a user
    if(isSuccess || user )
    {
      // navigate to login page or just home page 
      console.log('success')
    }
  }, [user, isError, isSuccess, message, dispatch])
  const onSubmit = ()=>{

    if(password!==password2){
      let toast = Toast.show('Passwords do not match', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        });   
    }else{
      // check if a user has that email alr first 


      // create a user with given info 
      const userData = {
        name, 
        email,
        password,
      }
      dispatch(register(userData))// dispatches our register function

    }
  }

  if(isLoading)
  {
    return(
      <Text>Loading...</Text>
    )
  }
  return (
    <>
     <TextInput style={styles.input}
      keyboardType='default' id='name' value={name} placeholder='Enter Your Name'
      onChangeText={setName}
     /> 
     <TextInput style={styles.input}
      keyboardType='email-address' id='email' value={email} placeholder='Enter Your Email'
      onChangeText={setEmail}
     /> 
     <TextInput style={styles.input}
      keyboardType='default' id='password' value={password} placeholder='Enter Your Password'
      onChangeText={setPassword}
     /> 
     <TextInput style={styles.input}
      keyboardType='default' id='password2' value={password2} placeholder='Confirm Password'
      onChangeText={setPassword2}
     /> 
     <Button title='Submit' onPress={onSubmit}/>
    </>
  )
}


const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:5,
  },
});

export default Register