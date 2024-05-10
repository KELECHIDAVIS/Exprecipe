
import { Text , StyleSheet, View, Image, TouchableOpacity } from "react-native";
import appColors from "../assets/appColors";
import { FontAwesome } from '@expo/vector-icons';

function SavedRecipeCard({name ,image, onPress, deleteFunction}){
    
    return (
        <TouchableOpacity style={styles.container} onPress = {onPress} >
            <Image style={styles.image} source={{uri : image , resizeMode:'cover', width : 85, height: 60}}/>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{name}</Text>
            </View>
            
            <TouchableOpacity style={{position:'absolute', backgroundColor:appColors.accentColor,top:0, right:0, width:38, height:19 , borderTopRightRadius:10, borderBottomLeftRadius:10}} onPress={deleteFunction}>
                <FontAwesome name="minus" size={24} color='white' style={{alignSelf:'center'}}/>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default SavedRecipeCard; 

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
        flex:1.8, 
        flexDirection:'column' ,
        justifyContent:"center",
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
      fontSize: 15,
      textAlign:'center',
      color:appColors.secondaryColor,
      fontWeight:'bold',
      justifyContent:'center',
      textAlign:'center',
        padding:5
    },
    
}); 