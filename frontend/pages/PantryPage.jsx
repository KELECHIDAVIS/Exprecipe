import React, { useEffect, useState } from 'react'
import { FlatList, Text ,StyleSheet, View , Button , TextInput} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Toast from 'react-native-root-toast';
import {createIngr, getIngrs, resetIngredientSlice} from '../features/ingredients/ingredientSlice'
function PantryPage() {

  const { ingredients } = useSelector((state)=>state.ingredients)
  const [name, setName] = useState('')
  // check for errors and stuff with toast 
  const dispatch  = useDispatch()


  
  const addIngredient = () => {
      
      dispatch(createIngr({name}))
      
      setName('')
  }
  
  const showIngrs = (ingr)  =>{
    return ingr.name+", "; 
  }
  return (
    <View style={styles.container}>
            <TextInput>Enter The Name of Your Ingredient</TextInput>
            <TextInput style={styles.input} onChangeText={setName} value={name} />
            <Button title='Add Ingredient' onPress={addIngredient} />
            {ingredients.length > 0 ? (
              <Text>You have {ingredients.map(showIngrs)} </Text>
              ): 
              (
                <Text>You Have No Ingredients</Text>
                
                )}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width:300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:5,
  },
  container:{
      marginTop:20,
      alignItems:'center',
      alignSelf:'center'
  }
  
  
}); 
export default PantryPage