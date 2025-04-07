import React, { useState , useEffect} from 'react';
import {SafeAreaView, View, Switch,Alert,  FlatList, Text, Modal, TouchableOpacity, StyleSheet, ScrollView, TextInput,Keyboard } from 'react-native';
import { AccordionItem } from '../../components/AccordionItem';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { RadioButton } from 'react-native-paper';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import cuisineData from '../../assets/cuisineData';
import mealTypeData from '../../assets/mealTypeData';
import { dietData } from '../../assets/dietData';
import { intolerancesData } from '../../assets/intolerancesData';
import RecipeModal from '../../components/recipeModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Recipe from '../../components/recipe';
export default function ComplexRecipePage() {

  const [recipes , setRecipes] = useState([]); 
  const [recipeInfoModalVisible, setRecipeInfoModalVisible] = useState(false); 
  const [recipeModalInfo, setRecipeModalInfo] = useState(null); 
  const [condensedRecipeInfo, setCondensedRecipeInfo] = useState(null); 
  const [user, setUser] = useState(null) ; // use full api calls and dietary prefs
  
  const apiUrl =process.env.EXPO_PUBLIC_API_URL ;
  // filtering options
  const [cuisines, setCuisines]  = useState([]); 
  const [mealType, setMealType]= useState("main course")
  const [numResults, setNumResults] = useState(5); 
  const [ignorePantry, setIgnorePantry] = useState(true); 
  const [diets , setDiets] = useState([]); 
  const [intolerances, setIntolerances] = useState([]); 
  const [ingredients, setIngredients ] = useState([]); 
  const [maxReadyTime , setMaxReadyTime ] = useState(120) ; // in mins 
  const [minServings , setMinServings]  = useState(1) ; 
  const [sort , setSort] = useState('min-missing-ingredients') // min missing or max used ingredients
  const [isFilterModalVisible , setFilterModalVisible] = useState(false); 

  // when page is rendered for the first time want to get user from local storage
  useEffect(()=>{
    const retrieveUser = async ()=>{
      // get user from localStorage 
      try {
        const storedUser= await AsyncStorage.getItem("user"); // should be there since confirmed on pantry page
        setUser(JSON.parse(storedUser)); 
      } catch (error) {
        Alert.alert("Error when retrieving user")
        console.log("Error when retrieving user: ", error.message); 
      }
    }
    retrieveUser(); 
  },[]); 

  // ensure recipe flatlist rerenders when changed 
  useEffect(() => {
    //console.log("Recipes updated: ", recipes.length," recipes")
  }, [recipes]);


  const searchRecipes = async () =>{
    // only call if user is present
    if(user){
      try {
        // make request based on user, and options, max results is 100
        const url = `${apiUrl}/${user.id}/recipe/possible/complex?numberOfRecipes=${numResults}&sort=${sort}&ignorePantry=${ignorePantry}&cuisines=${cuisines.join(',')}&type=${mealType}&maxReadyTime=${maxReadyTime}&minServings=${minServings}&diets=${diets.join(',')}&intolerances=${intolerances.join(',')}`; 
        //console.log("URL: ", url)
        const response = await axios.get(url)


        const recipeList = response.data.results; // check the api response format 
        //console.log("Response: ",response.data)
        // setRecipes
        if(recipeList)
          setRecipes([...recipeList]); 
      } catch (error) {
        Alert.alert("Error Searching Ingredients. Please Try Again")
        console.log("Error searching ingredients: ", error.message); 
      }
    }else{
      Alert.alert("User couldn't be found. Please Try Again")
    }
  }

  function launchFilterModal (){
    setFilterModalVisible(true); 
  }
  function closeModal(){
    setFilterModalVisible(false); 
  }

  // when recipe card is clicked, get the recipe fully detailed recipe info using condensed info  
  const openInfoModal = async (item)=>{
    if(user)
    {
      // make request based on user, and options
      const url = `${apiUrl}/${user.id}/recipe/information?recipeId=${item.id}`; 

      const response = await axios.get(url)    
      
      const modalInfo = response.data; 

      setRecipeModalInfo(modalInfo)
      setCondensedRecipeInfo(item); // for remembering the used and missing ingredients 

      setRecipeInfoModalVisible(true); 
    }else{
      Alert.alert("User couldn't be found. Please Try Again")
    }
  }

  const closeInfoModal=()=>{
    setRecipeInfoModalVisible(false); 
    setRecipeModalInfo(null);
    setCondensedRecipeInfo(null) 
  }
  return (
    
    <SafeAreaView style= {styles.background}>
      <View style={styles.filterAndSearchContainer}>
        <TouchableOpacity style={styles.filterContainer} onPress={launchFilterModal}>
          <Text style={styles.editFilterText}>Edit Filters</Text>
          {/* <Ionicons name="filter" size={24} color="black" /> */}
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'green'}} onPress={searchRecipes}>
          <AntDesign name="search1" size={42} color="white" />
        </TouchableOpacity>
      </View>

      {/** Recipe List Container */}
      <FlatList 
              style={styles.recipeListContainer}
              contentContainerStyle={{alignItems:'center', justifyContent:'center'}}
              data={recipes}
              extraData={recipes}
              renderItem={({item}) =>(
                <TouchableOpacity onPress={()=>openInfoModal(item)}>
                  <Recipe recipeData={item} ranking={sort} isSavedRecipe={true} /> 
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
                  usedIngredients={condensedRecipeInfo? condensedRecipeInfo.usedIngredients: null}
                  missingIngredients={condensedRecipeInfo? condensedRecipeInfo.missedIngredients : null}
                  closeInfoModal={closeInfoModal}
                  userID={user? user.id : null}
                />
      </Modal>
      {/** Filtering Modal */}
      <Modal visible= {isFilterModalVisible}
        onRequestClose={()=>setFilterModalVisible(false)}
        transparent= {true}
      >
          <SafeAreaView style={styles.modalBackground}>
            <TouchableOpacity style={[styles.filterContainer, {marginBottom:20}]} onPress={closeModal}>
              <Text style= {styles.editFilterText}>Apply Filters</Text>
              <Feather name="check" size={24} color="green" />
            </TouchableOpacity>

            <AccordionItem title={"Simple"}>
              {/**Sort  */}
              <Text style = {styles.headerTitle}>Sort: </Text>
              <View>
                <RadioButton.Group onValueChange={newVal => setSort(newVal)} value= {sort}>
                  <View>
                    <RadioButton.Item label='Minimize Missing Ingredients' value='min-missing-ingredients'/>
                    <RadioButton.Item label='Maximize Used Ingredients' value='max-used-ingredients'/>
                  </View>
                </RadioButton.Group>
              </View>

              {/**Number Of results  */}
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style = {styles.headerTitle}>Num. Results: </Text>
                <TextInput style={styles.resultsTextInput} keyboardType='number-pad' onChangeText={setNumResults} value={numResults} placeholder={""+numResults}
                 onSubmitEditing={Keyboard.dismiss}
                 placeholderTextColor="black"
                 />
              </View>

              {/**Ignore Pantry  */}
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style = {styles.headerTitle}>IgnorePantry: </Text>
                <Switch
                    trackColor={{false: 'grey', true: '#f4f3f4'}}
                    thumbColor={ignorePantry ? 'green' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={setIgnorePantry}
                    value={ignorePantry}
                  />
              </View>
              {/**Max ReadyTime */}
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style = {styles.headerTitle}>Max Cook Time: </Text>
                <TextInput style={styles.resultsTextInput} keyboardType='number-pad' onChangeText={setMaxReadyTime} value={maxReadyTime} placeholder={""+maxReadyTime}
                 onSubmitEditing={Keyboard.dismiss}
                 placeholderTextColor="black"
                 />
              </View>
              {/**Min Servings */}
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style = {styles.headerTitle}>Min. Servings: </Text>
                <TextInput style={styles.resultsTextInput} keyboardType='number-pad' onChangeText={setMinServings} value={minServings} placeholder={""+minServings}
                 onSubmitEditing={Keyboard.dismiss}
                 placeholderTextColor="black"
                 />
              </View>
            </AccordionItem>

            
            <AccordionItem title={"Meal Types"}>
              {/**Cuisines  */}
              <Text style = {styles.headerTitle}>Cuisines: </Text>
              <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={cuisineData}
                search
                maxHeight={300}
                labelField="label"
                valueField="label"
                placeholder="Select Cuisines"
                searchPlaceholder="Search Cuisine ..."
                value={cuisines}
                onChange={item => {
                  console.log("Cuisines: ",item)
                  setCuisines([...item]);
                }}
                selectedStyle = {styles.selectedStyle}
                
              />
              {/**Meal Type  */}
              <Text style = {styles.headerTitle}>Meal Type: </Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={mealTypeData}
                search
                maxHeight={300}
                labelField="label"
                valueField="label"
                placeholder="Select Meal Type"
                searchPlaceholder="Search Meal Type ..."
                value={mealType}
                onChange={item => {
                  console.log("Meal Type: ", item.label)
                  setMealType(item.label); 
                }}
                selectedStyle = {styles.selectedStyle}
                
              />
            </AccordionItem>

            
            <AccordionItem title={"Dietary Exclusions"} >
              {/**Diets  */}
              <Text style = {styles.headerTitle}>Diets: </Text>
              <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={dietData}
                search
                maxHeight={300}
                labelField="label"
                valueField="label"
                placeholder="Select Diets"
                searchPlaceholder="Search Diet ..."
                value={diets}
                onChange={item => {
                  console.log("Diets: ",item)
                  setDiets([...item]);
                }}
                selectedStyle = {styles.selectedStyle}
                
              />
              {/**Intolerances  */}
              <Text style = {styles.headerTitle}>Intolerances: </Text>
              <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={intolerancesData}
                search
                maxHeight={300}
                labelField="label"
                valueField="label"
                placeholder="Select Intolerances"
                searchPlaceholder="Search Intolerances ..."
                value={intolerances}
                onChange={item => {
                  console.log("Intolerances: ", item)
                  setIntolerances([...item]); 
                }}
                selectedStyle = {styles.selectedStyle}
                
              />
            </AccordionItem>
          </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background:{ flex:1 , alignItems:'center',  marginTop:32},
  filterAndSearchContainer: {flexDirection:'row', gap:8},
  filterContainer: {borderWidth: 1, borderColor:'green' , justifyContent:'center', flexDirection:'row', alignItems:'center'},
  editFilterText:{color:'black', padding:5, fontSize:18},
  modalBackground:{ flex:1 , alignItems:'center',   backgroundColor:'white'},
  headerTitle:{fontWeight:'500',fontSize:24, padding:5},
  resultsTextInput:{
    borderWidth:1,
    padding:5
  }, 
  container: { padding: 16 },
    dropdown: {
      height: 50,
      width:256,
      backgroundColor: 'transparent',
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
      marginBottom:10
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 14,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    icon: {
      marginRight: 5,
    },
    selectedStyle: {
      borderRadius: 12,
    },
    recipeListContainer:{
      flex:9,
      width:'100%',
    },
})