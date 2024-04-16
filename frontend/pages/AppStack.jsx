
import * as React from 'react';
import { View, Text , Button, StyleSheet, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Register from './Register'
import { RootSiblingParent } from 'react-native-root-siblings';
import {  reset } from '../features/auth/authSlice';
import { checkLoggedIn } from '../features/auth/authSlice';
import {useSelector, useDispatch} from 'react-redux'
import MainAppPages from './MainAppPages';
import { useWindowDimensions } from 'react-native';


const Stack = createNativeStackNavigator(); 
function AppStack() {
  const {height , width }  = useWindowDimensions();  
  return (
    <RootSiblingParent>
          
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="Exprecipe" component={MainAppPages}  options={{headerShown: false}}/> 
                <Stack.Screen name="Register" component={Register} /> 
                <Stack.Screen name="Login" component={Login} options={{headerBackVisible:false}} />
              </Stack.Navigator>
            </NavigationContainer>
          
    </RootSiblingParent>
  );

}

styles= StyleSheet.create({
  logoContainer:{
    alignContent:'center',
    width:'100%',
    height:50,
    paddingBottom:8,
  }
})
export default AppStack