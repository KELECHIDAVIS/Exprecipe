
import { View, Text,Image,Pressable, StyleSheet  } from "react-native"


const Ingredient = ({name,  possibleUnits,imageURL}) =>{


    return(
        <Pressable>
            <Text>Name: {name}</Text>
            <Image 
                style={styles.image}
                source={imageURL}
            />

        </Pressable>
    )
}

export default Ingredient

styles = StyleSheet.create({
    image:{
        width:100,
        height:100
    }
})