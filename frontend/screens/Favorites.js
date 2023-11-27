import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecipeCard from '../components/RecipeCard';
import { useState } from 'react';
import GlobalStyles from '../assets/styles/GlobalStyles';


export default function Favorites() {
  const [recipeList, setRecipeList]  = useState([
    {name: "Pancakes", image:require("../assets/Images/pancake.png"), missingIngredients:0 , time :15 , ingredientCount: 8 , timeImage: require("../assets/Images/stopwatch-solid.png"), ingrImage:require("../assets/Images/wheat-awn-solid.png"), id:"1"},
    {name: "Lasagna", image:require("../assets/Images/lasagna.png"), missingIngredients:6 , time :45 , ingredientCount: 16 , timeImage: require("../assets/Images/stopwatch-solid.png"), ingrImage:require("../assets/Images/wheat-awn-solid.png"), id:"2"},
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
    backgroundColor:  GlobalStyles.pageBackgroundColor,
    
  },
});
