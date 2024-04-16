import React, { useEffect, useState } from 'react'
import { FlatList, Text ,StyleSheet, View , Button , TextInput} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Toast from 'react-native-root-toast';
import {createIngr, getIngrs, resetIngredientSlice} from '../features/ingredients/ingredientSlice'
import IngredientItem from '../components/IngredientItem';
import { SafeAreaView } from 'react-native-safe-area-context';
function PantryPage() {

  const { ingredients } = useSelector((state)=>state.ingredients)
  const [name, setName] = useState('')
  // check for errors and stuff with toast 
  const dispatch  = useDispatch()
  const numColumns = 3; 


  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  
  const addIngredient = () => {
      
      dispatch(createIngr({name}))
      
      setName('')
  }
  
  const showIngrs = (ingr)  =>{
    return ingr.name+", "; 
  }
  return (
    <SafeAreaView style={styles.container}>
            <TextInput style={{alignSelf:'center'}}>Enter The Name of Your Ingredient</TextInput>
            <TextInput style={styles.input} onChangeText={setName} value={name} />
            <Button title='Add Ingredient' onPress={addIngredient} />
            {ingredients.length > 0 ? (
              <FlatList
                style={styles.flatList}
                data= {ingredients}
                renderItem={({item}) => <IngredientItem name={item.name} imagePath = {item.imagePath} /> }
                keyExtractor={ingr=>ingr._id}
                numColumns={numColumns}
                contentContainerStyle={{alignItems: 'center', justifyContent:'space-evenly'}}
     
              />
              ): 
              (
                <Text>You Have No Ingredients</Text>
                
                )}
    </SafeAreaView>
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
    alignSelf:'center'
  },
  container:{
      marginTop:20,
      
  },
  flatList:{
    marginVertical:20,
    width:'100%',
 
    paddingHorizontal:15,
  }
  
  
}); 
export default PantryPage