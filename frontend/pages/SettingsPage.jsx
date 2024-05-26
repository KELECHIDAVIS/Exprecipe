
import React from 'react'
import { Text , View, Button, ActivityIndicator, SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native'
import { useDispatch } from 'react-redux'
import {useEffect, useState} from "react"
import { logout, reset } from '../features/auth/authSlice';
import appColors from "../assets/appColors"
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
const bugReportEmail = 'service.exprecipe@gmail.com'
const emailSubject= 'Bug'
function SettingsPage({navigation}) {
  const [isAvail, setAvail] = useState(false); 


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      async function checkAvailability(){
        const isMailAvail = await MailComposer.isAvailableAsync(); 
        setAvail(isMailAvail); 
      }
      checkAvailability(); 
    });

    
    return unsubscribe;
  }, [ navigation]);
  
  const sendEmail = ()  =>{
    MailComposer.composeAsync({
      subject:emailSubject,
      recipients:[bugReportEmail]
    }); 
  }
  return (
    <SafeAreaView style = {{ flex:1 , backgroundColor: appColors.bgColor}}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Found A Bug?</Text>
        {isAvail ? (
          <TouchableOpacity style={styles.btn} onPress={sendEmail}>
          <MaterialIcons name="email" size={42} color={appColors.secondaryColor} style={{alignSelf:'center'}} />
          <Text style={{alignSelf:'center' , paddingHorizontal:20, fontSize:20}}>Contact Us</Text>
        </TouchableOpacity>
        ) : (
          <Text>(Mailing Feature is Not Available for Current Device)</Text>
        ) }
        
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>User Guide</Text>
        <TouchableOpacity style={styles.btn}>
          <Entypo name="book" size={42} color={appColors.secondaryColor} style={{alignSelf:'center'}}/>
          <Text style={{alignSelf:'center' , paddingHorizontal:20, fontSize:20}}>How To Use Exprecipe</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default SettingsPage

const styles = StyleSheet.create({
  headerContainer:{

  },
  btn:{
    backgroundColor:appColors.primaryColor,
    height:60,
    alignContent:'center',
    paddingHorizontal:15,
    flexDirection:'row',
    
  },
  header:{
    fontSize:20,
    color:appColors.secondaryColor,
    padding:20,
    fontWeight:'bold',
  }
})