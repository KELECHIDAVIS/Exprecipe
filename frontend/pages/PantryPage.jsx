import React, { useEffect } from 'react'
import { FlatList, Text } from 'react-native'
import IngredientTextInputForm from '../components/IngredientTextInputForm'
import { useSelector, useDispatch } from 'react-redux'

function PantryPage() {
  const dispatch =useDispatch()
  const { ingredients , isError, isLoading, isSuccess ,message } = useSelector((state)=>state.ingredients)
  useEffect(()=>{

    
  },[isError, isSuccess , message]) // have it get ingredients everytime an ingredient is updated  // might only need isSuccess because it changes when a ingredient is created 

  if(isLoading){
    return (<Text>Loading...</Text>); 
  }
  return (
    <IngredientTextInputForm/>

  )
}

export default PantryPage