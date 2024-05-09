
import { Text , StyleSheet, View, Image, TouchableOpacity } from "react-native";
import appColors from "../assets/appColors";

returnMissingIngredientText = (count)=>{
    if(count <=1)
    {
        return(
            <Text style={{...styles.bodyText, color:'green'}} >{count} missing ingredient(s)</Text>
        )
    }else if( count <=3){
        return(
            <Text style={{...styles.bodyText, color:'orange'}}>{count} missing ingredients</Text>
        )
    }
    return (
        <Text style={{...styles.bodyText, color:'orange'}}>{count} missing ingredients</Text>
    )
}
function RecipeCard({name, missingIngredientCount, imagePath, onPress}){
    
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} >
            <Image style={styles.image} source={{uri : imagePath , resizeMode:'cover', width : 85, height: 60}}/>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{name}</Text>
                {returnMissingIngredientText(missingIngredientCount)}
                
            </View>
        </TouchableOpacity>
    )
}

export default RecipeCard; 

const styles = StyleSheet.create({
    container: {
      flexDirection:'row',
      justifyContent:'center',
      alignContent:'center',
      padding:10,
      backgroundColor: appColors.primaryColor,
      borderRadius: 10,
    },
    infoContainer:{
        flex:2, 
        flexDirection:'column' ,

    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    image:{
        flex:1
    },
    title: {
    flex:2, 
      fontSize: 16,
      textAlign:'center',
      color:appColors.secondaryColor,
      fontWeight:'bold'
    },
    bodyText: {
        flex:2, 
          fontSize: 10,
          textAlign:'center',
          fontWeight:'bold'
        },
}); 