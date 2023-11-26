
import {StyleSheet, SafeAreaView , Text,Image,TouchableOpacity, View, TouchableWithoutFeedback} from "react-native";
import GlobalStyles from "../assets/styles/GlobalStyles";
import InputField from "../components/InputField"; 
import CustomButton from "../components/CustomButton"; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from "react";

export default function RegisterScreen({navigation})
{

    const [formData, setFormData]    = useState({
        name:'',
        email:"",
        password:'',
        password2:"",
    })

    const {name, email, password, password2} = formData; 

    return (
        
    <SafeAreaView style={[{flex: 1, justifyContent: 'center'}, GlobalStyles.pageBackgroundColor]}>
      <View style={{paddingHorizontal: 25}}>
        
        <Text
          style={{
            
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}
          
          >
          Register
        </Text>

        <InputField
          label={'Name'}
          icon={
            <MaterialIcons
            name="person"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          }
          keyboardType="email-address"
        />
        
        <InputField
          label={'Email'}
          icon={
            <MaterialIcons
            name="alternate-email"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          }
          keyboardType="email-address"
        />

        <InputField
          label={'Password'}
          icon={
            <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          }
          inputType="password"
        />
        
        <CustomButton label={"Register"} onPress={() => {}} />

        <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
          Or, register with ...
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <Image style={{width:30, height:30}} source={require("../assets/Images/twitter.png")}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <Image style={{width:30, height:30}} source={require("../assets/Images/google.png")}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <Image style={{width:30, height:30}} source={require("../assets/Images/facebook.png")}/>
          </TouchableOpacity>
        </View>
        
        
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          
          {/* Only for development */}
          <CustomButton label={"Go Login"} onPress={()=>navigation.navigate("Login")}/>
          <CustomButton label={"Go Home"} onPress={()=>navigation.navigate("Onboarding")}/>
        </View>
      </View>
    </SafeAreaView>
    )
}

styles = StyleSheet.create({
    pageContainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }, 
})