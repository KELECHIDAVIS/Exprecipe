
import React from 'react'
import { Text , View,SafeAreaView, TouchableOpacity, StyleSheet, Modal} from 'react-native'
import {useEffect, useState} from "react"
import appColors from "../assets/appColors"
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
const bugReportEmail = 'service.exprecipe@gmail.com'
const emailSubject= 'Bug'

function SettingsPage({navigation}) {
  const [isAvail, setAvail] = useState(false); 
  const [modalVisible, setModalVisible] = useState(false);

  const modalBodyText = "1)\tEnter Your Ingredients on the Pantry Page \n\n2)\tSee Possible Recipes on the Exprecipes Page\n\n3)\tClick on each Exprecipe to view recipe ingredients and instructions. You also have ability to save recipes for later use and go to recipe's original website by clicking it's title \n\n4)\tSaved “Exprecipes” will be shown on the Saved Page"
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
  
  const  sendEmail = async ()  =>{
    await MailComposer.composeAsync({
      subject:emailSubject,
      recipients:[bugReportEmail],
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
        <TouchableOpacity style={styles.btn} onPress={() => setModalVisible(true)}>
          <Entypo name="book" size={42} color={appColors.secondaryColor} style={{alignSelf:'center'}}/>
          <Text style={{alignSelf:'center' , paddingHorizontal:20, fontSize:20}}>How To Use Exprecipe</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
            {modalBodyText}
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <AntDesign name="closesquare" size={40} color={appColors.accentColor}/>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: appColors.primaryColor,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,

    fontWeight:'500',
    fontSize:18,
    color:appColors.secondaryColor,
    paddingBottom:10,
  },
  textStyle: {
    color: appColors.accentColor,
    fontWeight: 'bold',

  },
})