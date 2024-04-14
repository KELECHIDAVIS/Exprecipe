import React, { useEffect } from 'react'
import { useState } from 'react'
import { TextInput, View  , StyleSheet, Button} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { createIngr } from '../features/ingredients/ingredientSlice'
import Toast from 'react-native-root-toast'
function IngredientTextInputForm() {
    const [name, setName] = useState('')
    // check for errors and stuff with toast 
    const dispatch  = useDispatch()

    const addIngredient = () => {
        dispatch(createIngr({name}))
        
        setName('')
    }

    
    
    return (
        <View style={styles.container}>
            <TextInput>Enter The Name of Your Ingredient</TextInput>
            <TextInput style={styles.input} onChangeText={setName} value={name} />
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
export default IngredientTextInputForm