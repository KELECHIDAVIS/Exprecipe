import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'


const width = 100; 
function IngredientItem({name , imagePath}) {
  return (
    <View style= {styles.ingrContainer}>
        <Image
            style = {styles.ingredientImage}    
            source={{uri : imagePath}}

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