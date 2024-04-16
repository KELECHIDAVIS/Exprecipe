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
const Tab = createBottomTabNavigator();

function MainAppPages({navigation}) {
  const dispatch = useDispatch()
  const {userToken} = useSelector((state)=>state.auth) // get token from state

  useEffect(() =>{
    if(!userToken) // check if a user is logged in 
    {
      console.log("Have to login user")
      navigation.push("Login"); 
    }else{
      //get user ingrs if they are logged in 
      console.log('user now logged in, getting ingredients')
      dispatch(getIngrs())
    }
  }, [])
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