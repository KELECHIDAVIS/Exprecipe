import React from 'react'
import { Text, TextInput, StyleSheet , Button, View, ViewStyle, TextStyle, TextInputProps, ActivityIndicator, SafeAreaView, TouchableOpacity} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {useState,useEffect} from "react" // component level state and useeffect

import Toast from 'react-native-root-toast';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import appColors from '../assets/appColors';
// bring in register and reset function (through redux) from slice
import { login, reset } from '../features/auth/authSlice'
import { AntDesign } from '@expo/vector-icons';


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
      <View style = {{flex:1 , justifyContent:'center', alignItems:'center', backgroundColor:appColors.bgColor}}>
        <ActivityIndicator size='large'/>
      </View>
    )
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor:appColors.bgColor, alignContent:'center', justifyContent:'center'}}>
      <Text style={styles.loginText}>Login</Text>
      <View style={styles.searchSection}>
        <Entypo name="email" size={24} color={appColors.secondaryColor} style={{paddingHorizontal:10}}/>
        <TextInput style={styles.input}
          keyboardType='email-address' id='email' value={email} placeholder='Enter Your Email'
          onChangeText={setEmail}
        /> 
      </View>
      <View style={styles.searchSection}>
        <FontAwesome5 name="lock" size={24} color={appColors.secondaryColor} style={{paddingHorizontal:10}} />
        <TextInput style={styles.input}
        keyboardType='default' id='password' value={password} placeholder='Enter Your Password'
        onChangeText={setPassword}
        
        /> 
      </View>
      
      <TouchableOpacity style={styles.loginButton} onPress={onSubmit}>
        <AntDesign name="login" size={32} color="white" />
      </TouchableOpacity>


      <TouchableOpacity  onPress={goToRegisterPage} style={{alignSelf:'center', paddingVertical:10, }}>
        <Text style={{color:appColors.accentColor, fontSize:18}}>New to Exprecipe? Register!</Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height:50,
    margin:20,
    padding:5,
    borderRadius:10,
},
searchIcon: {
    padding: 10,
},
input: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: appColors.secondaryColor,
    height:40,
    fontWeight:'bold',
    flex:1,
},
loginText:{
  fontSize:36,
  fontWeight:'500',
  color:appColors.secondaryColor,
  padding:15,
},
loginButton:{
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: appColors.accentColor,
    height:65,
    margin:20,
    padding:5,
    borderRadius:10,
}
});
export default Login