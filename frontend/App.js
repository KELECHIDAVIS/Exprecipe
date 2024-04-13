// In App.js in a new project

import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Provider} from 'react-redux'
import {  store } from './app/store';
import AppStack from './pages/AppStack';


// if the user is logged in:
// show tabbed page 
//else show authstack page

const Stack = createNativeStackNavigator(); 
function App() {

  return(
    <Provider store={store}>
      <AppStack/>
    </Provider>
  )
 // THIS WOULD BE THE APP STACK COULD MAKE A PAGE FOR THAT 
 
  
}

export default App;
