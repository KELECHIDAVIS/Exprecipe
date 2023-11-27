import { Text, TouchableOpacity,Image } from "react-native"
import { StyleSheet } from "react-native";
import GlobalStyles from "../assets/styles/GlobalStyles";

export default function BannerButton(props){

    const {name, image} =  props ;
    return (
        <TouchableOpacity style= {styles.container}>
            <Image style={styles.icon} source = {image}/>
            <Text style ={styles.title}>{name}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        width: "100%",
        height:55,
        backgroundColor: GlobalStyles.primaryColor.backgroundColor,
        alignItems:"center",
        marginTop: 10
    },
    title:{
        color: GlobalStyles.secondaryColor.backgroundColor,
        fontWeight: "400",
        fontSize: 20,
        marginLeft:15
    },
    icon:{
        width: 30 ,
        height: 30, 
        marginLeft:15,
        tintColor: GlobalStyles.secondaryColor.backgroundColor
    }
}); 