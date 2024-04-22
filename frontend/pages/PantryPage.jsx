import React, { useEffect, useState } from 'react'
import { FlatList, Text ,StyleSheet, View , Button , TextInput, Image, TouchableOpacity} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Toast from 'react-native-root-toast';
import {createIngr, getIngrs, resetIngredientSlice, deleteIngr} from '../features/ingredients/ingredientSlice'
import IngredientItem from '../components/IngredientItem';
import { SafeAreaView } from 'react-native-safe-area-context';

const width =100
function PantryPage() {

  const { ingredients , isError, isLoading, isSuccess, message} = useSelector((state)=>state.ingredients)
  const [name, setName] = useState('')
  // check for errors and stuff with toast 
  const dispatch  = useDispatch()
  const numColumns = 3; 


  
  useEffect(()=>{

  }, [])

  const addIngredient = () => {
      
      if(name == '')
      {return}
      dispatch(createIngr({name}))
      setName('')
  }
  
  const removeIngr = (id)  =>{
    dispatch(deleteIngr(id))  // not working? 
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
                renderItem={({item}) => 
                {
                  return(
                    <View style= {styles.ingrContainer}>
                      <TouchableOpacity onPress={()=> removeIngr(item._id)}>
                        <Text>Delete</Text>
                      </TouchableOpacity>
                      <Image
                          
                          source={{uri : item.imagePath , resizeMode:'cover', width : width, height: 85}}

                      />
                      <Text>{item.name}</Text>
                    </View>
                  )
                }
                 }
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
  ingrContainer:{
    backgroundColor:'#FFE5B4',
    margin:10,
    width:width, 
}, 
  flatList:{
    marginVertical:20,
    width:'100%',
 
    paddingHorizontal:15,
  }
  
  
}); 
export default PantryPage