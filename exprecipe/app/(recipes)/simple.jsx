import {Alert,  View, Text, StyleSheet, SafeAreaView, Pressable, Switch, FlatList, TextInput, Keyboard , TouchableWithoutFeedback, Modal, Button} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { RadioButton } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export default function SimpleRecipesPage() {

  const [recipes , setRecipes] = useState([]); 
  const [numResults, setNumResults] = useState(10); // 1-100 
  const [ranking, setRanking] = useState('2') // (1) maximize used ingrs , (2) minimize missing ingredients
  const [ignorePantry, setIgnorePantry] = useState(true);  // assume user has common ingrs like water, salt, flour, 
  const [isRankModalVisible, setRankModalVisible] = useState(false); 
  const [isIgnoreModalVisible, setIgnoreModalVisible] = useState(false); 
  const [user, setUser] = useState(null) ; // use full api calls and dietary prefs
  const apiUrl =process.env.EXPO_PUBLIC_API_URL ;
  
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


  const searchRecipes = async () =>{
    // only call if user is present
    if(user){
      try {
        // make request based on user, and options
        const url = `${apiUrl}/${user.id}/recipe/possible?numberOfRecipes=${numResults}&ranking=${ranking}&ignorePantry=${ignorePantry}`; 
        console.log(url); 
        // const response = await axios.get(url)

        // // returns a list of recipe objects 
        // const recipeList = response.data; 

        // if(recipeList)
        //   setRecipes(recipeList); 
      } catch (error) {
        Alert.alert("Error Searching Ingredients. Please Try Again")
        console.log("Error searching ingredients: ", error.message); 
      }
    }else{
      Alert.alert("User couldn't be found. Please Try Again")
    }
  }

  return (
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.backgroundContainer} >
            {/* Filtering Option @ Top  */}
            <View style={styles.filterAndSearchContainer}> 
              <View style={styles.filterContainer}>
                <View style={styles.innerOptionsFormat}>
                  <Text style={styles.filterText}>Results</Text>
                  <TextInput style={styles.resultsTextInput} keyboardType='number-pad' onChangeText={setNumResults} value={numResults} placeholder="10" onSubmitEditing={Keyboard.dismiss} />
                </View>

                {/**The other two launch modals where the user can get more info and customize their search= */}
                <Pressable style={styles.innerOptionsFormat} onPress={()=> {setRankModalVisible(true)} }>
                  <Text style={styles.filterText}>Ranking</Text>
                  <FontAwesome name="sort" size={24} color="black" />
                </Pressable>
                <Pressable style={styles.innerOptionsFormat} onPress={()=> {setIgnoreModalVisible(true)}} >
                  <Text style={styles.filterText}>IgnorePantry?</Text>
                  {ignorePantry ? (<Feather name="check" size={24} color="green" />): (<Feather name="x" size={24} color="red" />) }
                </Pressable>
              </View>
              <Pressable style={styles.searchButton} onPress={searchRecipes}>
                <AntDesign name="search1" size={36} color="white" />
              </Pressable>
            </View>
        
            {/** Recipe List Container */}
            <FlatList 
              style={styles.recipeListContainer}
              data={recipes}
              extraData={recipes}
              renderItem={item=><Text>{item.title}</Text>}
              keyExtractor={item => item.id}

            />

            {/** Rank Modal  */}
            <Modal
              animationType='fade'
              transparent  = {true}
              visible = {isRankModalVisible}
              onRequestClose={()=>{ setRankModalVisible(false)}}
            >
              <View style = {styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style>Choose Ranking Method</Text>

                <RadioButton.Group onValueChange={newVal => setRanking(newVal)} value= {ranking}>
                  <View>
                    <RadioButton.Item label='Minimize Missing Ingredients' value='2'/>
                    <RadioButton.Item label='Maximize Used Ingredients' value='1r'/>
                  </View>
                </RadioButton.Group>
                
                <Button onPress={()=> setRankModalVisible(false)} title='Confirm'></Button>
                </View>
              </View>
            </Modal>

            {/** Ignore Pantry Modal  */}
            <Modal
              animationType='fade'
              transparent  = {true}
              visible = {isIgnoreModalVisible}
              onRequestClose={()=>{ setIgnoreModalVisible(false)}}
            >
              <View style = {styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={{padding:20, textAlign:'center'}}>Ignore Common Pantry Ingredients Like Water, Salt, Flour, etc? </Text>
                <View style={{flexDirection:'row', gap:10, justifyContent:'center' , alignItems:'center' , padding:10}}>
                  <Text style={styles.filterText}>No</Text>
                  <Switch
                    trackColor={{false: 'grey', true: '#f4f3f4'}}
                    thumbColor={ignorePantry ? 'green' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={setIgnorePantry}
                    value={ignorePantry}
                  />
                  <Text style={styles.filterText}>Yes</Text>
                </View>
                <Button onPress={()=> setIgnoreModalVisible(false)} title='Confirm'></Button>
                </View>
              </View>
            </Modal>
          </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterAndSearchContainer:{
    marginVertical:20,
    flexDirection:'row',
    borderColor:'green',
    borderWidth:1,
    width:'100%',  
  },
  filterContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    flex:9,
    alignItems:'center',
    marginHorizontal:5
  },
  searchButton:{
    backgroundColor:'green',
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  recipeListContainer:{
    flex:9
  },
  filterText:{ 
    fontSize:16
   },
  innerOptionsFormat:{
    flexDirection:'row',
    alignItems:'center',
    gap:8
  },
  resultsTextInput:{
    width: 28,
    backgroundColor:"white",
    borderWidth:1,
  }, 
  modalView:{
    margin: 20,
    backgroundColor: 'beige',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  modalContainer:{
    flex:1,
    alignItems:"center",
    justifyContent:'center'
  }
});
