import React, { useEffect, useState } from 'react';
import { SafeAreaView,FlatList,  View, Text, Image , TouchableOpacity, StyleSheet, ActivityIndicator, Modal, Button, ScrollView} from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteRecipe, getSavedRecipes, setCurrentSavedRecipe } from '../features/recipes/recipeSlice';
import { useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import SavedRecipeCard from '../components/SavedRecipeCard';
import {openBrowserAsync} from 'expo-web-browser'
import appColors from '../assets/appColors';
const baseImageURL = "https://spoonacular.com/cdn/ingredients_100x100/"
const returnModalContent= (currentRecipe) =>{
  if(!currentRecipe){
    return null; 
  }
  
  return(
    
    <ScrollView style={{padding:15, alignContent:'center'}}>
          <Text style ={styles.title}>{currentRecipe.name}</Text>
          <View style = {styles.timeContainer}>
            <AntDesign name="clockcircle" size={18} color="black" />
            <Text style={{fontSize: 18, fontWeight:'bold'}}>{currentRecipe.cookTime} mins</Text>
          </View>
          <Text style={{fontSize:18 , marginTop:8}}>Ingredients:</Text>
          <FlatList 
            horizontal
            contentContainerStyle={{alignItems: 'center', justifyContent:'space-evenly'}}
            data={currentRecipe.ingredients}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item})=>{
              return(
                <View style= {{ margin:10, backgroundColor:appColors.primaryColor}}>
                  <Image
                    source={{ uri: baseImageURL + item.image }}
                    style={{ width: 85, height: 85 , resizeMode:'stretch'}} // Adjust dimensions as needed
                  />
                  <Text style={{fontSize:14,backgroundColor:'tan'}}>{item.name}</Text>
                </View>
              )
            }}
          />
          <Text style={{fontSize:18 , marginTop:8}}>Instructions:</Text>
          {currentRecipe.instructions ? (
            <Text style={{fontSize:16 , marginTop:8, alignSelf:'center'}}>{currentRecipe.instructions}</Text>
          ) : (
            <Button title= "Instructions Can Be Found Here" onPress={()=>openBrowserAsync(currentRecipe.sourceUrl)} /> 
          )}
          

      </ScrollView>
  )
}
function SavedRecipesPage({navigation}) {

  const dispatch = useDispatch();
  const {savedRecipes, isLoading} = useSelector((state)=>state.recipes)
  const [currentRecipe ,setCurrentRecipe] = useState(null); 
  const [isModalVisible, setModalVisible] = useState(false); 
  // Dispatch the function to get saved recipes when the component mounts or when navigation focus changes
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getSavedRecipes()); // Dispatch your action to get saved recipes
    });

    
    return unsubscribe;
  }, [dispatch, navigation]);

  const launchSavedRecipeModal =(recipe) =>{
    setCurrentRecipe(recipe); 
    setModalVisible(true); 
  }
 
  const deleteSavedRecipe =(id)=>{
    dispatch(deleteRecipe(id))
  }
  if(isLoading)
    {
      return(
        <View style = {{flex:1 , justifyContent:'center', alignItems:'center', backgroundColor:appColors.bgColor}}>
          <ActivityIndicator size='large' color={appColors.accentColor}/>
      </View>
      )
    }

  if(savedRecipes.length!==0){
    return (
      <SafeAreaView style={{flex: 1,
        justifyContent:'center',
        alignContent:'center',
        padding:10,
        backgroundColor:appColors.bgColor
        }}>
        <Text style={{...styles.title , margin:5}}>Swipe Left To Remove Recipes!</Text>
        <FlatList
          data= {savedRecipes}
          renderItem={({item}) => {
            return(
              <View style= {styles.container}>
                <SavedRecipeCard name={item.name} image={item.image} onPress= {()=>launchSavedRecipeModal(item)} deleteFunction = {()=> deleteSavedRecipe(item._id)}/>
              </View>
            )
          }}
        />
        
        <Modal visible={currentRecipe!== null}  >
          <SafeAreaView>
            <Button title="Close" onPress={()=> setCurrentRecipe(null)}/>
            {returnModalContent(currentRecipe)}
          </SafeAreaView>
        </Modal>
      </SafeAreaView>)
  }else{
    return (
      <Text>Save Recipes You Like Through Your Exprecipes Page!</Text>
    )
  }
  
   
}

export default SavedRecipesPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignContent:'center',
    padding:10,
  },
  timeContainer: {
    margin:10, 
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:10
    
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 22,
    textAlign:'center',
    fontWeight:'bold'
  },
}); 