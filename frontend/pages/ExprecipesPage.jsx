import React, { useState } from 'react'
import { FlatList, Text, View, StyleSheet, Image,  ActivityIndicator, Button , Modal, ScrollView, TouchableOpacity} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons';
import { getRecipes, getRecipeInfo } from '../features/ingredients/ingredientSlice'

import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'
import RecipeCard from '../components/RecipeCard'
import {openBrowserAsync} from 'expo-web-browser'
import RecipeModalContent from '../components/RecipeModalContent';
import { saveRecipe } from '../features/recipes/recipeSlice';
import { useEffect } from 'react';
import appColors from '../assets/appColors';
function ExprecipesPage({navigation}) {
  const { ingredients , recipes , currentRecipe, isLoading, isError, isSuccess, message} = useSelector((state)=>state.ingredients)
  
  const dispatch = useDispatch(); 
  const [isModalVisible , setModalVisible ] = useState(false); 
  
  
  
  useEffect(()=>{
    if(isError )
    {
      
      Toast.show(message, { duration: Toast.durations.SHORT, position: Toast.positions.TOP,shadow: true, animation: true, hideOnPress: true,delay: 0,}); 
    }

    
  }, [isError , isSuccess, message])

  const returnModalContent= (currentRecipe) =>{
    if(!currentRecipe){
      return null; 
    }
    
    return(
      <RecipeModalContent currentRecipe={currentRecipe}/>
    )
  }
  const fetchRecipes = () => {
    if(ingredients.length >0 )
      dispatch(getRecipes()); 
  }
  const saveNewRecipe =(currentRecipe)=>{
    dispatch(saveRecipe(currentRecipe))
  }
  const launchRecipeInfo = (spoonacularId) =>{
    
    // first get recipe info from dispatch 
    dispatch(getRecipeInfo(spoonacularId));  // get 
    // then set modal state
    setModalVisible(true)
    
  }
  if (isLoading ){
    return(
      <View style = {{flex:1 , justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size='large'/>
    </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      {ingredients.length>0 ? (
        <View style = {styles.container}>

        <TouchableOpacity title="Reload Exprecipes" onPress = {fetchRecipes}  style={{alignItems:'center', paddingBottom:5,}}>
            <Feather name="refresh-cw" size={40} color={appColors.accentColor} />
         </TouchableOpacity>
        
        <FlatList
        
        data={recipes}
        
        renderItem={({item})=>{
          return(
            <View style= {styles.recipeContainer}>
              <RecipeCard name={item.title} imagePath={item.image} missingIngredientCount={item.missedIngredientCount} onPress = {()=> launchRecipeInfo(item.id)} />
              <Modal visible ={isModalVisible} animationType='fade' >
                <SafeAreaView style={{flex:1, padding:10, backgroundColor:appColors.bgColor}} >
                    <View style={{paddingTop:40, alignContent:'center'}}>
                      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <TouchableOpacity  onPress = {() => setModalVisible(false)} style={{flex:1}}> 
                          <AntDesign name="closesquare" size={42} color={appColors.accentColor} />
                        </TouchableOpacity>

                        <TouchableOpacity  onPress = {()=>saveNewRecipe(currentRecipe)} > 
                          <MaterialIcons name="save-alt" size={42} color={appColors.accentColor} />
                        </TouchableOpacity>
                      </View>
                        {returnModalContent(currentRecipe)}
                    </View>
                </SafeAreaView>
              </Modal>
            </View>
          )
        }}
      /> 
        </View>
      ) :
      (
        <View style={styles.container}>
          <Text style= {styles.title}>
            Input Ingredients In Your Pantry Page To See Possible Recipes
          </Text>
        </View>
      ) }
    </SafeAreaView>
  )
}

export default ExprecipesPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:appColors.bgColor,
    alignContent:'center',
    paddingHorizontal:10,
  },
  recipeContainer: {
    flex: 1,
    alignContent:'center',
    padding:10,
    backgroundColor:appColors.bgColor,
  },
  timeContainer: {
    margin:10, 
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:10
    
  },
  item: {
    backgroundColor: appColors.primaryColor,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    textAlign:'center',
    fontWeight:'bold'
  },
});