import React, { useEffect, useState } from 'react'
import { FlatList, Text ,StyleSheet, View , Button , TextInput} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Toast from 'react-native-root-toast';
import {getIngrs, resetIngredientSlice} from '../features/ingredients/ingredientSlice'
function PantryPage() {

  const { ingredients , isError, isLoading, isSuccess ,message } = useSelector((state)=>state.ingredients)
  const [ingrName, setName] = useState('')
  // check for errors and stuff with toast 
  const dispatch  = useDispatch()

  const addIngredient = () => {
      dispatch(createIngr({ingrName}))
      
      setName('')
  }
 
  return (
    <View style={styles.container}>
            <TextInput>Enter The Name of Your Ingredient</TextInput>
            <TextInput style={styles.input} onChangeText={setName} value={ingrName} />
            <Button title='Add Ingredient' onPress={addIngredient} />
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