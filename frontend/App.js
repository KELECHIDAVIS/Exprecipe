import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStatck';

export default function App() {
  return (
    <NavigationContainer>
      {/* <AppStack/> */}
      <AuthStack/>
    </NavigationContainer>
  );
}


