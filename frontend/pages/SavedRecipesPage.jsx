import React, { useEffect, useState } from 'react';
import { SafeAreaView,FlatList,  View, Text, Image , TouchableOpacity, StyleSheet, ActivityIndicator, Modal, Button, ScrollView} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SavedRecipeCard from '../components/SavedRecipeCard';
import {openBrowserAsync} from 'expo-web-browser'
import AsyncStorage from '@react-native-async-storage/async-storage';
import appColors from '../assets/appColors';
import { getSavedRecipes, deleteRecipe } from '../features/recipes/recipeService';
import RecipeModalContent from '../components/RecipeModalContent';
const baseImageURL = "https://spoonacular.com/cdn/ingredients_100x100/"
const returnModalContent= (currentRecipe) =>{
  if(!currentRecipe){
    return null; 
  }
  
  return(
    
    <RecipeModalContent currentRecipe={currentRecipe}/>
  )
}
function SavedRecipesPage({navigation}) {

  const [savedRecipes, setSavedRecipes]  = useState([])
  const [loading ,  isLoading]=useState(false); 
  const [currentRecipe ,setCurrentRecipe] = useState(null); 
  const [isModalVisible, setModalVisible] = useState(false); 
  // Dispatch the function to get saved recipes when the component mounts or when navigation focus changes
 
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      const onNavigation= async ()=>{
        const token = await AsyncStorage.getItem("token"); 
        // get recipes 
        const recipeLst =await getSavedRecipes();
        setSavedRecipes(recipeLst);  
      };
  
      isLoading(true); 
      onNavigation();
      isLoading(false)
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  const launchSavedRecipeModal =(recipe) =>{
    setCurrentRecipe(recipe); 
    setModalVisible(true); 
  }
 
  const deleteSavedRecipe =async (id)=>{
    const deletedRecipeID = await deleteRecipe(id); 
    setSavedRecipes((prevState)=>{
      prevState= prevState.filter(
        (recipe) => recipe._id !== deletedRecipeID
      );
      return [...prevState]; 
    })
  }
  if(loading)
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
        
        <FlatList
          data= {savedRecipes}
          extraData={savedRecipes}
          renderItem={({item}) => {
            return(
              <View style= {styles.container}>
                <SavedRecipeCard name={item.name} image={item.image} onPress= {()=>launchSavedRecipeModal(item)} deleteFunction = {()=> deleteSavedRecipe(item._id)}/>
              </View>
            )
          }}
        />
        
        <Modal visible={currentRecipe!== null}  >
          <SafeAreaView style={{flex:1, backgroundColor:appColors.bgColor}}>
            <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:15}}>
              <TouchableOpacity  onPress = {() => setCurrentRecipe(null)} style={{flex:1}}> 
                <AntDesign name="closesquare" size={42} color={appColors.accentColor} />
              </TouchableOpacity>
            </View>
            {returnModalContent(currentRecipe)}
          </SafeAreaView>
        </Modal>
      </SafeAreaView>)
  }else{
    return (
      <SafeAreaView style={{flex:1 , justifyContent:'center', paddingHorizontal:20, backgroundColor:appColors.bgColor}}>
        <Text style = {styles.title}>Save Recipes You Like Through Your Exprecipes Page!</Text>
      </SafeAreaView>
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
    fontSize: 21,
    textAlign:'center',
    fontWeight:'bold',
    color:appColors.secondaryColor,
  },
}); 