
import {StyleSheet, SafeAreaView , Text,Image,TouchableOpacity, View, TouchableWithoutFeedback, TextInput} from "react-native";
import GlobalStyles from "../assets/styles/GlobalStyles";
import InputField from "../components/InputField"; 
import CustomButton from "../components/CustomButton"; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from "react";
import {useForm, Controller}  from 'react-hook-form'

export default function RegisterScreen({navigation})
{

    const {control , handleSubmit, formState:{errors}}  = useForm();  

    const onRegisterPressed = (data)=>{
      console.log(data); 
      navigation.navigate("Tabs")
    }

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

        {/* start form */}


        <InputField
          name="name"
          placeHolder={"Name"}  
          icon={<Ionicons
            name="person"
            size={18}
            color="#666"
            style={{marginRight: 8, }}
          />}
          control={control}
          rules={{required:true}}
        />

        <InputField
          name="email"
          placeHolder={"Email"}  
          rules={{required:true}}
          icon={<Ionicons
            name="at"
            size={18}
            color="#666"
            style={{marginRight: 8, }}
          />}
          control={control}
        />
        <InputField
          name="password"
          placeHolder={"Password"}
          rules={{required:true}}
          icon={<Ionicons
            name="lock-closed-outline"
            size={18}
            color="#666"
            style={{marginRight: 8, }}
          />}  
          secureTextEntry= {true}
          control={control}
        />

        <InputField
          name="password2"
          placeHolder={"Retype Password"}
          rules={{required:true}}
          icon={<Ionicons
            name="lock-closed-outline"
            size={18}
            color="#666"
            style={{marginRight: 8, }}
          />}  
          secureTextEntry= {true}
          control={control}
        />
        
        
        <CustomButton label={"Register"} onPress={handleSubmit(onRegisterPressed)} />

        {/* end form */}



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