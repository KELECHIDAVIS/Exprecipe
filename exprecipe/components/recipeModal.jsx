import {View, FlatList, Text , Modal, StyleSheet, TouchableOpacity, SafeAreaView,ScrollView,Image,Alert}  from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import * as WebBrowser from "expo-web-browser"
// this modal receives recipe info object that will have detailed info about the recipe

// also takes in the ingredients the user has and doesn't have so we can color code the ingredient based on names

const RecipeModal = ({recipeInfo, usedIngredients, missingIngredients, closeInfoModal, userID}) =>{

    const apiUrl =process.env.EXPO_PUBLIC_API_URL ;

    if(!recipeInfo)
        return

    const usedIngredientSet = new Set(); // set of the name of used ingredients 
    for(let i = 0; i< usedIngredients.length;  i++){
        usedIngredientSet.add(usedIngredients[i].name);  
    } 
    
    function renderIngredient(item){
        // if the item is in used ingredient make the name green, else make the name red 
        const color = usedIngredientSet.has(item.name) ? "green" : "red"
        
        // if image doesn't start with http add the starting to it
        const imageSrc = item.image.startsWith("http")? item.image : "https://img.spoonacular.com/ingredients_100x100/"+item.image
        return(
            <View style={[modalStyle.ingrContainer, { borderColor:color}]}>
                <Text style={[{color:color}]}>{item.name}</Text>
                <Image style={modalStyle.ingrImage} source={{uri: imageSrc}}/>
                <Text style={[{color:color}]}> {item.amount+" "+item.unit}</Text>
            </View>
        )
    }

    // make request to backend to save recipe for user 
    const saveRecipe = async ()=>{
        try {
            // might have to convert backend friendly object before sending 
            const url = `${apiUrl}/${userID}/recipe`; 
            const data = JSON.stringify(recipeInfo); 

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: url,
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : data
              };
              
              axios.request(config)
              .then((response) => {
                console.log(JSON.stringify(response.data));
              })
              .catch((error) => {
                console.log(error);
              });
              
            Alert.alert("Succesfully Saved Recipe!");
        } catch (error) {
            console.log("Error: ", error)
            console.log(error)
            Alert.alert("Error When Trying To Save Recipe. Please Try Again")
        }

        
    }

    const openRecipeURL = async ()=>{
        await WebBrowser.openBrowserAsync(recipeInfo.sourceUrl); 
    }
    return(

        <SafeAreaView style = {modalStyle.pageStyle}>
                <ScrollView >
                {/** exit and save view  */}
                <View style={modalStyle.exitAndSaveContainer}>
                    <TouchableOpacity onPress={()=>closeInfoModal()}>
                        <AntDesign name="closesquare" size={40} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>saveRecipe()}>
                        <FontAwesome5 name="save" size={40} color="black" />
                    </TouchableOpacity>
                </View>
                
                {/**recipe title and website press */}
                <TouchableOpacity onPress={()=>openRecipeURL()}>
                    <Text style={modalStyle.title}>{recipeInfo.title +"\t" }
                        <FontAwesome name="external-link" size={24} color="black" style={{padding:20}} />
                    </Text>
                </TouchableOpacity>

                {/** cooktime view  */}
                <View style={{flexDirection:'row', alignSelf:'center', padding:16,gap:10}}>
                    <Text style={modalStyle.subTitle}>Servings: {recipeInfo.servings}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Ionicons name="timer" size={24} color="black" />
                        <Text style={modalStyle.subTitle}>{recipeInfo.readyInMinutes} mins</Text>
                    </View>
                </View>
                
                
                {/**bubble list of dishtypes (ex: lunch , main course, dinner) */}
                <Text style={modalStyle.bodyTitles}>Dish Types: </Text>
                <FlatList 
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    style={modalStyle.carouselStyle}
                    data={recipeInfo.dishTypes}
                    renderItem={({item})=>(
                        <View style={modalStyle.bubbleListItem}>
                            <Text style={modalStyle.bodyText}>{item}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index}
                />

                {/**ingredients carousel */}
                <Text style={modalStyle.bodyTitles}>Ingredients:</Text>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    style={modalStyle.carouselStyle}
                    data={recipeInfo.extendedIngredients}
                    renderItem={({item}) => renderIngredient(item)}
                    keyExtractor={(item, index) => index}
                />

                {/**instructions */}
                <Text style={modalStyle.bodyTitles}>Instructions: </Text>
                {/**
                 * TODO:    api returns html text, render that into react native component eventually 
                 * I WANT TO RENDER HTML DIRECTLY SO WE CAN GET A NICE FORMAT BUT LIBRARIES WEREN'T WORKING */}
                <Text style={modalStyle.bodyText}>{(recipeInfo.instructions) ? recipeInfo.instructions.replace(/<[^>]*>/g, '') : "No Instructions Provided"} </Text>
            </ScrollView>
        </SafeAreaView>
        
    )
}

export default RecipeModal; 


export const modalStyle = StyleSheet.create({
    pageStyle:{backgroundColor: 'white', flex:1, alignContent:'center'}, 
    exitAndSaveContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:16
    },
    title:{
        textAlign:'center',
        fontSize:24,
        fontWeight:'500'
    },
    subTitle:{
        textAlign:'center',
        fontSize:18,
        fontWeight:'400'
    },
    bodyTitles:{
        fontSize:20,
        fontWeight:'400',
        textAlign:'left',
        padding:10,
        paddingTop:20
    },
    bodyText:{
        textAlign:'justify',
        padding:10,
    },
    cookTime:{
        
    },
    bubbleListItem:{
        borderWidth:1,
        borderColor:'green',
        borderRadius:25,
        marginHorizontal:5
    },
    ingrImage:{
        width:65,
        height:65,
        resizeMode:'contain'
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
    carouselStyle:{padding:10, columnGap:10},
})