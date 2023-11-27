import { StyleSheet, Text , View} from "react-native"
import CheckBox from 'expo-checkbox'
import { useState } from "react"
import GlobalStyles from "../assets/styles/GlobalStyles";

export default function CheckBubble(props)  {
    const [checked , setChecked] = useState(false); 
    const {name} = props 
    return (
        <View style = {styles.container}>
            <CheckBox style={styles.check} value= {checked} onValueChange={setChecked} color={GlobalStyles.accentColor.backgroundColor}/>
            <Text style={styles.name}> {props.name}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: GlobalStyles.primaryColor.backgroundColor,
        width: 100,
        height: 35, 
        alignItems:"center",
        justifyContent:'center',
        borderRadius:10,
        flexDirection:"row",
        margin:15,
    }, 
    name:{
        fontSize:15,
    }, 
    check:{
        marginRight : 3,
    }
})