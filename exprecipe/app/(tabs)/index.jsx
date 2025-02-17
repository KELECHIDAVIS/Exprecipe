import { useEffect, useState } from "react";
import { Text, View, SafeAreaView, StyleSheet} from "react-native";
import { Pressable, TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios'
export default function PantryPage() {
  const [loaded, setLoaded] = useState(false); // should only get ingredients on app launch, so only do if if not loaded
  const [ingredients, setIngredients] = useState([])
  const [user, setUser] = useState(null)
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




   
  return (
    <SafeAreaView style= {styles.page}>

      <View style={styles.subcontainer}>
        <TextInput style={{backgroundColor:'white'}}></TextInput>
        <Pressable>Enter</Pressable>
        <Pressable>Scan</Pressable>
      </View>

    </SafeAreaView>

  );
}

var styles = StyleSheet.create({
  page:{ flex: 1, alignItems: "center", margin:10,},
  subcontainer:{flexDirection:"row", alignContent:'center', justifyContent:'space-between', gap:8}
})
