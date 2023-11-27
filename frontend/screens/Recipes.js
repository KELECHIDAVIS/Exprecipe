import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecipeCard from '../components/RecipeCard';
import { useState } from 'react';
import GlobalStyles from '../assets/styles/GlobalStyles';


export default function Recipes() {
  const [recipeList, setRecipeList]  = useState([
    {name: "Pancakes", image:require("../assets/Images/pancake.png"), missingIngredients:0 , time :15 , ingredientCount: 8 , timeImage: require("../assets/Images/stopwatch-solid.png"), ingrImage:require("../assets/Images/wheat-awn-solid.png"), id:"1"},
    {name: "Waffles", image:require("../assets/Images/waffles.png"), missingIngredients:1 , time :20 , ingredientCount: 10, timeImage: require("../assets/Images/stopwatch-solid.png"), ingrImage:require("../assets/Images/wheat-awn-solid.png"), id:"2"},
    {name: "Peach Cobler", image:require("../assets/Images/peachCobbler.png"), missingIngredients:2 , time :15 , ingredientCount: 8 , timeImage: require("../assets/Images/stopwatch-solid.png"), ingrImage:require("../assets/Images/wheat-awn-solid.png"), id:"3"},
    {name: "Mac And Cheese", image:require("../assets/Images/mac.png"), missingIngredients:3 , time :30 , ingredientCount: 16, timeImage: require("../assets/Images/stopwatch-solid.png"), ingrImage:require("../assets/Images/wheat-awn-solid.png"), id:"4"},
    {name: "Lasagna", image:require("../assets/Images/lasagna.png"), missingIngredients:6 , time :45 , ingredientCount: 16 , timeImage: require("../assets/Images/stopwatch-solid.png"), ingrImage:require("../assets/Images/wheat-awn-solid.png"), id:""},
  ])

  return (
    <FlatList style={styles.container}
      data={recipeList}
      keyExtractor={ (item) => item.id}
      renderItem={({item})=>{
        return (
          <RecipeCard name={item.name} image={item.image} missingIngredients={item.missingIngredients} time={item.time} ingredientCount={item.ingredientCount} timeImage={item.timeImage}  ingrImage={item.ingrImage} />
        )
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.pageBackgroundColor,
    
  },
});
