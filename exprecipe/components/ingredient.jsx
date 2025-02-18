
import { View, Text,Image,Pressable, StyleSheet  } from "react-native"


const Ingredient = ({name,  possibleUnits,imageURL, amount, unit, isListForm}) =>{

    // if is List form is true we want the ingredient container to be wide 
    // otherwise be small with 
    return(
        <Pressable style={styles.container}>
            <Image 
                style={styles.image}
                source={imageURL}
            />
            <View style={content}>
                <Text>Name: {name}</Text>
                <Test>{amount+" "+unit}</Test>
            </View>
        </Pressable>
    )
}

export default Ingredient

styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-between",
        margin:10,
    },  
    image:{
        width:100,
        height:100
    },
    content:{

    }
})