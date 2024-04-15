import React, { useEffect } from 'react'
import { FlatList, Text } from 'react-native'
import IngredientTextInputForm from '../components/IngredientTextInputForm'
import { useSelector, useDispatch } from 'react-redux'
import Toast from 'react-native-root-toast';
import {getIngrs, resetIngredientSlice} from '../features/ingredients/ingredientSlice'
function PantryPage() {
  const dispatch =useDispatch()
  const { ingredients , isError, isLoading, isSuccess ,message } = useSelector((state)=>state.ingredients)
  useEffect(()=>{
    
    if(isError) {
      let toast = Toast.show(message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        }); 
    }

    dispatch(getIngrs())
    if(isSuccess){
      console.log(`"Ingredients length: ${ingredients.length}`)
    }
    dispatch(resetIngredientSlice())
  },[isError, isSuccess, message])  

  if(isLoading){
    return (<Text>Loading...</Text>); 
  }
  return (
    <IngredientTextInputForm/>

  )
}

export default PantryPage