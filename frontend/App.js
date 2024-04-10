// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/AppStack';
import Register from './pages/Register'
import AuthStack from './pages/AuthStack'
import {Provider} from 'react-redux'
import { RootSiblingParent } from 'react-native-root-siblings';
import { store } from './app/store';

// if the user is logged in:
// show tabbed page 
//else show authstack page
function App() {

  loggedIn = false; 
  if(loggedIn){

    // THIS WOULD BE THE APP STACK COULD MAKE A PAGE FOR THAT 
    return (
      <RootSiblingParent>
        <Provider store={store}>
          <AuthStack/>
        </Provider>
      </RootSiblingParent>
    );
  }else{
    return (
      <RootSiblingParent>
        <Provider store={store}>
          <AuthStack/>
        </Provider>
      </RootSiblingParent>
    );
  }
  
}

export default App;
