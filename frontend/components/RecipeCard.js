import { StyleSheet, TouchableOpacity } from "react-native"
import { View , Text, Image} from "react-native"
import GlobalStyles from "../assets/styles/GlobalStyles";
export default function RecipeCard(props){
    
    const {name , image, time , ingredientCount, missingIngredients, timeImage, ingrImage} = props; 
    
    let color= GlobalStyles.accentColor.backgroundColor; 
    if(missingIngredients >0 && missingIngredients<=5)
        color = "#e09838"
    if(missingIngredients >5)
        color="#CC6C6C"


    return (
        <TouchableOpacity style={styles.outerContainer}>
            <Image source={image} style={styles.foodPic} />
            <View style={styles.bodyContainer}>
                <Text style = {styles.header}>{name}</Text>
                <View style= {styles.infoContainer}>
                    <View style= {styles.timeContainer}>
                        <Image style={styles.icon} source={timeImage}/>
                        <Text style= {styles.bodyText}>{time} min</Text>
                    </View>
                    <View style={styles.ingredientContainer}>
                        <Image style={styles.icon}  source={ingrImage}/>
                        <Text style= {styles.bodyText}>{ingredientCount} ingr.</Text>
                    </View>
                </View>
                <Text style= { { fontSize :12, fontWeight:'400' , color : color} }>{missingIngredients} missing ingredients</Text>
            </View>
        </TouchableOpacity>
    )
}


styles  = StyleSheet.create({
    outerContainer:{
        backgroundColor:GlobalStyles.primaryColor.backgroundColor,
        height:100,
        width: 365,
        borderRadius:10,
        flexDirection:"row",
        marginTop:20,
        alignSelf:"center"
        
    }, 
    bodyContainer:{
        width: 215,
        marginRight:20,
        marginLeft:15,
        marginBottom:5,
        alignItems: "center"
    }, 
    infoContainer:{
        flex:1,
        flexDirection:"row",

        margin:7,
        width:215, 
        justifyContent:"space-between",
        alignItems:"center"
    },
    header:{
        fontSize:18,
        color:GlobalStyles.secondaryColor.backgroundColor, 
        fontWeight:'bold'
    },
    bodyText:{
        fontSize :14,
        color:GlobalStyles.secondaryColor.backgroundColor,
        fontWeight:'500'
    },
    noMissingIngrText:{
        fontSize :12,
        color:GlobalStyles.accentColor.backgroundColor,
        fontWeight:'400'
    },
    mediumMissingIngrText:{
        fontSize :12,
        color:"#bf873d",
        fontWeight:'400'
    },
    missingIngrText:{
        fontSize :12,
        color:"#CC6C6C",
        fontWeight:'400'
    },
    foodPic:{
        width:110,
        height:70,
        marginLeft:12,
        alignSelf:"center"
    },
    timeContainer:{
        marginLeft:5,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"center"
    },
    ingredientContainer:{
        marginRight:5,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"center"
    },
    icon:{
        width:20,
        height:24,
        marginRight:5,
        tintColor:GlobalStyles.secondaryColor.backgroundColor
    }
})