import React from 'react'
import { Text, TextInput, StyleSheet , Button, View, ViewStyle, TextStyle, TextInputProps, ActivityIndicator} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {useState,useEffect} from "react" // component level state and useeffect

import Toast from 'react-native-root-toast';


// bring in register and reset function (through redux) from slice
import { login, reset } from '../features/auth/authSlice'
function Login({navigation}) {

  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")

  const dispatch = useDispatch()
  const {userToken, isLoading, isError, isSuccess, message} = useSelector( 
    (state) => state.auth
  )

  useEffect(() =>{
    if(isError){
      Toast.show(message, { duration: Toast.durations.LONG, position: Toast.positions.TOP,shadow: true, animation: true, hideOnPress: true,delay: 0,}); 
    }
    // created a user
    if(isSuccess || userToken )
    {
      navigation.pop(); 
    }

    return () =>{

      dispatch(reset())
    }
  }, [userToken, isError, isSuccess, message])

  const onSubmit = ()=>{
    // create a user with given info 
    const userData = {
      email,
      password,
    }
    dispatch(login(userData))// dispatches our register function
  }

  const goToRegisterPage = () =>{
    navigation.navigate('Register')
  }

  
  if(isLoading)
  {
    return (
      <View style = {{flex:1 , justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size='large'/>
      </View>
    )
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
    <Button title = 'New To Exprecipe? Register' onPress={goToRegisterPage} />
     <Button title='Login' onPress={onSubmit}/>
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