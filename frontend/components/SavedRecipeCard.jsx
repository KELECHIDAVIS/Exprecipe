
import { Text , StyleSheet, View, Image, TouchableOpacity } from "react-native";

function SavedRecipeCard({name ,image, onPress}){
    
    return (
        <TouchableOpacity style={styles.container} onPress = {onPress} >
            <Image style={styles.image} source={{uri : image , resizeMode:'cover', width : 85, height: 60}}/>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{name}</Text>
 
                
            </View>
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
      backgroundColor: 'tan',
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
      fontSize: 14,
      textAlign:'center'
    },
}); 