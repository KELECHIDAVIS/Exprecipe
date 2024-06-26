import React, { useEffect, useState } from 'react'
import { FlatList, Text ,StyleSheet, View , Button , TextInput, Image, TouchableOpacity, ActivityIndicator} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context';
import appColors from '../assets/appColors';
import "react-native-get-random-values"
import {v4 as uuidv4} from 'uuid'; 
import { getIngrs,createIngr, deleteIngr } from '../features/ingredients/ingredientService';
import {login} from '../features/auth/authService'; 
import { Ionicons } from '@expo/vector-icons';
const width =100
function PantryPage({navigation}) {
 
  const [name, setName] = useState("")
  const [ingredients , setIngredientList] = useState([]); 
  const [loading , setLoading]= useState(false); 
  const numColumns = 3; 
  var token; 
  // check if they have a user token saved: if they do use it to retreive their ingredients, if not then create one 
   // MIGHT NEED TO USE USE CALLBACK SO IT DOESNT CALL MULTIPLE TIMES
  

  useEffect(() => {
    const onNavigation= async ()=>{
      // try {
      //   token = await AsyncStorage.getItem("token"); 
      // } catch (error) {
      //   console.error("Failed getting token from async")
      // }
      

      if(!token){ // first time user 
        token = uuidv4();  
      }
      try {
        const returnedTok = await login(token); // since it returns a token
        console.log("Returned Tok: "+returnedTok); 
        token = returnedTok; 
      } catch (error) {
        console.error("Failed logging in ")
      }


      console.log("Token before getting ingrs: "+ token); 
      // get user ingredients 
      try {
        const ingrList = await getIngrs(token); 
        console.log("Ingrlist after get ingrs: ", ingrList)
        if(ingrList && ingrList.length>0){
          setIngredientList((prevState)=>{
            return [...prevState, ingrList]
          })
        }
      } catch (error) {
        console.warn("Failed getting userIngredients"); 
      }
    };
    setLoading(true); 
    onNavigation();
    setLoading(false);
  }, []);
  
  const addIngredient = async() => {
      if(name == '')
      {return}
      const newIngredient = await createIngr({name}); 
      console.log("New Ingredient response")
      console.log(newIngredient)
      setName('')
      //update ingredients
      setIngredientList((prevState)=>{
        return [...prevState, newIngredient]; 
      })
  }
  
  const removeIngr = async (id)  =>{
    const deletedIngredientID = await deleteIngr(id); 
    setIngredientList((prevState)=>{
      prevState= prevState.filter(
        (ingr) => ingr._id !== deletedIngredientID
      );
      return [...prevState]; 
    })
  }

  const capitalizeFirst = (name)=>{
    if(name)
      return name.charAt(0).toUpperCase() + name.slice(1); 
  }

  
  return (
    <SafeAreaView style={styles.container}>
            <Text style={{alignSelf:'center', color: appColors.secondaryColor, fontWeight:'bold', fontSize:26}}>Enter Your Ingredients</Text>
            <View style={styles.textInputContainer}>
              <TextInput style={styles.input} onChangeText={setName} value={name} />
              <TouchableOpacity title='Add Ingredient' onPress={addIngredient} color={appColors.accentColor} style ={styles.addIngrButton}>
              <Ionicons name="add-circle" size={36} color={appColors.accentColor}></Ionicons>
              </TouchableOpacity>
            </View>
            {ingredients.length > 0 ? (
              loading ? (
                (
                  <View style = {{flex:1 , justifyContent:'center', alignItems:'center'}}>
                      <ActivityIndicator size='small' color={appColors.accentColor}/>
                  </View>
                )
              ): (
                <FlatList
                style={styles.flatList}
                data= {ingredients}
                extraData={ingredients}
                renderItem={({item}) => 
                {
                  return(
                    <View style= {styles.ingrContainer}>
                      <TouchableOpacity style={{alignItems:'center', backgroundColor:appColors.accentColor, borderTopLeftRadius:10, borderTopRightRadius:10}} onPress={()=> removeIngr(item._id)}>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>x</Text>
                      </TouchableOpacity>
                      <Image
                          
                          source={{uri : item.imagePath , resizeMode:'cover', width : width, height: 85}}

                      />
                      <Text style={{textAlign:'center', color:appColors.secondaryColor, fontWeight:'bold'}}>{capitalizeFirst(item.name)}</Text>
                    </View>
                  )
                }
                 }
                keyExtractor={ingr=>ingr._id}
                numColumns={numColumns}
                contentContainerStyle={{alignItems: 'center', justifyContent:'space-evenly'}}
              />
              )
              ): 
              (
                
                <Text style={{alignSelf:'center',marginTop:20,fontSize:16 , fontWeight:'bold'}}>You Have No Ingredients</Text>
                
              )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    flex:1,
    height: 40,
    width:300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:5,
    alignSelf:'center',
    backgroundColor:'white'
  },
  container:{

      backgroundColor:"#FFF8D6",
      flex:1,
  },
  ingrContainer:{
    backgroundColor:appColors.primaryColor,
    margin:10,
    width:width, 
    borderRadius:10,
    
}, 
  flatList:{
    marginVertical:20,
    width:'100%',
 
    paddingHorizontal:15,
  },
  
  textInputContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginHorizontal:20,
  },
  addIngrButton:{

  }
  
}); 
export default PantryPage