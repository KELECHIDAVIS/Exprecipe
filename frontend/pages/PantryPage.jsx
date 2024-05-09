import React, { useEffect, useState } from 'react'
import { FlatList, Text ,StyleSheet, View , Button , TextInput, Image, TouchableOpacity, ActivityIndicator} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Toast from 'react-native-root-toast';
import {createIngr, getIngrs, resetIngredientSlice, deleteIngr} from '../features/ingredients/ingredientSlice'
import IngredientItem from '../components/IngredientItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import appColors from '../assets/appColors';

const width =100
function PantryPage({navigation}) {

  const { ingredients , isError, isLoading, isSuccess, message} = useSelector((state)=>state.ingredients)
  const [name, setName] = useState('')
  // check for errors and stuff with toast 
  const dispatch  = useDispatch()
  const numColumns = 3; 


  // when navigating to this page 
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      dispatch(getIngrs()); // get user ingredients
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(()=>{
    if(isError )
    {
      
      Toast.show(message, { duration: Toast.durations.SHORT, position: Toast.positions.TOP,shadow: true, animation: true, hideOnPress: true,delay: 0,}); 
    }

    
  }, [isError, isLoading , isSuccess, message])

  const addIngredient = () => {
      
      if(name == '')
      {return}
      dispatch(createIngr({name}))
      setName('')
  }
  
  const removeIngr = (id)  =>{
    dispatch(deleteIngr(id))  // not working? 
  }

  const capitalizeFirst = (name)=>{
    return name.charAt(0).toUpperCase() + name.slice(1); 
  }

  
  return (
    <SafeAreaView style={styles.container}>
            <TextInput style={{alignSelf:'center', color: appColors.secondaryColor, fontWeight:'bold', fontSize:26}}>Enter Your Ingredients</TextInput>
            <View style={styles.textInputContainer}>
              <TextInput style={styles.input} onChangeText={setName} value={name} />
              <TouchableOpacity title='Add Ingredient' onPress={addIngredient} color={appColors.accentColor} style ={styles.addIngrButton}>
                <AntDesign name="plussquare" size={42} color={appColors.accentColor}/>
              </TouchableOpacity>
            </View>
            {ingredients.length > 0 ? (
              isLoading ? (
                (
                  <View style = {{flex:1 , justifyContent:'center', alignItems:'center'}}>
                      <ActivityIndicator size='small'/>
                  </View>
                )
              ): (
                <FlatList
                style={styles.flatList}
                data= {ingredients}
                renderItem={({item}) => 
                {
                  return(
                    <View style= {styles.ingrContainer}>
                      <TouchableOpacity style={{alignItems:'center', backgroundColor:appColors.accentColor, borderTopLeftRadius:10, borderTopRightRadius:10}} onPress={()=> removeIngr(item._id)}>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>x</Text>
                      </TouchableOpacity>
                      <Image
                          
                          source={{uri : item.imagePath , resizeMode:'cover', width : width, height: 85}}

                      />
                      <Text style={{textAlign:'center', color:appColors.secondaryColor, fontWeight:'bold'}}>{capitalizeFirst(item.name)}</Text>
                    </View>
                  )
                }
                 }
                keyExtractor={ingr=>ingr._id}
                numColumns={numColumns}
                contentContainerStyle={{alignItems: 'center', justifyContent:'space-evenly'}}
              />
              )
              ): 
              (
                
                <Text style={{alignSelf:'center',marginTop:20,fontSize:16 , fontWeight:'bold'}}>You Have No Ingredients</Text>
                
              )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    flex:1,
    height: 40,
    width:300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:5,
    alignSelf:'center',
    backgroundColor:'white'
  },
  container:{

      backgroundColor:"#FFF8D6",
      flex:1,
  },
  ingrContainer:{
    backgroundColor:appColors.primaryColor,
    margin:10,
    width:width, 
    borderRadius:10,
    
}, 
  flatList:{
    marginVertical:20,
    width:'100%',
 
    paddingHorizontal:15,
  },
  
  textInputContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginHorizontal:20,
  },
  addIngrButton:{

  }
  
}); 
export default PantryPage