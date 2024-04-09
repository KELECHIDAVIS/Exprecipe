import React from 'react'
import { Text, TextInput, StyleSheet , Button, View, ViewStyle, TextStyle, TextInputProps} from 'react-native'
import {FieldError} from 'react-hook-form'
import {useState,useEffect} from "react" // component level state and useeffect
import {FaUser} from 'react-icons/fa'

// gonna be forms 
function Register() {
  const [name , setName] = useState("")
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [password2 , setPassword2] = useState("")


  const onSubmit = ()=>{
    
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