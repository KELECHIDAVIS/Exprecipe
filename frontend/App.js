// In App.js in a new project

import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GestureHandlerRootView } from 'react-native-gesture-handler'; 
import 'react-native-reanimated'; 
import MainAppPages from './pages/MainAppPages';

// if the user is logged in:
// show tabbed page 
//else show authstack page

const Stack = createNativeStackNavigator(); 
function App() {

  return(
    <GestureHandlerRootView style = {{flex:1}}>
      
      <NavigationContainer>
        <MainAppPages/>
      </NavigationContainer>
     
    </GestureHandlerRootView>
  )
 // THIS WOULD BE THE APP STACK COULD MAKE A PAGE FOR THAT 
 
  
}

export default App;
