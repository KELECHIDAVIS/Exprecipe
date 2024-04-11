import React from 'react'
import { Text, TextInput, StyleSheet , Button, View, ViewStyle, TextStyle, TextInputProps} from 'react-native'
import {FieldError} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {useState,useEffect} from "react" // component level state and useeffect
import {FaSignInAlt} from 'react-icons/fa'

function Login() {

  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")

  const dispatch = useDispatch()
  
  const onSubmit = ()=>{
    
  }

  return (
    <>
   
     <TextInput style={styles.input}
      keyboardType='email-address' id='email' value={email} placeholder='Enter Your Email'
      onChangeText={setEmail}
     /> 
     <TextInput style={styles.input}
      keyboardType='default' id='password' value={password} placeholder='Enter Your Password'
      onChangeText={setPassword}
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
export default Login