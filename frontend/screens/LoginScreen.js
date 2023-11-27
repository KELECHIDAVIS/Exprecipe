
import {StyleSheet, SafeAreaView , Text,Image,TouchableOpacity, View} from "react-native";
import GlobalStyles from "../assets/styles/GlobalStyles";
import InputField from "../components/InputField"; 
import CustomButton from "../components/CustomButton"; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useForm, Controller}  from 'react-hook-form'

export default function LoginScreen({navigation})
{

    const {control , handleSubmit, formState:{errors}}  = useForm();  
    const onLoginPressed = (data)=>{
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
          }}>
          Login
        </Text>

        {/* start form */}


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

        
        
        
        <CustomButton label={"Login"} onPress={handleSubmit(onLoginPressed)} />

        {/* end form */}

        

        <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
          Or, login with ...
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
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{color: GlobalStyles.accentColor.backgroundColor, fontWeight: '700'}}> Register</Text>
          </TouchableOpacity>
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