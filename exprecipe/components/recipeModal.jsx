import {View, FlatList, Text , Modal, StyleSheet, Pressable}  from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
// this modal receives recipe info object that will have detailed info about the recipe

// also takes in the ingredients the user has and doesn't have so we can color code the ingredient based on names

const RecipeModal = (visible , setModalVisible, recipeInfo, usedIngredients, missingIngredients) =>{
    <SafeAreaView>
        <Modal
            animationType='fade'    
            transparent= 'false'
            visible={visible}
            onRequestClose={()=>{setModalVisible(false)}}
        >
            {/** exit and save view  */}
            <View style={modalStyle.exitAndSaveContainer}>
                <Pressable>
                    <AntDesign name="closesquare" size={24} color="black" />
                </Pressable>
                <Pressable>
                    <FontAwesome5 name="save" size={24} color="black" />
                </Pressable>
            </View>
            
            {/**recipe title and website press */}
            <Pressable>
                <Text style={modalStyle.title}>{recipeInfo.title}</Text>
                <FontAwesome name="external-link" size={24} color="black" />
            </Pressable>

            <Text style={modalStyle.subTitle}>Servings: {recipeInfo.servings}</Text>
            {/** cooktime view  */}
            <View>
                <Ionicons name="timer" size={24} color="black" />
                <Text style={modalStyle.cookTime}>{recipeInfo.readyInMinutes} mins</Text>
            </View>
            
            {/**bubble list of dishtypes (ex: lunch , main course, dinner) */}
            <Text style={modalStyle.subTitle}>Dish Types: </Text>
            <FlatList 
                data={recipeInfo.dishTypes}
            />

            {/**ingredients carousel */}
            <Text style={modalStyle.subTitle}>Ingredients:</Text>
            <FlatList
                data={recipeInfo.extendedIngredients}
            />

            {/**instructions */}
            <Text style={modalStyle.subTitle}>Instructions: </Text>
            <Text style={modalStyle.bodyText}>{recipeInfo.instructions} </Text>
        </Modal>
    </SafeAreaView>
}

export default RecipeModal; 


const modalStyle = StyleSheet.create({

})