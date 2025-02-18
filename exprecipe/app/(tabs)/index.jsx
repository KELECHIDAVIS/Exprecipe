import { useEffect, useState } from "react";
import { Text, View, SafeAreaView, StyleSheet, FlatList, Pressable, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios'
import Ingredient from "../../components/ingredient";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
export default function PantryPage() {

  const [loaded, setLoaded] = useState(false); // should only get ingredients on app launch, so only do if if not loaded
  const [ingredients, setIngredients] = useState([])
  const [user, setUser] = useState(null)
  const [text, onChangeText] = useState("Enter Ingredient"); // for text input
  const apiUrl = process.env.EXPO_PUBLIC_API_URL
 

  //if this is the first time the user is opening the app, create a new user in the backend
  useEffect(()=>{
    const findUser = async () => {

      // first check if user exist in local storage
      try{
        const storedUser = await AsyncStorage.getItem("user"); 
        if(storedUser){// set user if exists 
          
          setUser(JSON.parse(storedUser));  // parse from string to object form 
          
        }else{ // first time user 
          
          // call backed to create new user 

          const response = await axios.post(apiUrl) // creates new  user 

          // retrieve user from response
          const userData = response.data


          // save new user 
          await AsyncStorage.setItem("user",  JSON.stringify(userData))

          // set user 
          setUser(userData); 
        }
      } catch(error){
        console.error("Error initializing user: "+error)
      }
    }

    findUser(); // call function
  }, []); 


  // load the user ingredients the first time they open the pantry page
  useEffect(()=>{
    const getIngrs=  async () =>{
        if(!loaded&&user){
          try {
              // retrieve user ingredients 

            const response = await axios.get(`${apiUrl}/${user.id}/ingredient`)
            
            const ingrList = response.data; // returns as a list 

            console.log("retrieved ingrlist: ",ingrList); 

            setIngredients(ingrList);
          } catch (error) {
            console.log("Error When Loading User Ingredients: "+error)
          } 

          setLoaded(true); // ingredients have been loaded 
        }
    }
    getIngrs();

  }, [user ,loaded]) // only call when not alr loaded and user is updated 


  // only render the actual stuff if it is loaded
  if(!loaded|| !user){
    return(
      <Text>Loading...</Text>
    ); 
  }
  
  function renderIngredients({item , index}) {
    console.log("item: ", item)
    return(
       <Ingredient name={item.name} imageURL={item.imageURL} possibleUnits={item.possibleUnits} amount={item.amount} unit={item.unit} />
    ); 
  } 

  return (
    <SafeAreaView style= {styles.page}>
      <View style={{padding:10, margin:10}}><Text>{"User "+ user.id}</Text></View>
      <View style={styles.subcontainer}>
        <View style={styles.inputContainer}>
          <TextInput style={{backgroundColor:'white'}}
            onChangeText={onChangeText}
            value={text}
          />
          <Pressable><AntDesign name="plussquare" size={24} color="green" /></Pressable>
        </View>
        
        <Pressable><MaterialCommunityIcons name="view-grid" size={24} color="grey" /></Pressable>
        <Pressable><Feather name="list" size={24} color="green" /></Pressable>
      </View>

      <View style={styles.subcontainer}>
        <FlatList 
        data = {ingredients}
        renderItem=  {renderIngredients}
        keyExtractor={ingr => ingr.id} 
        />
      </View>


    </SafeAreaView>

  );
}

var styles = StyleSheet.create({
  page:{ flex: 1, alignItems: "center", margin:10,},
  subcontainer:{flexDirection:"row", alignContent:'center', justifyContent:'space-between', gap:14},
  inputContainer:{flexDirection:"row"},
})
