import React from 'react'
import { FlatList, Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getRecipes, resetIngredientSlice } from '../features/ingredients/ingredientSlice'

import Toast from 'react-native-root-toast'
import { SafeAreaView } from 'react-native-safe-area-context'
function ExprecipesPage({navigation}) {
  const { ingredients , recipes , isError, isLoading, isSuccess, message} = useSelector((state)=>state.ingredients)
  const dispatch = useDispatch(); 


  // OPTIMIZE TO ONLY CALL WHEN INGREDIENTS CHANGE IN THE FUTURE
  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      if(ingredients.length >0)
        dispatch(getRecipes())  ; 

    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;

  }, [navigation])

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
        
        
        <FlatList
        data={recipes}
        renderItem={({item})=>{
          return(
            <View style= {styles.container}>
              <Text >{item.title}</Text>
            </View>
          )
        }}
      />) : 
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