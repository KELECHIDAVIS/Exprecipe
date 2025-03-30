
import { View, Text,Image,TouchableOpacity, StyleSheet, TouchableOpacityeSheet  } from "react-native"


const Ingredient = ({name,  possibleUnits,imageURL, amount, unit, isListForm, openInfoModal, closeModal}) =>{
    
    // if is List form is true we want the ingredient container to be wide 
    // otherwise be small with 
    return(
        <TouchableOpacity style={styles.container} onPress={openInfoModal}>
            <View style={[styles.ingrContainer, { borderColor:"green"}]}>
                <Text numberOfLines={1}>{name}</Text>
                <Image style={styles.ingrImage} source={{uri: imageURL}}/>
                <Text numberOfLines={1}> {(amount==0 ? "-" : amount)+" "+(unit ? unit : possibleUnits[0])}</Text>
            </View>
            
        </TouchableOpacity>
    )
}

export default Ingredient

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center',
        width:80,
        margin:5
    },  
    content:{
        alignSelf:'center'
    },
    ingrImage:{
        width:65,
        height:65,
        resizeMode:'stretch'
    },
    ingrContainer:{
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        borderWidth:1,
        padding:5,
        margin:5,
        borderRadius:10
    },
})