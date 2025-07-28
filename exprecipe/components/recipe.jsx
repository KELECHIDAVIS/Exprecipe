
import { View, Text,Image,Pressable, StyleSheet  } from "react-native"



const Recipe = ({recipeData, ranking,  isListForm, isSavedRecipe}) =>{
    
    // if is List form is true we want the ingredient container to be wide 
    // otherwise be small with 
    
    // if the ranking is minimize missing then show missing ingr count else show max used 
    function renderIngredientCount(ranking){

        if(isSavedRecipe)
            return
        let textColor = "green"; 
        if (ranking ==2 && recipeData.missedIngredientCount ){
            if(recipeData.missedIngredientCount>=1 && recipeData.missedIngredientCount<3)
                textColor='orange'
            else if (recipeData.missedIngredientCount>=3 && recipeData.missedIngredientCount<6)
                textColor= 'red'

            return (
                <Text style={[styles1.contextText , {color:textColor}]}>{recipeData.missedIngredientCount} missing ingr(s)</Text>
            )
        }else if(ranking ==1 && recipeData.usedIngredientCount && recipeData.missedIngredientCount){
            // if ratio of used count > .7 should be green , >=.5 orange, < .5 red  
            const ratio = (recipeData.usedIngredientCount / (recipeData.usedIngredientCount +recipeData.missedIngredientCount ))
            if(ratio < .5)
                textColor= 'red'
            else if (recipeData.usedIngredientCount < .7)
                textColor = 'orange'            
            return (
                <Text style={[styles1.contextText, {color:textColor}] }>{recipeData.usedIngredientCount} used ingr(s)</Text>
            )
        }
    }
    
    // maybe change pressable to a view nd just wrap recipe in simple page in a pressable
    return(
        <View style={styles1.container} >
            <Image 
                style={styles1.image}
                source={{uri: recipeData.image}}
                defaultSource={require('../assets/favicon.png')}
                resizeMode="contain"
            />
            
            <View style={styles1.content}>
                <Text style={styles1.contextText}>{recipeData.title}</Text>
                {renderIngredientCount(ranking)}
            </View>
            
        </View>
    )
}

export default Recipe

styles1 = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center',
        margin:10,
        borderWidth:1,
        borderColor:'green' ,
        width:"100%",
        gap:8
    },  
    image:{
        flex:2,
        width:"100%",
        height:"100%",
    },
    content:{
        flex: 3,
        alignSelf:'center',
        textAlign:'center',
        justifyContent:'center',
        gap:5,
        padding:10,
    },
    contextText:{
        textAlign:'center'
        
    }
})