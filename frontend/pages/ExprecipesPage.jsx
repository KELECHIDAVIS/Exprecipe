import React, { useState } from 'react'
import { FlatList, Text, View, StyleSheet,  ActivityIndicator,  Modal, TouchableOpacity, Alert} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'
import RecipeCard from '../components/RecipeCard'
import RecipeModalContent from '../components/RecipeModalContent';
import { useEffect } from 'react';
import appColors from '../assets/appColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getIngrs, getPossibleRecipes,getRecipeInfo} from '../features/ingredients/ingredientService';
import {saveRecipe} from '../features/recipes/recipeService'
function ExprecipesPage({navigation}) {
  const [isModalVisible , setModalVisible ] = useState(false); 
  const [loading , isLoading] = useState(false);
  const [ingredients , setIngredientList] = useState([])
  const [recipes, setRecipeList]   = useState([]); 
  const [currentRecipeInfo , setRecipeInfo] = useState({}); 
  const [uuid , setUUID] = useState(""); 

  useEffect(()=>{
    const onNavigation= async ()=>{
      const uuid1 = await AsyncStorage.getItem("uuid"); 

      // get ingredients 
      const ingrList =await getIngrs(uuid1);

      setUUID(uuid1); 
      setIngredientList(ingrList);  
    };

    isLoading(true); 
    onNavigation();
    isLoading(false);  
  },[]); 
  const returnModalContent= () =>{
    if(!currentRecipeInfo){
      return null; 
    }
    
    return(
      <RecipeModalContent currentRecipe={currentRecipeInfo}/>
    )
  }
  const fetchRecipes =async () => {
    if(ingredients.length >0 ){
      isLoading(true); 
      const  newList = await getPossibleRecipes(uuid); 
      setRecipeList((prevState)=>{
      prevState = newList ; 
      return [...prevState]; 
      });  
      isLoading(false); 
      
    }
  }
  const saveNewRecipe = async ()=>{
    await saveRecipe(currentRecipeInfo, uuid) ; 
    Alert.alert("Recipe Saved!"); 
  }
  const launchRecipeInfo = async (spoonacularId) =>{
    isLoading(true); 
    // first get recipe info from dispatch 
    const info = await getRecipeInfo(spoonacularId);  // get 
    setRecipeInfo(info);
    // then set modal state
    setModalVisible(true)
    isLoading(false); 
  }
  if (loading ){
    return(
      <View style = {{flex:1 , justifyContent:'center', alignItems:'center', backgroundColor:appColors.bgColor}}>
        <ActivityIndicator size='large' color={appColors.accentColor}/>
    </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      {ingredients.length>0 ? (
        <View style = {styles.container}>
        <Text style ={styles.pageTitle}>Find Possible Recipes!</Text>
        <TouchableOpacity  onPress = {fetchRecipes}  style={{alignItems:'center', paddingBottom:5,}}>
            <Feather name="refresh-cw" size={40} color={appColors.accentColor} />
         </TouchableOpacity>
        
        <FlatList
        
        data={recipes}
        
        renderItem={({item})=>{
          return(
            <View style= {styles.recipeContainer}>
              <RecipeCard name={item.title} imagePath={item.image} missingIngredientCount={item.missedIngredientCount} onPress = {()=> launchRecipeInfo(item.id)} />
            </View>
          )
        }}
      /> 
      <Modal visible ={isModalVisible} animationType='fade' >
                <SafeAreaView style={{flex:1, padding:10, backgroundColor:appColors.bgColor}} >
                    <View style={{paddingTop:40, alignContent:'center'}}>
                      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <TouchableOpacity  onPress = {() => setModalVisible(false)} style={{flex:1}}> 
                          <AntDesign name="closesquare" size={42} color={appColors.accentColor} />
                        </TouchableOpacity>

                        <TouchableOpacity  onPress = {()=>saveNewRecipe()} > 
                          <MaterialIcons name="save-alt" size={42} color={appColors.accentColor} />
                        </TouchableOpacity>
                      </View>
                        {returnModalContent()}
                    </View>
                </SafeAreaView>
              </Modal>
        </View>
      ) :
      (
        <View style={styles.container}>
          <Text style= {styles.title}>
            Input Ingredients In Your Pantry Page To See Possible Recipes
          </Text>
        </View>
      ) }
    </SafeAreaView>
  )
}

export default ExprecipesPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:appColors.bgColor,
    alignContent:'center',
    paddingHorizontal:10,
  },
  recipeContainer: {
    flex: 1,
    alignContent:'center',
    padding:10,
    backgroundColor:appColors.bgColor,
  },
  timeContainer: {
    margin:10, 
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:10
    
  },
  item: {
    backgroundColor: appColors.primaryColor,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    textAlign:'center',
    fontWeight:'bold'
  },
  pageTitle: {
    fontSize: 26,
    textAlign:'center',
    fontWeight:'bold',
    color:appColors.secondaryColor,
    paddingBottom:5
  },
});