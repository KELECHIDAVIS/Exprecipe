import React, { useEffect, useState } from 'react';
import { SafeAreaView,FlatList,  View, Text, Image , TouchableOpacity, StyleSheet, ActivityIndicator, Modal, Button} from 'react-native';
import { useDispatch } from 'react-redux';
import { getSavedRecipes, setCurrentSavedRecipe } from '../features/recipes/recipeSlice';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SavedRecipeCard from '../components/SavedRecipeCard';
function SavedRecipesPage({navigation}) {

  const dispatch = useDispatch();
  const {savedRecipes, isLoading} = useSelector((state)=>state.recipes)
  const [currentRecipe ,setCurrentRecipe] = useState(null); 
  const [isModalVisible, setModalVisible] = useState(false); 
  const baseRecipeImageURL = "https://spoonacular.com/cdn/ingredients_100x100/"
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
  if(isLoading)
    {
      return(
        <View style = {{flex:1 , justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size='large'/>
      </View>
      )
    }
  return (
    <SafeAreaView style={{flex: 1,
      justifyContent:'center',
      alignContent:'center',
      padding:10,}}>
      <FlatList
        data= {savedRecipes}
        renderItem={({item}) => {
          return(
            <View style= {styles.container}>
              <SavedRecipeCard name={item.name} image={item.image} onPress= {()=>launchSavedRecipeModal(item)}/>
            </View>
          )
        }}
      />
      <Modal visible={currentRecipe!==null}  >
        <SafeAreaView>
          <Button title="Close" onPress={()=> setCurrentRecipe(null)}/>
          <Text>Saved Recipe Modal</Text>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  )
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
    fontSize: 24,
    textAlign:'center',
    fontWeight:'bold'
  },
}); 