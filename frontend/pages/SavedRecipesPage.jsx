import React, { useEffect } from 'react';
import { SafeAreaView,FlatList,  View, Text, Image , TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import { useDispatch } from 'react-redux';
import { getSavedRecipes } from '../features/recipes/recipeSlice';
import { useSelector } from 'react-redux';
import SavedRecipeCard from '../components/SavedRecipeCard';
function SavedRecipesPage({navigation}) {

  const dispatch = useDispatch();
  const {savedRecipes, isLoading} = useSelector((state)=>state.recipes)
  const baseRecipeImageURL = 
  // Dispatch the function to get saved recipes when the component mounts or when navigation focus changes
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getSavedRecipes()); // Dispatch your action to get saved recipes
    });

    // Clean up the event listener
    return unsubscribe;
  }, [dispatch, navigation]);

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
              <SavedRecipeCard name={item.name} image={item.image}/>
            </View>
          )
        }}
      />
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