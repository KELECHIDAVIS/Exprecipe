
import * as React from 'react';
import { View, Text , Button, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Register from './Register'
import { RootSiblingParent } from 'react-native-root-siblings';
import { logout, reset } from '../features/auth/authSlice';
import {useSelector, useDispatch} from 'react-redux'
import MainAppPages from './MainAppPages';


const Stack = createNativeStackNavigator(); 
function AppStack() {
  
  return (
    <RootSiblingParent>
          
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="MainApp" component={MainAppPages} /> 
                <Stack.Screen name="Register" component={Register} /> 
                <Stack.Screen name="Login" component={Login} options={{headerBackVisible:false}} />
              </Stack.Navigator>
            </NavigationContainer>
          
    </RootSiblingParent>
  );

}


export default AppStack