
import React from 'react'
import { Text , View, Button} from 'react-native'
import { useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice';
function SettingsPage({navigation}) {
    dispatch = useDispatch(); 
    const onLogout = ()   => {
        dispatch(logout())// reset userToken
        dispatch(reset()) 
        navigation.push("Login")
    }
  return (
    <View>
        <Text>SettingsPage</Text>
        <Button title="Logout" onPress={onLogout}/>
    </View>
  )
}

export default SettingsPage