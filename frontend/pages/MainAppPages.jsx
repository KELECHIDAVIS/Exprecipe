import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PantryPage from './PantryPage';
import ScannerPage from './ScannerPage';
import RecipeGenerationPage from './RecipeGenerationPage';
import SavedRecipesPage from './SavedRecipesPage';
import SettingsPage from './SettingsPage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkLoggedIn, reset } from '../features/auth/authSlice';
import { getIngrs } from '../features/ingredients/ingredientSlice';
import { Text } from 'react-native';
import Toast from 'react-native-root-toast';
const Tab = createBottomTabNavigator();

function MainAppPages({navigation}) {
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

  if(isLoading){
    return <Text>Loading...</Text>
  }
  return (
    <Tab.Navigator initialRouteName='Pantry' backBehavior='initialRoute'>
      <Tab.Screen name="Pantry" options={{headerShown:false}} component={PantryPage} />
      <Tab.Screen name="Recipes" options={{headerShown:false}} component={RecipeGenerationPage} />
      <Tab.Screen name="Scanner" options={{headerShown:false}} component={ScannerPage} />
      <Tab.Screen name="Saved Recipes" options={{headerShown:false}} component={SavedRecipesPage} />
      <Tab.Screen name="Settings" options={{headerShown:false}} component={SettingsPage} />
    </Tab.Navigator>
  );
}

export default MainAppPages; 