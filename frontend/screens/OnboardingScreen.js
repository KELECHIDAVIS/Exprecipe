import React from 'react'; 
import { StyleSheet } from 'react-native';
import { SafeAreaView, View, Image, Text, TouchableOpacity } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GlobalStyles from '../assets/styles/GlobalStyles';


const OnboardingScreen = ({navigation}) => {
  return (
    <SafeAreaView style={[styles.pageContainer, GlobalStyles.pageBackgroundColor]}>
        

        <View style={styles.logoContainer}>
            <Image  source={require("../assets/Images/exprecipeLogo1.png")}/>
        </View>

        <TouchableOpacity 
            style={[styles.buttonStyle, GlobalStyles.accentColor]}
            onPress={ () => navigation.navigate("Login")}
        >
            <Text style={{color:"white", fontStyle:"italic", fontSize:18}}>Welcome</Text>
            <MaterialIcons name='arrow-forward-ios' size={22} color={"white"}/>
        </TouchableOpacity>

    </SafeAreaView>
  );
};



styles = StyleSheet.create({
    pageContainer:{
        flex:1,
        alignItems:"center",
        flexDirection:"column"
    }, 
    title:{
        fontSize:30,
        fontWeight:'400',
        color: GlobalStyles.secondaryColor.backgroundColor,
    },
    logo:{
        width: 320,
        height:150,
        borderRadius:20,
        overflow:"hidden",
        
    },
    logoContainer:{flex: 1, alignItems: 'center', marginTop: 75},
    buttonStyle:{
        padding: 20,
        width: '90%',
        borderRadius: 10,
        marginBottom: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:"center",
        height:70,
    }
})

export default OnboardingScreen;