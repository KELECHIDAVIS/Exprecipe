import { useEffect, useState } from "react";
import { Text, View, SafeAreaView, StyleSheet, FlatList, Pressable, TextInput, Modal } from "react-native";
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
  const [text, onChangeText] = useState(""); // for text input
  const [choiceOfIngrs, setChoiceOfIngrs] = useState([]); 
  const [modalVisible, setModalVisible] = useState(false); 
  const apiUrl = process.env.EXPO_PUBLIC_API_URL
 
  const ingrSearchAmt = 3; // amount of ingrs return after a recipe search

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
  
  // renders each ingredient as a ingredient card 
  function renderIngredients({item , index}) {
    console.log("item: ", item)
    return(
       <Ingredient name={item.name} imageURL={item.imageURL} possibleUnits={item.possibleUnits} amount={item.amount} unit={item.unit} />
    ); 
  } 

  // saves the chosen ingredient to the backend
  function addIngredient(chosenIngr){
    const createIngr = async ()=>{
      
      if(!chosenIngr)
      {
        console.log("Trying to enter add ingredient method while chosenIngr is null. Returning..."); 
        return
      }
      try {
        // save ingredient to db
        const response = await axios({
          method:'post',
          url:`${apiUrl}/${user.id}/ingredient`,
          headers:{},
          data:item  
        }); 
  
        const data = response.data ; // returns ingredient as in our custom ingredient form

        // add ingredient to ingredients list 
        setIngredients([data, ...ingredients]); 

        // after ingredient is added make chosen ingredient null and make sure modal is invisible

        
      } catch (error) {
        console.log("Error Adding Ingredient: ",error)
      }
      setModalVisible(false); 
    }

    createIngr(); 
  }

  // when plus is clicked, take name thats in text input then send through backend using ingredient search function
  function ingredientSearch (){
    // call backend with name 
    const searchIngredient = async ()=>{
      try{
        const response = await axios.get(`${apiUrl}/${user.id}/ingredient/search?search=${text}&number=${ingrSearchAmt}`); 
  
        const data = response.data ; 


        // launch modal with ingredient choices
        // if just one just return that one
        // if none then throw up a message saying you couldn't find an ingredient w/ that name

        if(data.length ==0 ){
          console.log("Ingredient With That Name Was Not Found ") // make a popup that let's the user know there isn't an ingredient 
          return; 
        }else if (data.length ==1 ){ // just choose ingredient
          addIngredient(data[0]); 
        }else{
          //launch choice modal which will then have the choice
          setChoiceOfIngrs(data) // list of spIngredients
          setModalVisible(true) // launch modal
        }

        // add chosen ingredient to ingredient list 
      }catch(error){
        console.log("Error searching that ingredient name: "+ error)
        console.log("url: ", `${apiUrl}/ingredient/search`)
      }
    }
    
    if(text.length>0)
      searchIngredient(); 
    onChangeText("") // clear text input 
  }
  return (
    <SafeAreaView style= {styles.page}>
      <View style={{padding:10, margin:10}}><Text>{"User "+ user.id}</Text></View>  

      <View style={styles.subcontainer}>

        {/*text input and button */}
        <View style={styles.inputContainer}>
          <TextInput style={{backgroundColor:'white', width:150,paddingLeft:10 }}
            onChangeText={newText=> onChangeText(newText)}
            clearTextOnFocus={true}
            value={text}
          />
          <Pressable onPress={ingredientSearch}><AntDesign name="plussquare" size={40} color="green" /></Pressable>
        </View>
        
        {/* grid and list formatting*/}
        <Pressable><MaterialCommunityIcons name="view-grid" size={40} color="grey" /></Pressable>
        <Pressable><Feather name="list" size={40} color="green" /></Pressable>
      </View>

      {/* ingredient list */}
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
  inputContainer:{flexDirection:"row",alignContent:'center',gap:4},
})
