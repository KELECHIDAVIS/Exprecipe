import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Scanner from './Scanner'; 
import Favorites from './Favorites'; 
import UserSettings from './UserSettings';
import Pantry from './Pantry';

import Recipes from './Recipes';
import GlobalStyles from '../assets/styles/GlobalStyles';
const Tab  = createBottomTabNavigator(); 


const getTabBarIcon = (focused, iconName) => {
  const iconSize = focused ? 55 : 50; // Adjust the size based on focused state
  const iconColor = focused? GlobalStyles.accentColor : GlobalStyles.secondaryColor; 

  

  if(iconName == "Pantry")
  {
    return (
      <View style = {styles.iconViewStyle}>
          <Image source={require("../assets/Images/basket.png")} resizeMode='contain'  style={styles.iconImageStyle} tintColor={iconColor}/>
                                      
      </View>
    ); 
    
  }else if ( iconName == "Scanner")
  {
    return (
      <View style = {styles.iconViewStyle}>
          <Image source={require("../assets/Images/cameraRetro.png")} resizeMode='contain' style={styles.iconImageStyle} tintColor={iconColor}/>
      </View>
    ); 
  }else if ( iconName == "Recipes")
  {
    return (
      <View style = {styles.iconViewStyle}>
          <Image source={require("../assets/Images/recipeIcon.png")} resizeMode='contain' style={styles.iconImageStyle} tintColor={iconColor}/>
      </View>
    ); 
  }else if ( iconName == "Favorites")
  {
    return (
      <View style = {styles.iconViewStyle}>
          <Image source={require("../assets/Images/heart.png")} resizeMode='contain' style={styles.iconImageStyle} tintColor={iconColor}/>
      </View>
    ); 
  }else{
    return (
      <View style = {styles.iconViewStyle}>
          <Image source={require("../assets/Images/userSettings.png")} resizeMode='contain' style={styles.iconImageStyle} tintColor={iconColor}/>
      </View>
    ); 
  }

  
 
  
};

const CustomTabBarButton = ({children , onPress}) =>(

  <TouchableOpacity
  style ={{
    top:-30,
    justifyContent:"center",
    alignItems:"center",
    ...styles.shadow
  }}
  onPress={onPress}
  >
    <View
    style={{
      width:70, 
      height:70,
      borderRadius: 35,
      backgroundColor: GlobalStyles.accentColor
    }}
    >
      {children}
    </View>
  </TouchableOpacity>
); 

const Tabs = () =>{
    return (
        <Tab.Navigator 
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
              position: 'absolute',
              bottom: 25, 
              left: 20, 
              right: 20,
              elevation:0, 
              borderRadius: 15,
              backgroundColor: GlobalStyles.primaryColor,
              height: 80, 
              ...styles.shadow
            }
          }} 
        >
            <Tab.Screen name="Pantry" component={Pantry} options={{headerStyle: {backgroundColor: GlobalStyles.bgColor } ,headerTitle: "Pantry", tabBarIcon:({focused }) => getTabBarIcon(focused, "Pantry") }} />
            <Tab.Screen name='Recipes' component={Recipes} options={{headerStyle: {backgroundColor: GlobalStyles.bgColor} ,headerTitle: "Recipes", tabBarIcon:({focused }) => getTabBarIcon(focused, "Recipes") }}/>
            <Tab.Screen name='Scanner' component={Scanner} 
            options={{
              headerStyle: {backgroundColor: GlobalStyles.bgColor} ,
              headerTitle: "Scanner",
              tabBarButton: (props) =>(
                <CustomTabBarButton {...props} />
              ),
              tabBarIcon:({focused }) => (
                <Image
                  source={require('../assets/Images/camera-solid.png')}
                  resizeMode="contain"
                  style={{
                    width: 45,
                    height: 45,
                    tintColor: "#FEFEFE"
                  }}
                />
              ),
               }}/>
            <Tab.Screen name='Favorites' component={Favorites} options={{headerStyle: {backgroundColor: GlobalStyles.bgColor} ,headerTitle: "Saved Recipes", tabBarIcon:({focused }) => getTabBarIcon(focused, "Favorites") }}/>
            <Tab.Screen name='Settings' component={UserSettings} options={{headerStyle: {backgroundColor: GlobalStyles.bgColor} ,headerTitle: "Settings", tabBarIcon:({focused }) => getTabBarIcon(focused, "Settings") }}/>
        </Tab.Navigator>
    ); 
}; 

export default Tabs; 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: GlobalStyles.secondaryColor.backgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    shadow:{
      shadowColor: "black",
      shadowOffset: {
        width: 0 , 
        height: 10,
        
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5, 
      elevation: 5,
    },
    iconViewStyle:{
      alignItems: 'center',
      justifyContent: 'center',
      top: 10, 
    },
    iconImageStyle:{
      width: 45, 
      height:45
    }
});
  
  