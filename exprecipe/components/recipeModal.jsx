import {View, FlatList, Text , Modal, StyleSheet, TouchableOpacity, SafeAreaView,ScrollView}  from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
// this modal receives recipe info object that will have detailed info about the recipe

// also takes in the ingredients the user has and doesn't have so we can color code the ingredient based on names

const RecipeModal = ({recipeInfo, usedIngredients, missingIngredients}) =>{
    
    return(

        <SafeAreaView style = {modalStyle.pageStyle}>
                <ScrollView >
                {/** exit and save view  */}
                <View style={modalStyle.exitAndSaveContainer}>
                    <TouchableOpacity >
                        <AntDesign name="closesquare" size={40} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome5 name="save" size={40} color="black" />
                    </TouchableOpacity>
                </View>
                
                {/**recipe title and website press */}
                <TouchableOpacity>
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
                    style={{padding:10, columnGap:10}}
                    data={recipeInfo.dishTypes}
                    renderItem={({item})=>(
                        <View style={modalStyle.bubbleListItem}>
                            <Text style={modalStyle.bodyText}>{item}</Text>
                        </View>
                    )}
                />

                {/**ingredients carousel */}
                <Text style={modalStyle.bodyTitles}>Ingredients:</Text>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    data={recipeInfo.extendedIngredients}
                />

                {/**instructions */}
                <Text style={modalStyle.bodyTitles}>Instructions: </Text>
                <Text style={modalStyle.bodyText}>{recipeInfo.instructions} </Text>
            </ScrollView>
        </SafeAreaView>
        
    )
}

export default RecipeModal; 


const modalStyle = StyleSheet.create({
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
    }
})