import React, { useState } from 'react'
import { FlatList, Text, View, StyleSheet, Image,  ActivityIndicator, Button , Modal, ScrollView} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { getRecipes, getRecipeInfo } from '../features/ingredients/ingredientSlice'

import { AntDesign } from '@expo/vector-icons';

import { SafeAreaView } from 'react-native-safe-area-context'
import RecipeCard from '../components/RecipeCard'
import {openBrowserAsync} from 'expo-web-browser'



function ExprecipesPage({navigation}) {
  const { ingredients , recipes , currentRecipe,  isError, isLoading, isSuccess, message} = useSelector((state)=>state.ingredients)
  const dispatch = useDispatch(); 
  const [isModalVisible , setModalVisible ] = useState(false); 
  const baseImageURL = "https://spoonacular.com/cdn/ingredients_100x100/";
  
  
  //get Recipe instrcutions because sometimes the api returns a recipe without instructions 
  const getRecipeInstructions = (currentRecipe)=>{
    if(!currentRecipe.instructions)
    {
      return "Instructions can be found through this link: "+ currentRecipe.sourceUrl; 
    }
    return currentRecipe.instructions; 
  }
  const returnModalContent= (currentRecipe) =>{
    if(!currentRecipe){
      setModalVisible(false)
      return
    }
    
    return(
      <ScrollView style={{padding:15, alignContent:'center'}}>
      
          <Text style ={styles.title}>{currentRecipe.title}</Text>
          <View style = {styles.timeContainer}>
            <AntDesign name="clockcircle" size={18} color="black" />
            <Text style={{fontSize: 18, fontWeight:'bold'}}>{currentRecipe.readyInMinutes}</Text>
          </View>
          <Text style={{fontSize:18 , marginTop:8}}>Ingredients:</Text>
          <FlatList 
            horizontal
            contentContainerStyle={{alignItems: 'center', justifyContent:'space-evenly'}}
            data={currentRecipe.extendedIngredients}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item})=>{
              return(
                <View style= {{ margin:10}}>
                  <Image
                    source={{ uri: baseImageURL + item.image }}
                    style={{ width: 85, height: 85 , resizeMode:'stretch'}} // Adjust dimensions as needed
                  />
                  <Text style={{fontSize:14,backgroundColor:'tan'}}>{item.name}</Text>
                </View>
              )
            }}
          />
          <Text style={{fontSize:18 , marginTop:8}}>Instructions:</Text>
          {currentRecipe.instructions ? (
            <Text style={{fontSize:16 , marginTop:8, alignSelf:'center'}}>{currentRecipe.instructions}</Text>
          ) : (
            <Button title= "Instructions Can Be Found Here" onPress={()=>openBrowserAsync(currentRecipe.sourceUrl)} /> 
          )}
          

      </ScrollView>
    )
  }
  const fetchRecipes = () => {
    if(ingredients.length >0 )
      dispatch(getRecipes()); 
  }
  const launchRecipeInfo = (spoonacularId) =>{
    
    // first get recipe info from dispatch 
    dispatch(getRecipeInfo(spoonacularId));  // get 
    // then set modal state
    setModalVisible(true)
    
  }
  if (isLoading){
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
                <SafeAreaView >
                    <View style={{paddingTop:30, alignContent:'center'}}>
                        <Button title = "Close" onPress = {() => setModalVisible(false)}/> 
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