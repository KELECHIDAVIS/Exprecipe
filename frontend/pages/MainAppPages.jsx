import React, { useEffect } from 'react'
import { Button, Text, View , StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset , checkLoggedIn} from '../features/auth/authSlice'

function MainAppPages({navigation}) {

  const dispatch = useDispatch()
  const {userToken} = useSelector((state)=> state.auth) 

  const onLogout = ()   => {
    dispatch(logout())
    dispatch(reset())

    // reset userToken 
  }

  useEffect(() =>{
    if(!userToken)
    {
      // check if it is in storage 
      dispatch(checkLoggedIn())

      //now check again; if still null login 
      if(!userToken)
      {
       navigation.navigate('Login')
      }
      
    }

    dispatch(reset())
  }, [userToken])

  

  // if you are viewing this page that means that you are logged in
  return (
    <View style= {styles.container}>
        <Text>{JSON.stringify(userToken)}</Text>
        <Button  title = "logout" onPress={onLogout}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:100,
    padding:50
  },
  
});
export default MainAppPages