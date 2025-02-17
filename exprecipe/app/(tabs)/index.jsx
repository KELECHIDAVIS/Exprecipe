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
 


const testGET = async ()=> {
  try{
    const response = await axios.get(apiUrl); 
    
    console.log("Request has been made"); 
    console.log(response.data)
  }catch(error){
    console.log("Error: "+error)
  }
}

useEffect(()=>{
  testGET(); 
},[])
  // if this is the first time the user is opening the app, create a new user in the backend
  // useEffect(()=>{
  //   const findUser = async () => {
  //     console.log("ENTERING FUNCTION")
  //     // first check if user exist in local storage
  //     try{
  //       const storedUser = await AsyncStorage.getItem("user"); 

  //       if(storedUser){// set user if exists 
          
  //         setUser(JSON.parse(storedUser));  // parse from string to object form 
        
  //       }else{ // first time user 
          
  //         // call backed to create new user 
          
          
  //         console.log("api url: "+ apiUrl)

  //         const response = await fetch("http://"+apiUrl, { method: 'POST'})

  //         if(!response.ok){
  //           throw new Error ("HTTP ERROR! status: "+response.status)
  //         }
  //         // retrieve user from response
  //         const userData = await response.json()

  //         // save new user 
  //         await AsyncStorage.setItem("user",  JSON.stringify(userData))

  //         // set user 
  //         setUser(userData); 
  //       }
  //     } catch(error){
  //       console.error("Error initializing user: "+error)
  //     }
  //   }

  //   findUser(); // call function
  //   console.log(JSON.stringify(user))
  // }, []); 




   
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
