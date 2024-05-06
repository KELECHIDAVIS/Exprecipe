import React, { useState } from 'react'
import { FlatList, Text, View, StyleSheet, Image,  ActivityIndicator, Button , Modal, ScrollView} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { getRecipes, getRecipeInfo } from '../features/ingredients/ingredientSlice'

import { AntDesign } from '@expo/vector-icons';

import { SafeAreaView } from 'react-native-safe-area-context'
import RecipeCard from '../components/RecipeCard'
import {openBrowserAsync} from 'expo-web-browser'
import RecipeModalContent from '../components/RecipeModalContent';
import { saveRecipe } from '../features/recipes/recipeSlice';

function ExprecipesPage({navigation}) {
  const { ingredients , recipes , currentRecipe, isLoading} = useSelector((state)=>state.ingredients)
  const recipeState = useSelector((state)=> state.recipes)
  const dispatch = useDispatch(); 
  const [isModalVisible , setModalVisible ] = useState(false); 
  
  
  
  
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
  if (isLoading || recipes.isLoading){
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

        
        <FlatList
        
        data={recipes}
        ListHeaderComponent={<Button title="Fetch Exprecipes" onPress = {fetchRecipes} />}
        renderItem={({item})=>{
          return(
            <View style= {styles.container}>
              <RecipeCard name={item.title} imagePath={item.image} missingIngredientCount={item.missedIngredientCount} onPress = {()=> launchRecipeInfo(item.id)} />
              <Modal visible ={isModalVisible} animationType='fade' >
                <SafeAreaView style={{flex:1, padding:10}}>
                    <View style={{paddingTop:40, alignContent:'center'}}>
                        <Button title = "Close" onPress = {() => setModalVisible(false)}/> 
                        <Button title = "Save Recipe" onPress = {()=>saveNewRecipe(currentRecipe)}/> 
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
    justifyContent:'center',
    alignContent:'center',
    padding:10,
  },
  timeContainer: {
    margin:10, 
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:10
    
  },
  item: {
    backgroundColor: '#f9c2ff',
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