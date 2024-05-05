import { FlatList, Text, View, StyleSheet, Image, Button, ScrollView} from 'react-native'
import { useSelector } from 'react-redux'
import { AntDesign } from '@expo/vector-icons';
import {openBrowserAsync} from 'expo-web-browser'
function RecipeModalContent({currentRecipe}){ 
    const baseImageURL = "https://spoonacular.com/cdn/ingredients_100x100/";
   return( 
    <ScrollView style={{padding:15, alignContent:'center'}}>
      
          <Text style ={styles.title}>{currentRecipe.title}</Text>
          <View style = {styles.timeContainer}>
            <AntDesign name="clockcircle" size={18} color="black" />
            <Text style={{fontSize: 18, fontWeight:'bold'}}>{currentRecipe.readyInMinutes}</Text>
          </View>
          <Text style={{fontSize:18 , marginTop:8}}>Ingredients:</Text>
          <FlatList 
            horizontal
            contentContainerStyle={{alignItems: 'center', justifyContent:'space-evenly'}}
            data={currentRecipe.extendedIngredients}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item})=>{
              return(
                <View style= {{ margin:10}}>
                  <Image
                    source={{ uri: baseImageURL + item.image }}
                    style={{ width: 85, height: 85 , resizeMode:'stretch'}} // Adjust dimensions as needed
                  />
                  <Text style={{fontSize:14,backgroundColor:'tan'}}>{item.name}</Text>
                </View>
              )
            }}
          />
          <Text style={{fontSize:18 , marginTop:8}}>Instructions:</Text>
          {currentRecipe.instructions ? (
            <Text style={{fontSize:16 , marginTop:8, alignSelf:'center'}}>{currentRecipe.instructions}</Text>
          ) : (
            <Button title= "Instructions Can Be Found Here" onPress={()=>openBrowserAsync(currentRecipe.sourceUrl)} /> 
          )}
          

      </ScrollView>
   )
}
export default RecipeModalContent; 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      alignContent:'center',
      padding:10,
    },
    timeContainer: {
      margin:10, 
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      gap:10
      
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 24,
      textAlign:'center',
      fontWeight:'bold'
    },
  });

