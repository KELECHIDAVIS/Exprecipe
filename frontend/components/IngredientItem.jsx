
import React from 'react'
import { View, Text, Image, StyleSheet ,Button} from 'react-native'
import { useDispatch } from 'react-redux';
import { deleteIngr } from '../features/ingredients/ingredientSlice';


const width = 100; 
function IngredientItem({name , imagePath, _id}) {
    const dispatch = useDispatch() 
    const removeIngr = (id)  =>{
        dispatch(deleteIngr(id))
    }
    return (
        <View style= {styles.ingrContainer}>
        <Button title='X' onPress={removeIngr(_id)}/>
        <Image
            
            source={{uri : imagePath , resizeMode:'cover', width : width, height: 85}}

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