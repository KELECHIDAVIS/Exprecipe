// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/TabPages';
import Register from './pages/Register'
import AuthStack from './pages/AuthStack'



// if the user is logged in:
// show tabbed page 
//else show authstack page
function App() {

  loggedIn = false; 
  if(loggedIn){
    return (
      <Text>Loggin In View</Text>
    );
  }else{
    return (
      <AuthStack/>
    );
  }
  
}

export default App;
