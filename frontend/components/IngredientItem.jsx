import React from 'react'
import { View, Text, Image, StyleSheet, Button } from 'react-native'
import { useDispatch } from 'react-redux';



const width = 100; 
function IngredientItem({name , imagePath, _id}) {

    const dispatch = useDispatch(); 
    
    
  return (
    <View style= {styles.ingrContainer}>
        <Button title='X' />
        <Image
            source={{uri : imagePath, width:width, height:85, resizeMode:'cover'}}

        />
        <Text>{name}</Text>
    </View>
  )
}

styles = StyleSheet.create({
    ingrContainer:{
        backgroundColor:'#FFE5B4',
        margin:10,
        width:width, 
    }, 
    ingredientImage:{
        width:width , 
        height: 85 ,
        resizeMode:'cover',

    },
    ingredientName:{}
})
export default IngredientItem