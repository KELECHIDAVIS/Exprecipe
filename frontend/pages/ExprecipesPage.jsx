import React, { useState } from 'react'
import { FlatList, Text, View, StyleSheet, ActivityIndicator, Button , Modal} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getRecipes, resetIngredientSlice, getRecipeInfo } from '../features/ingredients/ingredientSlice'
import RecipeInfoModal from '../components/RecipeInfoModal'

import Toast from 'react-native-root-toast'
import { SafeAreaView } from 'react-native-safe-area-context'
import RecipeCard from '../components/RecipeCard'
function ExprecipesPage({navigation}) {
  const { ingredients , recipes , currentRecipe, isError, isLoading, isSuccess, message} = useSelector((state)=>state.ingredients)
  const dispatch = useDispatch(); 
  const [isModalVisible , setModalVisible ] = useState(false); 
 
  // // OPTIMIZE TO ONLY CALL WHEN INGREDIENTS CHANGE IN THE FUTURE
  // useEffect(()=>{
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     if(ingredients.length >0)
  //       dispatch(getRecipes())  ; 

  //   });

  //   // Return the function to unsubscribe from the event so it gets removed on unmount
  //   dispatch(resetIngredientSlice()); 
  //   return unsubscribe;

  // }, [navigation])

  

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
              <RecipeInfoModal recipeInfo={item} visible={isModalVisible} setModalVisible={setModalVisible} />
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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    textAlign:'center'
  },
});