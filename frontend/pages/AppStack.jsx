
import * as React from 'react';
import { View, Text , Button, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Register from './Register'
import { RootSiblingParent } from 'react-native-root-siblings';
import { logout, reset } from '../features/auth/authSlice';
import {useSelector, useDispatch} from 'react-redux'


function AppStack() {
    const dispatch = useDispatch()
    const {user} = useSelector((state)=> state.auth) 

  const onLogout = ()   => {
    dispatch(logout())
    dispatch(reset())
  }
  if(user){
    // logged in 
    return (
      <RootSiblingParent>
            <View style= {styles.container}>
              <Button  title = "logout" onPress={onLogout}/>

            </View>
            
      </RootSiblingParent>
      );
  }else{
    const Stack = createNativeStackNavigator();
    return (
      <RootSiblingParent>
            
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen name="Register" component={Register} /> 
                  <Stack.Screen name="Login" component={Login} />
                </Stack.Navigator>
              </NavigationContainer>
            
      </RootSiblingParent>
      );
  }

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:100,
      padding:50
    },
    
  });
export default AppStack