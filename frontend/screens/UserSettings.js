import { StatusBar } from 'expo-status-bar';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BannerButton from '../components/BannerButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import CheckBubble from '../components/CheckBubble';
import { useState } from 'react';

import GlobalStyles from '../assets/styles/GlobalStyles';
export default function UserSettings() {
  
  const [exclusion, setExclusion] = useState([
    {name : "Nuts", checked: false, id: "1"},
    {name : "Fish", checked: false, id: "2"},
    {name : "Eggs", checked: false, id: "3"},
    {name : "Dairy", checked: false, id: "4"},
    {name : "Pork", checked: false, id: "5"},
    {name : "Beef", checked: false, id: "6"},
  
  ]); 
  
  return (
    <ScrollView style={styles.container}>

        <Text style={styles.sectionHeader}>Allergies / Dietary Exclusions</Text>
        
        <View style= {styles.grid}>
          {exclusion.map((ingr)=>{
            return (
              <View key={ingr.id}>
                <CheckBubble name ={ingr.name} />
              </View>
            )
          })}
        </View>

        <Text style={styles.sectionHeader}>Help The Team</Text>
        <BannerButton name="Report A Bug" image={require("../assets/Images/bug-solid.png")} />
        <BannerButton name="Contact Us" image={require("../assets/Images/envelope-solid.png")} />


        <Text style={styles.sectionHeader}>Content</Text>
        <BannerButton name="Download Saved Recipes" image={require("../assets/Images/download-solid.png")} />
        
        <Text style={styles.sectionHeader}>User Guide</Text>
        <BannerButton name="How To Use Exprecipe" image={require("../assets/Images/book-solid.png")} />
        
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:  GlobalStyles.bgColor,
  },
  sectionHeader:{
    marginLeft:10,
    marginTop:25,
    fontWeight:"400",
    fontSize:17,
    color: GlobalStyles.secondaryColor
  }, 
  grid:{
    flex:1 ,
    flexDirection:"row",
    flexWrap:"wrap",
  }
});
