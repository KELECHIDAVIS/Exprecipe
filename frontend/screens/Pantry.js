import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, Touchable, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import wheat from "../assets/Images/wheat-awn-solid.png"; 


import React, {useState, useEffect} from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles from '../assets/styles/GlobalStyles';
export default function Pantry( ) {
  
  const [inputText, setText] = useState("") ; 
  const [ingrList , setList] = useState([
    {id: "1", name: "Water" , imageSource: wheat},
    {id: "2", name: "Flour", imageSource: wheat},
    {id: "3", name: "Salt", imageSource: wheat},
    ]);  // each item has an id , name , and image (possibly some other stuff later )


  function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  function createIngredient()
  {
    if(inputText === "") return ; 

    setList((currentList) =>{
      return [
        ...currentList,
        {id: makeid(6), name: inputText, imageSource: wheat}
      ]
    }); 

    setText(""); 

    
  }

  function deleteIngredient(id){
    setList((currentList) => {
      return currentList.filter( ingr => ingr.id !== id); 
    }); 
  }

  
  return (
    <View style= {[styles.container, GlobalStyles.pageBackgroundColor]}>

      {/* this is going to be the header with input and button */}
      <View style={{flexDirection: 'row' }}>
        <TextInput 
        value={inputText}
        onChangeText={setText}
        style={styles.textInput}
        ></TextInput>

        <TouchableOpacity style={styles.addButtonContainer} onPress={createIngredient}> 
          <Image style={styles.addButtonImage} source={require("../assets/Images/plus-solid.png")}/>
        </TouchableOpacity>
      </View>
      
      {/*This is the flat list which holds the ingredients  */}
      <FlatList
        data={ingrList}
        numColumns={2}
        keyExtractor={(item) => item.id}
        
        renderItem={({item})=>(
          <View style={styles.ingrCardContainer}> 
            <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => deleteIngredient(item.id)}
            >
              <Image style= {styles.deleteButtonImage} source={require("../assets/Images/minus-solid.png")} />
            </TouchableOpacity>
            <Image style={styles.ingrCardImage} source={item.imageSource}/>
            <View style={styles.ingrNameHolder}>
              <Text style={styles.ingrCardName}>{item.name}</Text>
            </View>

          </View>
        )}

      />
    </View>
  ); 



}; 


const styles = StyleSheet.create({
  container:{
    flex:1 ,
    alignItems:'center',
    justifyContent:"center",
    padding:10,
    backgroundColor:GlobalStyles.pageBackgroundColor.backgroundColor,

  },
  textInput:{
    backgroundColor: "white", 
    width:"65%", 
    padding: 10,
    margin:10,
    borderRadius: 5 
    
  },
  deleteButton:{
    width:25,
    height:25,
    position:'absolute',
    top:0,
    right:0,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent:"center",
    borderTopRightRadius:10,
    borderBottomLeftRadius:7,
  },
  deleteButtonImage:{
    width:14,
    height:14,
    tintColor: GlobalStyles.primaryColor
  },
  ingrCardContainer:{
    backgroundColor: GlobalStyles.primaryColor.backgroundColor,
    marginVertical: 15,
    marginHorizontal:20, 
    width: 140,
    height :120 , 
    alignItems: 'center',
    borderRadius:10,
    
  },
  ingrCardImage:{
    width:60, 
    height:60, 
    marginTop: 20,
  },
  ingrNameHolder:{
    backgroundColor:GlobalStyles.accentColor.backgroundColor,
    position:'absolute',
    bottom:0,
    margin: 'auto',
    width: "100%",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  ingrCardName:{
    color: "#FEFEFE",
    textAlign:"center",
    fontWeight: "600",
    
  }, 
  addButtonContainer:{
    alignSelf:"center",
    backgroundColor: GlobalStyles.accentColor.backgroundColor,
    padding :10 , 
    borderRadius : 5
  }, 
  addButtonImage:{
    width:20,
    height:20, 
    tintColor: "#FEFEFE"
  }
})


