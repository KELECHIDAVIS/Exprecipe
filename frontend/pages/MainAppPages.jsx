import React, { useEffect } from 'react'
import { Button, Text, View , StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset , checkLoggedIn} from '../features/auth/authSlice'
import { getIngrs, resetIngredients } from '../features/ingredients/ingredientSlice'
import IngredientTextInputForm from '../components/IngredientTextInputForm'
import Toast from 'react-native-root-toast';
function MainAppPages({navigation}) {

  const dispatch = useDispatch()
  const {userToken} = useSelector((state)=> state.auth) 
  const {ingredients , isError, isLoading, isSuccess,message } = useSelector((state)=> state.ingredients ) 

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
      
    }else{
        
      console.log ("Calling dispatch from main page")
      dispatch(getIngrs())
    }
    
    
    if(isError){
      let toast = Toast.show(message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      }); 
    }

    

    dispatch(reset())
  }, [userToken, navigation, isError, message, dispatch])

  
  if(isLoading){
    return (<Text>Loading...</Text>)
  }

  // if you are viewing this page that means that you are logged in
  return (
    <View style= {styles.container}>
        <Button  title = "logout" onPress={onLogout}/>
        <IngredientTextInputForm/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems:'flex-end'
  },
  

}); 

export default MainAppPages