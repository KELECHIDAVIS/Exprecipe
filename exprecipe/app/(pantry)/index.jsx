import { useEffect, useState } from "react";
import { Text, View, SafeAreaView, StyleSheet, FlatList, Pressable, TextInput, Modal ,Switch, Alert, Keyboard, Image} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios'
import Ingredient from "../../components/ingredient";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter, useLocalSearchParams } from "expo-router";

import { usePantryStore } from "./store";


export default function PantryPage() {
  const apiUrl =process.env.EXPO_PUBLIC_API_URL ;
  
  const [loaded, setLoaded] = useState(false); // should only get ingredients on app launch, so only do if if not loaded
  const [ingredients, setIngredients] = useState([])
  const [user, setUser] = useState(null)
  const [text, onChangeText] = useState(""); // for text input
  const [isAutoCompleteOn, toggleAutoComplete] = useState(false); 
  const [choiceOfIngrs, setChoiceOfIngrs] = useState([]); 
  const [ingrChoiceModal, setChoiceModalVisible] = useState(false);
  const [ingrInfoModal, setIngrInfoModalVisible] = useState(false); 
  const [scannedIngrModal, setScannedModalVisible] = useState(false); 
  
  
  // for ingrInfo modal 
  const [ingrInfo , setIngrInfo] = useState(null); // for the modal that allows the person to update amount and unit 
  let possibleUnits = ingrInfo?.possibleUnits || []; // for ingrInfo
  const [ingrAmt, setIngredientAmount]   = useState(0); 
  // Dropdown state
  const [open, setOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(possibleUnits.length > 0 ? possibleUnits[0] : '');
  const [items, setItems] = useState(possibleUnits.map(unit => ({ label: unit, value: unit })));
  const ingrSearchAmt = 3; // amount of ingrs return after a recipe search
  
  // for navigation 
  const router = useRouter(); 

  //for retrieving scanned ingredients from camera page 
  const {scannedIngredients , removeScannedIngredient, clearScannedIngredients} = usePantryStore(); 

  useEffect(()=>{
    if(scannedIngredients.length > 0){
      setTimeout(() => setScannedModalVisible(true), 50); // Force re-render so modal appears 
    }
  }, [scannedIngredients])

 

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

            //console.log("retrieved ingrlist: ",ingrList); 

            setIngredients(ingrList);
          } catch (error) {
            console.log("Error When Loading User Ingredients: "+error)
          } 

          setLoaded(true); // ingredients have been loaded 
        }
    }
    getIngrs();

  }, [user ,loaded]) // only call when not alr loaded and user is updated 


  useEffect(()=>{
    if(choiceOfIngrs.length ==0){ // make sure the modal is updated accordingly 
      setChoiceModalVisible(false); 
    }else{
      setChoiceModalVisible(true); 
    }
  }, [choiceOfIngrs])

  // open the modal if selected ingredients is selected 
  useEffect(()=>{ 
    if(!ingrInfo){
      setIngredientAmount(0)  ; 
      setSelectedUnit(""); 
      setIngrInfoModalVisible(false)
    }else{
      possibleUnits = ingrInfo.possibleUnits; // set possibleUnits
      setSelectedUnit(possibleUnits[0])
      setItems(possibleUnits.map(unit => ({ label: unit, value: unit }))); 
      setIngrInfoModalVisible(true); 
    }
  }, [ingrInfo])
  // only render the actual stuff if it is loaded
  if(!loaded|| !user){
    return(
      <Text>Loading...</Text>
    ); 
  }
  function openInfoModal(ingr){
    setIngrInfo(ingr) // ingr use state will be updated 
  }
  // renders each ingredient as a ingredient card 
  function renderIngredients({item , index}) {
    return(
       <Ingredient name={item.name} imageURL={item.imageURL} possibleUnits={item.possibleUnits} amount={item.amount} unit={item.unit} openInfoModal={()=>openInfoModal(item)}/>
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
          data:chosenIngr  
        }); 
  
        const data = response.data ; // returns ingredient as in our custom ingredient form

        // add ingredient to ingredients list 
        setIngredients([data, ...ingredients]); 

        // after ingredient is added make chosen ingredient null and make sure modal is invisible

        
      } catch (error) {
        console.log("Error Adding Ingredient: ",error)
      }
      setChoiceOfIngrs([]); // clear choice of ingredients in turn closing the modal
    }

    createIngr(); 
  }

  // when plus is clicked, take name thats in text input then send through backend using ingredient search function
  function ingredientSearch (){
    // call backend with name 
    const searchIngredient = async ()=>{

      // collapse ingredient 
      Keyboard.dismiss(); 
      try{
        
        // trim of possible white space off of text 
        const ingrName = text.trim(); 
        const response = await axios.get(`${apiUrl}/${user.id}/ingredient/search?search=${ingrName}&number=${ingrSearchAmt}`); 
  
        const data = response.data

        // launch modal with ingredient choices
        // if just one just return that one
        // if none then throw up a message saying you couldn't find an ingredient w/ that name
        if(data.length ==0 ){
          Alert.alert("Ingredient With That Name Was Not Found")
          console.log("Ingredient With That Name Was Not Found ") // make a popup that let's the user know there isn't an ingredient 
          return; 
        }else if (data.length ==1 || isAutoCompleteOn){ // just choose the first ingredient 
          addIngredient(data[0]); 
        }else{
          //launch choice modal which will then have the choice

          setChoiceOfIngrs(data) // list of spIngredients
          // the use state will update based on choice ingrs 
        }

        // add chosen ingredient to ingredient list 
      }catch(error){
        console.log("Error searching that ingredient name: "+ error)
      }
    }
    
    if(text.length>0)
      searchIngredient(); 
    onChangeText("") // clear text input 
  }

  function updateIngrInfo(){
    Keyboard.dismiss()
    const updateRequest = async ()=>{

      // change ingr's amt and unit
      let currIngr = ingrInfo ; 
      currIngr.amount = ingrAmt; 
      currIngr.unit = selectedUnit; 

      // make backend request to update user's ingredient
      try{
        const ingrReponse = await axios({
          method:'put',
          url:`${apiUrl}/${user.id}/ingredient/${currIngr.id}`,
          data:currIngr,
        })
      }catch(error){
        console.log("Error updating ingredient amount/unit")
      }
      // make sure modal is gone
      setIngrInfo(null); 
    }

    updateRequest(); 
  }

  function deleteIngredient(){
    const deleteRequest = async ()=>{
      //make request to delete the current ingredient 
      try{
        const ingrReponse = await axios({
          method:'delete',
          url:`${apiUrl}/${user.id}/ingredient/${ingrInfo.id}`,
        })
      }catch(error){
        console.log("Error updating ingredient amount/unit")
      }
      //remove ingredient from viewed list using ingredient id 
      setIngredients(ingredients.filter(item=>item.id != ingrInfo.id))
      // make sure modal is gone
      setIngrInfo(null); 
    } 
    
    deleteRequest(); 
  }

  // when user presses scanner button navigate to camera page 
  function launchCamera(){
    router.push(`/camera?id=${user.id}`); 
  }

  // saves the list of scanned ingredients and closes the modal 
  function saveScannedIngredients(){
    console.log("saved scanned Ingredients")
    const saveRequest = async() =>{
      try {
        // send list of ingredients to backend and add list of ingredients to current list after it is saved to backend
        console.log("scannedIngredients: ", scannedIngredients); 
        const response = await axios({
          method:'post',
          url:`${apiUrl}/${user.id}/ingredient/list`,
          data:scannedIngredients, 
        })
        
        const addedIngrsList = response.data; 
        console.log("reponse list: ", addedIngrsList); 
        
        // add to ingr list to front of the list 
        setIngredients(prevIngredients=> [...addedIngrsList , ...prevIngredients])

        clearScannedIngredients(); // clear the scannedIngredients
      } catch (error) {
        console.log("Error When Saving Scanned Ingredients: ", error.message); 
      }
    }

    saveRequest(); 
    setScannedModalVisible(false); 
  }
  return (
    <SafeAreaView style= {styles.page}>

      {/** auto complete toggle switch */}
      <View style={styles.autoCompleteContainer}>
        <Text>Auto Complete? : </Text>
        <Switch
          trackColor={{false: 'grey', true: '#f4f3f4'}}
          thumbColor={isAutoCompleteOn ? 'green' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleAutoComplete}
          value={isAutoCompleteOn}
        />
      </View>

       

      <View style={styles.subcontainer}>
        
        {/*text input and button */}
        <View style={styles.inputContainer}>
          <TextInput style={{backgroundColor:'white', width:150,paddingLeft:10 }}
            onChangeText={newText=> onChangeText(newText)}
            clearTextOnFocus={true}
            value={text}
          />
          <Pressable onPress={()=>{ingredientSearch()}}><AntDesign name="plussquare" size={40} color="green" /></Pressable>
        </View>
        
        {/* grid and list formatting
        <Pressable><MaterialCommunityIcons name="view-grid" size={40} color="grey" /></Pressable>
        <Pressable><Feather name="list" size={40} color="green" /></Pressable> */}
      </View>

      {/* ingredient list */}
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf:"center"}}>
        <FlatList 
        data = {ingredients}
        extraData={ingredients}
        numColumns={4}
        renderItem=  {renderIngredients}
        keyExtractor={ingr => ingr.id} 
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        
        />
      </View>
      
      {/**Modal for ingredient choice after search  */}
      <Modal
        visible={ingrChoiceModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setChoiceModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: 300, padding: 20, backgroundColor: 'beige', borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Choose an Ingredient:</Text>
            <FlatList
              data={choiceOfIngrs}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    //add selected ingredient to ingredient list 
                    addIngredient(item); 
                  }}
                >
                  <Text style={{ fontSize: 16, padding: 10, borderBottomWidth: 1 }}>{item.name}</Text>
                </Pressable>
              )}
            />
            <Pressable onPress={() => setChoiceModalVisible(false)} style={{ marginTop: 20, alignSelf: 'flex-end' }}>
              <Text style={{ color: 'green' }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      
      {/**Modal displaying scanned ingredients */}
      <Modal
        visible={scannedIngrModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setScannedModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: 300, padding: 20, backgroundColor: 'beige', borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Verify Detected Ingredients:</Text>
            <FlatList
              data={scannedIngredients}
              extraData={scannedIngredients}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => (
                <View style={{flex: 1 , flexDirection:'row', justifyContent:'center'}}>
                  <Text style={{ fontSize: 16, padding: 10, borderBottomWidth: 1 }}>{item}</Text>
                  <Pressable onPress={()=>{removeScannedIngredient(item)}} style={{ alignSelf: 'flex-end' }}>
                    <MaterialIcons name="delete" size={24} color="red" />
                  </Pressable>
                </View>
              )}
            />
            <Pressable onPress={saveScannedIngredients} style={{ marginTop: 20, alignSelf: 'flex-end' }}>
              <Text style={{ color: 'green' }}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/**Ingredient Info Modal */}
      <Modal
        visible={ingrInfoModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIngrInfoModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: 300, padding: 20, backgroundColor: 'beige', borderRadius: 10, alignItems:'center' , gap:10}}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{ingrInfo?.name}</Text>
            {/** only render ingr image if it exist otherwise render image not fount  */}
            <Image source={ingrInfo? {uri:ingrInfo.imageURL}: require('../../assets/favicon.png')} style={styles.ingrInfoImage}/>
            
            {/**amount and unit view  */}
            <View style = {styles.infoUnitView}>
              <Text>Amount</Text>
              <TextInput style={styles.amountNumInput} keyboardType="numeric" 
                onChangeText={newAmt=> setIngredientAmount(newAmt)}
                clearTextOnFocus={true}
                value={ingrAmt}
              />
              <Text>Unit</Text>
              <DropDownPicker
              open={open}
              value={selectedUnit}
              items={items}
              setOpen={setOpen}
              setValue={setSelectedUnit}
              setItems={setItems}
              containerStyle={{ width: 100 }}
              style={{ backgroundColor: '#ffffff' }}
              dropDownContainerStyle={{ backgroundColor: '#fafafa' }}
              placeholder=""
              />
            </View>
            {/**save and delete ingr buttons*/}
            <View style={{  marginTop: 20 ,flexDirection:'row', width:'100%', justifyContent:'space-between', alignContent:'center'}}>
              <Pressable onPress={()=>{deleteIngredient()}} style={{ alignSelf: 'flex-start' }}>
                <MaterialIcons name="delete" size={40} color="red" />
              </Pressable>
              <Pressable onPress={()=>{updateIngrInfo()}} style={{  alignSelf: 'flex-end' }}>
                <AntDesign name="checksquare" size={36} color="green" />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Pressable style={styles.scanButton} onPress={launchCamera}>
        <Entypo name="camera" size={50} color="white" />
      </Pressable>
        
    </SafeAreaView>

  );
}

var styles = StyleSheet.create({
  page:{ flex: 1, alignItems: "center", margin:10,},
  subcontainer:{flexDirection:"row", alignContent:'center', justifyContent:'space-between', gap:14},
  inputContainer:{flexDirection:"row",alignContent:'center',gap:4},
  autoCompleteContainer: {flexDirection:'row', alignContent:'center'},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'beige',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent:'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  ingrInfoImage:{width:50, height:50},
  infoUnitView:{flexDirection:'row', gap:16, alignItems:'center'},
  amountNumInput:{width:30, height:30, backgroundColor:'white'},
  unitPicker: { width:120, height:40, backgroundColor:'white'},
  scanButton:{
    position:'absolute',
    bottom:12,
    width:80,
    height:80,
    backgroundColor:'green',
    borderRadius:50,
    alignItems:"center",
    justifyContent:'center'
  }
})
