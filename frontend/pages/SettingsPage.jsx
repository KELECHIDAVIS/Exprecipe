
import React from 'react'
import { Text , View, Button, ActivityIndicator} from 'react-native'
import { useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice';
function SettingsPage({navigation}) {
    
  return (
    <View>
        <Text>SettingsPage</Text>
        
    </View>
  )
}

export default SettingsPage