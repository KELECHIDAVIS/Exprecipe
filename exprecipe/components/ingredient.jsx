
import { View, Text,Image,Pressable, StyleSheet  } from "react-native"


const Ingredient = ({name,  possibleUnits,imageURL, amount, unit, isListForm, openInfoModal, closeModal}) =>{
    
    // if is List form is true we want the ingredient container to be wide 
    // otherwise be small with 
    return(
        <Pressable style={styles.container} onPress={openInfoModal}>
            <Image 
                style={styles.image}
                source={{uri: imageURL}}
                defaultSource={require('../assets/favicon.png')}
                resizeMode="contain"
            />
            <View style={styles.content}>
                <Text>{name}</Text>
                <Text>{(amount>0 ? amount : "-")+" "+(unit ? unit: possibleUnits[0])}</Text>
            </View>
            
        </Pressable>
    )
}

export default Ingredient

styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignContent:'center',
        margin:10,
        backgroundColor:'beige',
        width:"40%"
    },  
    image:{
        width:65,
        height:65,
    },
    content:{
        alignSelf:'center'
    }
})