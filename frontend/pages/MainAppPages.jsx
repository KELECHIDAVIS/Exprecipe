import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PantryPage from './PantryPage';
import ScannerPage from './ScannerPage';
import ExprecipesPage from './ExprecipesPage';
import SavedRecipesPage from './SavedRecipesPage';
import SettingsPage from './SettingsPage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkLoggedIn, logout, reset } from '../features/auth/authSlice';
import { getIngrs } from '../features/ingredients/ingredientSlice';
import { Text , Button, View, Image, ActivityIndicator,StyleSheet,  TouchableOpacity, SafeAreaView} from 'react-native';
import Toast from 'react-native-root-toast';
import { useWindowDimensions } from 'react-native';
import appColors from '../assets/appColors';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

function LogoTitle() {
  return (
    
    <Image
      style={{ width: 100, height: 50 }}
      source={require('../assets/exprecipeLogo.png')}
    />
  );
}


const getTabBarIcon = (focused, iconName) => {
  const iconSize = focused ? 28 : 24; // Adjust the size based on focused state
  const iconColor = focused? appColors.accentColor : appColors.secondaryColor; 

  

  if(iconName == "Pantry")
  {
    return (
      <SafeAreaView style = {styles.iconViewStyle}>
          <FontAwesome name="shopping-basket" size={iconSize} color={iconColor} />
          <Text style={{color:iconColor, fontWeight:'500', fontSize:iconSize/2.5}}>{iconName}</Text>
      </SafeAreaView>
    ); 
    
  }else if ( iconName == "Scanner")
  {
    return (
      <View style = {styles.iconViewStyle}>
          <FontAwesome name="camera" size={iconSize} color={iconColor} />
          <Text style={{color:iconColor, fontWeight:'500', fontSize:iconSize/2.5}}>{iconName}</Text>

      </View>
    ); 
  }else if ( iconName == "Exprecipes")
  {
    return (
      <View style = {styles.iconViewStyle}>
          <FontAwesome5 name="scroll" size={iconSize} color={iconColor} />
          <Text style={{color:iconColor, fontWeight:'500', fontSize:iconSize/2.5}}>{iconName}</Text>

      </View>
    ); 
  }else if ( iconName == "Saved")
  {
    return (
      <View style = {styles.iconViewStyle}>
          <FontAwesome name="heart" size={iconSize} color={iconColor} />
          <Text style={{color:iconColor, fontWeight:'500', fontSize:iconSize/2.5}}>{iconName}</Text>

      </View>
    ); 
  }else{
    return (
      <View style = {styles.iconViewStyle}>
          <Ionicons name="settings" size={iconSize} color={iconColor} />
          <Text style={{color:iconColor, fontWeight:'500', fontSize:iconSize/2.5}}>{iconName}</Text>
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
      backgroundColor: appColors.accentColor
    }}
    >
      {children}
    </View>
  </TouchableOpacity>
); 



function MainAppPages({navigation}) {
  const Tab = createBottomTabNavigator();
  const {height , width }  = useWindowDimensions();  

  const dispatch = useDispatch()
  const {userToken, isError , isLoading , message} = useSelector((state)=>state.auth) // get token from state

  useEffect(() =>{
    if(!userToken){
      navigation.push("Login")
    }
    
  }, [userToken, navigation ])


  const logOut = () =>{
    dispatch(logout())
  }
  
  return (
    <Tab.Navigator initialRouteName='Pantry' backBehavior='initialRoute' 
      screenOptions={{ tabBarStyle:{
        backgroundColor:appColors.primaryColor
        
      },
      tabBarShowLabel:false
      }
      }
    >
      <Tab.Screen name="Pantry"  component={PantryPage} options={{ headerTitle: (props) => <LogoTitle {...props} /> ,
      headerRight: () => (
            <TouchableOpacity
              onPress={logOut}
              title="Log Out"
              color={appColors.accentColor}
              style={{alignSelf: 'flex-end',marginRight:16}}
            >
              <Entypo name="log-out" size={28} color={appColors.accentColor} />
            </TouchableOpacity>
          ),
      headerBackground: ()=>(
        <View style={{flex:1, backgroundColor:appColors.primaryColor}}>

        </View>
      ),
      tabBarIcon:({focused }) => getTabBarIcon(focused, "Pantry") 
      }}/>
      <Tab.Screen name="Exprecipes" component={ExprecipesPage}   options={{ headerTitle: (props) => <LogoTitle {...props} /> ,
      headerRight: () => (
            <TouchableOpacity
              onPress={logOut}
              title="Log Out"
              color={appColors.accentColor}
              style={{alignSelf: 'flex-end',marginRight:16}}
            >
              <Entypo name="log-out" size={28} color={appColors.accentColor} />
            </TouchableOpacity>
          ),
          headerBackground: ()=>(
        <View style={{flex:1, backgroundColor:appColors.primaryColor}}>

        </View>
      ),
      tabBarIcon:({focused }) => getTabBarIcon(focused, "Exprecipes") 
      }}/>
      <Tab.Screen name="Scanner" component={ScannerPage} options={{ headerTitle: (props) => <LogoTitle {...props} /> ,
      headerRight: () => (
            <TouchableOpacity
              onPress={logOut}
              title="Log Out"
              color={appColors.accentColor}
              style={{alignSelf: 'flex-end',marginRight:16}}
            >
              <Entypo name="log-out" size={28} color={appColors.accentColor} />
            </TouchableOpacity>
          ),
          headerBackground: ()=>(
        <View style={{flex:1, backgroundColor:appColors.primaryColor}}>

        </View>
      ),
      tabBarIcon:({focused }) => getTabBarIcon(focused, "Scanner") 
      }}/>
      <Tab.Screen name="Saved Recipes"  component={SavedRecipesPage} options={{ headerTitle: (props) => <LogoTitle {...props} /> ,
      headerRight: () => (
            <TouchableOpacity
              onPress={logOut}
              title="Log Out"
              color={appColors.accentColor}
              style={{alignSelf: 'flex-end',marginRight:16}}
            >
              <Entypo name="log-out" size={28} color={appColors.accentColor} />
            </TouchableOpacity>
          ),
          headerBackground: ()=>(
        <View style={{flex:1, backgroundColor:appColors.primaryColor}}>

        </View>
      ),
      tabBarIcon:({focused }) => getTabBarIcon(focused, "Saved") 
      }}/>
      <Tab.Screen name="Settings"  component={SettingsPage} options={{ headerTitle: (props) => <LogoTitle {...props} /> ,
      headerRight: () => (
            <TouchableOpacity
              onPress={logOut}
              title="Log Out"
              color={appColors.accentColor}
              style={{alignSelf: 'flex-end',marginRight:16}}
            >
              <Entypo name="log-out" size={28} color={appColors.accentColor} />
            </TouchableOpacity>
          ),
          headerBackground: ()=>(
        <View style={{flex:1, backgroundColor:appColors.primaryColor}}>

        </View>
      ),
      tabBarIcon:({focused }) => getTabBarIcon(focused, "Settings") 
      }}/>
    </Tab.Navigator>
  );
}

export default MainAppPages; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.secondaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  shadow:{
    shadowColor: appColors.secondaryColor,
    shadowOffset: {
      width: 0 , 
      height: 10,
      
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5, 
    elevation: 5,
  },
  iconViewStyle:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    top: 10, 
  },
  iconImageStyle:{
    width: 45, 
    height:45
  }
});