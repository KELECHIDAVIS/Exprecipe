import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PantryPage from './PantryPage';
import ScannerPage from './ScannerPage';
import RecipeGenerationPage from './RecipeGenerationPage';
import SavedRecipesPage from './SavedRecipesPage';
import SettingsPage from './SettingsPage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkLoggedIn, logout, reset } from '../features/auth/authSlice';
import { getIngrs } from '../features/ingredients/ingredientSlice';
import { Text , Button, View, Image} from 'react-native';
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
    if(isError )
    {
      Toast.show(message, { duration: Toast.durations.LONG, position: Toast.positions.TOP,shadow: true, animation: true, hideOnPress: true,delay: 0,}); 
    }
    if(!userToken){
      navigation.push("Login")
    }
    
    dispatch(getIngrs()); 
    return () =>{
      dispatch(reset()) ; 
    }
  }, [userToken, navigation, isError, message , dispatch])


  const logOut = () =>{
    dispatch(logout())
  }
  if(isLoading){
    return <Text>Loading...</Text>
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
      <Tab.Screen name="Recipes" options={{headerShown:false}} component={RecipeGenerationPage} />
      <Tab.Screen name="Scanner" options={{headerShown:false}} component={ScannerPage} />
      <Tab.Screen name="Saved Recipes" options={{headerShown:false}} component={SavedRecipesPage} />
      <Tab.Screen name="Settings" options={{headerShown:false}} component={SettingsPage} />
    </Tab.Navigator>
  );
}

export default MainAppPages; 