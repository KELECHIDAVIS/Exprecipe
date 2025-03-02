import { View, Text, StyleSheet, SafeAreaView, Pressable, FlatList, TextInput, Keyboard , TouchableWithoutFeedback} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
export default function SimpleRecipesPage() {

  const [recipes , setRecipes] = useState([]); 
  const [numResults, setNumResults] = useState(10); // 1-100 
  const [ranking, setRanking] = useState(2) // (1) maximize used ingrs , (2) minimize missing ingredients
  const [ignorePantry, setIgnorePantry] = useState(true);  // assume user has common ingrs like water, salt, flour, 
  
  

  return (
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.backgroundContainer} >
            {/* Filtering Option @ Top  */}
            <View style={styles.filterAndSearchContainer}> 
              <View style={styles.filterContainer}>
                <View style={styles.innerOptionsFormat}>
                  <Text style={styles.filterText}>Results</Text>
                  <TextInput style={styles.resultsTextInput} keyboardType='number-pad' onChangeText={setNumResults} value={numResults} placeholder="10" onSubmitEditing={Keyboard.dismiss} />
                </View>

                {/**The other two launch modals where the user can get more info and customize their search= */}
                <Pressable style={styles.innerOptionsFormat}>
                  <Text style={styles.filterText}>Ranking</Text>
                  <FontAwesome name="sort" size={24} color="black" />
                </Pressable>
                <Pressable style={styles.innerOptionsFormat}>
                  <Text style={styles.filterText}>IgnorePantry?</Text>
                  {ignorePantry ? (<Feather name="check" size={24} color="green" />): (<Feather name="x" size={24} color="red" />) }
                </Pressable>
              </View>
              <Pressable style={styles.searchButton}>
                <AntDesign name="search1" size={36} color="white" />
              </Pressable>
            </View>
        
            {/** Recipe List Container */}
            <FlatList 
              style={styles.recipeListContainer}
              data={recipes}
              renderItem={item=><Text>{item.id}</Text>}
              keyExtractor={item => item.id}

            />
          </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterAndSearchContainer:{
    marginVertical:20,
    flexDirection:'row',
    borderColor:'green',
    borderWidth:1,
    width:'100%',  
  },
  filterContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    flex:9,
    alignItems:'center',
    marginHorizontal:5
  },
  searchButton:{
    backgroundColor:'green',
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  recipeListContainer:{
    flex:9
  },
  filterText:{ 
    fontSize:16
   },
  innerOptionsFormat:{
    flexDirection:'row',
    alignItems:'center',
    gap:8
  },
  resultsTextInput:{
    width: 28,
    backgroundColor:"white",
    borderWidth:1,
  }

});
