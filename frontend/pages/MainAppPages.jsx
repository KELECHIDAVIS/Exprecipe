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
import { Text , Button, View, Image, ActivityIndicator} from 'react-native';
import Toast from 'react-native-root-toast';
import { useWindowDimensions } from 'react-native';

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
      
    >
      <Tab.Screen name="Pantry"  component={PantryPage} options={{ headerTitle: (props) => <LogoTitle {...props} /> ,
      headerRight: () => (
            <Button
              onPress={logOut}
              title="Logout"
              
            />
          ),
      }}/>
      <Tab.Screen name="Exprecipes" options={{headerShown:false}} component={ExprecipesPage} />
      <Tab.Screen name="Scanner" options={{headerShown:false}} component={ScannerPage} />
      <Tab.Screen name="Saved Recipes" options={{headerShown:false}} component={SavedRecipesPage} />
      <Tab.Screen name="Settings" options={{headerShown:false}} component={SettingsPage} />
    </Tab.Navigator>
  );
}

export default MainAppPages; 