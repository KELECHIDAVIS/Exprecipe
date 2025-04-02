import { View, Text, StyleSheet , SafeAreaView, Alert, FlatList, TouchableOpacity,Modal} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useState, useCallback } from 'react';
import Recipe from '../components/recipe';
import RecipeModal from '../components/recipeModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export default function SavedRecipePage() {
  const apiUrl =process.env.EXPO_PUBLIC_API_URL ;

  const [recipes , setRecipes] = useState([]); 
  const [ranking, setRanking] = useState(2); 

  const [user,setUser] = useState(null); 
  const [recipeInfoModalVisible, setRecipeInfoModalVisible] = useState(false); 
  const [recipeModalInfo, setRecipeModalInfo] = useState(null); 
  
  // everytime we go onto this page we should get the saved ingredients 
  useFocusEffect(
    useCallback(() => {

      
      fetchRecipes(); 

      return () => {

      };
    }, [])
  );

  const fetchRecipes = async () =>{
    // get user from local data then request their saved user recipes 
    try{
      const storedUser = await AsyncStorage.getItem('user'); 
      const parsedUser = JSON.parse(storedUser); 
      setUser(parsedUser)
      const response = await axios.get(`${apiUrl}/${parsedUser.id}/recipe`)


      setRecipes(response.data); 
    }catch(error){
      Alert.alert("Error when fetching saved recipes. Please try again") 
      console.log("Error when fetching saved recipes. Please try again"); 
    }
  }
   // when recipe card is clicked, get the recipe fully detailed recipe info using condensed info  
   const openInfoModal = async (item)=>{
    if(user)
    {
      // make request based on user, and options
      const url = `${apiUrl}/${user.id}/recipe/information?recipeId=${item.spID}`; 

      const response = await axios.get(url)    
      
      const modalInfo = response.data; 


      setRecipeModalInfo(modalInfo)
      setRecipeInfoModalVisible(true); 


    }else{
      Alert.alert("User couldn't be found. Please Try Again")
    }
  }
  
  const closeInfoModal=()=>{
    setRecipeInfoModalVisible(false); 
    setRecipeModalInfo(null);
  }
  return (
    <SafeAreaView style={styles.container}>
      {/** Recipe List Container */}
      <FlatList 
              style={styles.recipeListContainer}
              contentContainerStyle={{alignItems:'center', justifyContent:'center'}}
              data={recipes}
              extraData={recipes}
              renderItem={({item}) =>(
                <TouchableOpacity onPress={()=>openInfoModal(item.recipe)}>
                  <Recipe recipeData={item.recipe}  isSavedRecipe={true}/>
                </TouchableOpacity>
              )}
          
              keyExtractor={(item) => item.id}

      />
      {/** Recipe Info Modal  */}
      <Modal
                animationType='fade'    
                transparent= {true}
                visible={recipeInfoModalVisible}
                onRequestClose={closeInfoModal}
            > 
                <RecipeModal

                  recipeInfo={recipeModalInfo}
                  closeInfoModal={closeInfoModal}
                  userID={user? user.id : null}
                />
            </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeListContainer:{
    flex:9,
    width:'100%',
  },
});
