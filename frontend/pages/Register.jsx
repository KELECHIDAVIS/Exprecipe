import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Text, TextInput, StyleSheet , Button, View, TouchableOpacity, ViewStyle, TextStyle, TextInputProps, ActivityIndicator, SafeAreaView} from 'react-native'
import {useState,useEffect} from "react" // component level state and useeffect
import Toast from 'react-native-root-toast';
import appColors from '../assets/appColors';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
// bring in register and reset function (through redux) from slice
import { register, reset } from '../features/auth/authSlice'
import { StackActions } from '@react-navigation/native';
 
function Register( {navigation}) {
  const [name , setName] = useState("")
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [password2 , setPassword2] = useState("")


  const dispatch = useDispatch()
  const {userToken, isLoading, isError, isSuccess, message} = useSelector( 
    (state) => state.auth
  )

  useEffect(() =>{
    if(isError){
      let toast = Toast.show(message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        }); 
    }
    // created a user
    if(isSuccess || userToken )
    {
      navigation.popToTop(); 
    }
    return () =>{

      dispatch(reset())
    }
  }, [userToken, isError, isSuccess, message, ])

  const onSubmit = (e)=>{
    e.preventDefault(); 
    if(password!==password2){
      let toast = Toast.show('Passwords do not match', {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        });   
    }else if(name=='' || email =='' || password == '' || password2==''){
      let toast = Toast.show('Fill Out All Fields', {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        });   
    }
    else{


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
      <View style = {{flex:1 , justifyContent:'center', alignItems:'center', backgroundColor:appColors.bgColor}}>
        <ActivityIndicator size='large'/>
      </View>
    )
  }
  return (
    <SafeAreaView style={{flex:1, backgroundColor:appColors.bgColor, alignContent:'center', justifyContent:'center'}}>
      <Text style={styles.loginText}>Register</Text>
      <View style={styles.searchSection}>
        <FontAwesome5 name="user-alt" size = {24} color={appColors.secondaryColor} style={{paddingHorizontal:10}}/>
        <TextInput style={styles.input}
          keyboardType='default' id='name' value={name} placeholder='Enter Your Name'
          onChangeText={setName}
        /> 
      </View>
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
      <View style={styles.searchSection}>
        <FontAwesome5 name="lock" size={24} color={appColors.secondaryColor} style={{paddingHorizontal:10}} />
        <TextInput style={styles.input}
        keyboardType='default' id='password2' value={password2} placeholder='Confirm Your Password'
        onChangeText={setPassword2}
        
        /> 
      </View>
      
      <TouchableOpacity style={styles.loginButton} onPress={onSubmit}>
        <AntDesign name="login" size={32} color="white" />
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

export default Register