import { View, Text, Pressable ,SafeAreaView,StyleSheet , Button ,Image} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';


import { useState, useEffect, useRef } from 'react';
import { useRouter , useLocalSearchParams} from "expo-router";
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef(null); // camera's ref 
  const [uri, setUri] = useState(null);
  const router = useRouter();
  const apiUrl =process.env.EXPO_PUBLIC_API_URL ;
  const {id} = useLocalSearchParams(); 

  if (!permission) {
    // Camera permissions are still loading.
    return <View styles={styles.container}><Text>Permissions Loading...</Text></View>;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Button onPress={requestPermission} title="Grant Camera Permission" />
      </View>
    );
  }

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    setUri(photo?.uri);
  };

  const renderCamera = ()=>{
    return(
      <CameraView style={styles.camera} ref={ref}>
        <SafeAreaView style={{margin:5}}>
          <Pressable onPress={()=>{router.back()}}><Text style={styles.text}> Cancel</Text></Pressable>
        </SafeAreaView>
        <Pressable onPress={takePicture} style={{backgroundColor:'white', width:85, height:80, borderRadius:50, position:'absolute', bottom:40, alignSelf:'center'}}      ></Pressable>
      </CameraView>
    )
  }

  const detectIngredients = async ()=>{
    // first turns uri into image
    try {
      // first get user from local storage
      const file = {uri: uri, name: 'image.jpg', type:'image/jpeg'}
      const formData = new FormData(); 
      formData.append("image", file)

      const response = await axios.post(
        `${apiUrl}/${id}/ingredient/detect`,
        formData,
        {
          headers:{
            "Content-Type":"multipart/form-data"
          },
        }
      ); 


     console.log("responseType: "+ typeof(response))
    }catch(error){
      console.log("Error When Detecting Ingredients: ", error.message)
    }

   
    

    // then sends image to backend through post request 
    
    // gets detected ingredients as comma separated string 
  
  }
  const renderImage = ()=>{
    return(
      <SafeAreaView style={{flex:1 , backgroundColor:'black',alignItems:'center', justifyContent:'center'}}>
        <Image
          source={{ uri }}
          resizeMode="contain"
          style={{ width: "80%",height:'80%',aspectRatio:1}}
        />
        <View>
          <Button onPress={() => setUri(null)} title="Retake?" />
          <Button onPress={()=> detectIngredients()} title="Detect Ingredients" />
        </View>
      </SafeAreaView>
    )
  }
  
  return (
    <View style={styles.container}>
      {uri? renderImage() : renderCamera()}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'black',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    
  },
  bottomContainer:{ width:'100%'  , alignSelf:'center', backgroundColor:'red', flexDirection:'row',  position:'absolute', bottom:40, alignContent:'center'}
});