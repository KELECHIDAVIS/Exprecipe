import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PantryPage from './PantryPage';
import ScannerPage from './ScannerPage';
import ExprecipesPage from './ExprecipesPage';
import SavedRecipesPage from './SavedRecipesPage';
import SettingsPage from './SettingsPage';
import { Text , View, Image,StyleSheet,  TouchableOpacity, SafeAreaView} from 'react-native';
import { useWindowDimensions } from 'react-native';
import appColors from '../assets/appColors';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

function LogoTitle() {
  return (
    
    <Image
      style={{ width: 100, height: 50 }}
      source={require('../assets/exprecipeLogo.png')}
    />
  );
}







function MainAppPages({navigation}) {
  const Tab = createBottomTabNavigator();
  const {height , width }  = useWindowDimensions();  

  return (
    <Tab.Navigator initialRouteName={PantryPage} backBehavior='initialRoute' 
      screenOptions={({route}) => ({ 
        tabBarStyle:{
          backgroundColor:appColors.primaryColor,
        },
        tabBarActiveTintColor:appColors.accentColor,
        tabBarInactiveTintColor:appColors.secondaryColor,
       
        tabBarIcon:({focused, size})=>{
            let iconName; 
            let rn = route.name; 
            let color; 

            if(rn === "Pantry"){
              iconName = focused ? 'basket': 'basket-outline' ; 
              color = focused ? appColors.accentColor : appColors.secondaryColor; 
            }else if (rn=== "Exprecipes"){
              iconName = focused ? 'receipt': 'receipt-outline' ; 
              color = focused ? appColors.accentColor : appColors.secondaryColor; 
            }else if (rn=== "Scanner"){
              iconName = focused ? 'camera': 'camera-outline' ; 
              color = focused ? appColors.accentColor : appColors.secondaryColor; 
            }else if (rn=== "Saved"){
              iconName = focused ? 'heart': 'heart-outline' ; 
              color = focused ? appColors.accentColor : appColors.secondaryColor; 
            }else if (rn=== "Settings"){
              iconName = focused ? 'person-circle': 'person-circle-outline' ; 
              color = focused ? appColors.accentColor : appColors.secondaryColor; 
            }

            return <Ionicons name={iconName} size={size} color={color}/>
          },
      })}

    >
      <Tab.Screen name="Pantry"  component={PantryPage} options={{ headerTitle: (props) => <LogoTitle {...props} /> ,
     
      headerBackground: ()=>(
        <View style={{flex:1, backgroundColor:appColors.primaryColor}}>

        </View>
      ),
      
      }}/>
      <Tab.Screen name="Exprecipes" component={ExprecipesPage}   options={{ headerTitle: (props) => <LogoTitle {...props} /> ,

          headerBackground: ()=>(
        <View style={{flex:1, backgroundColor:appColors.primaryColor}}>

        </View>
      ),
     
      }}/>
      <Tab.Screen name="Scanner" component={ScannerPage} options={{ headerTitle: (props) => <LogoTitle {...props} /> ,
      
          headerBackground: ()=>(
        <View style={{flex:1, backgroundColor:appColors.primaryColor}}>

        </View>
      ),
      }}/>
      <Tab.Screen name="Saved"  component={SavedRecipesPage} options={{ headerTitle: (props) => <LogoTitle {...props} /> ,
      
          headerBackground: ()=>(
        <View style={{flex:1, backgroundColor:appColors.primaryColor}}>

        </View>
      ),
      }}/>
      <Tab.Screen name="Settings"  component={SettingsPage} options={{ headerTitle: (props) => <LogoTitle {...props} /> ,
      
          headerBackground: ()=>(
        <View style={{flex:1, backgroundColor:appColors.primaryColor}}>

        </View>
      ),
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