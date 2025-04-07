import React, { useState } from 'react';
import {SafeAreaView, View, Switch, FlatList, Text, Modal, TouchableOpacity, StyleSheet, ScrollView, TextInput,Keyboard } from 'react-native';
import { AccordionItem } from '../../components/AccordionItem';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { RadioButton } from 'react-native-paper';
export default function ComplexRecipePage() {
  // filtering options
  const [cuisines, setCuisines]  = useState([]); 
  const [mealType, setMealType]= useState("main course")
  const [numResults, setNumResults] = useState(5); 
  const [ignorePantry, setIgnorePantry] = useState(true); 
  const [diet , setDiets] = useState([]); 
  const [intolerances, setIntolerances] = useState([]); 
  const [ingredients, setIngredients ] = useState([]); 
  const [maxReadyTime , setMaxReadyTime ] = useState(120) ; // in mins 
  const [minServings , setMinServings]  = useState(1) ; 
  const [sort , setSort] = useState('min-missing-ingredients') // min missing or max used ingredients
  const [isFilterModalVisible , setFilterModalVisible] = useState(false); 
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(prev => !prev);
  function launchFilterModal (){
    setFilterModalVisible(true); 
  }
  function closeModal(){
    setFilterModalVisible(false); 
  }
  return (
    
    <SafeAreaView style= {styles.background}>
      <View style={styles.filterAndSearchContainer}>
        <TouchableOpacity style={styles.filterContainer} onPress={launchFilterModal}>
          <Text style={styles.editFilterText}>Edit Filters</Text>
          {/* <Ionicons name="filter" size={24} color="black" /> */}
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'green'}}>
          <AntDesign name="search1" size={42} color="white" />
        </TouchableOpacity>
      </View>
      {/** Filtering Modal */}
      <Modal visible= {isFilterModalVisible}
        onRequestClose={()=>setFilterModalVisible(false)}
        transparent= {true}
      >
          <SafeAreaView style={styles.modalBackground}>
            <TouchableOpacity style={[styles.filterContainer, {marginBottom:20}]} onPress={closeModal}>
              <Text style= {styles.editFilterText}>Apply Filters</Text>
              <Feather name="check" size={24} color="green" />
            </TouchableOpacity>

            <AccordionItem title={"Simple"}>
              {/**Sort  */}
              <Text style = {styles.headerTitle}>Sort: </Text>
              <View>
                <RadioButton.Group onValueChange={newVal => setSort(newVal)} value= {sort}>
                  <View>
                    <RadioButton.Item label='Minimize Missing Ingredients' value='min-missing-ingredients'/>
                    <RadioButton.Item label='Maximize Used Ingredients' value='max-used-ingredients'/>
                  </View>
                </RadioButton.Group>
              </View>

              {/**Number Of results  */}
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style = {styles.headerTitle}>Num. Results: </Text>
                <TextInput style={styles.resultsTextInput} keyboardType='number-pad' onChangeText={setNumResults} value={numResults} placeholder={""+numResults}
                 onSubmitEditing={Keyboard.dismiss}
                 placeholderTextColor="black"
                 />
              </View>

              {/**Ignore Pantry  */}
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style = {styles.headerTitle}>IgnorePantry: </Text>
                <Switch
                    trackColor={{false: 'grey', true: '#f4f3f4'}}
                    thumbColor={ignorePantry ? 'green' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={setIgnorePantry}
                    value={ignorePantry}
                  />
              </View>
              {/**Max ReadyTime */}
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style = {styles.headerTitle}>Max Cook Time: </Text>
                <TextInput style={styles.resultsTextInput} keyboardType='number-pad' onChangeText={setMaxReadyTime} value={maxReadyTime} placeholder={""+maxReadyTime}
                 onSubmitEditing={Keyboard.dismiss}
                 placeholderTextColor="black"
                 />
              </View>
              {/**Min Servings */}
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style = {styles.headerTitle}>Min. Servings: </Text>
                <TextInput style={styles.resultsTextInput} keyboardType='number-pad' onChangeText={setMinServings} value={minServings} placeholder={""+minServings}
                 onSubmitEditing={Keyboard.dismiss}
                 placeholderTextColor="black"
                 />
              </View>
            </AccordionItem>

            
            <AccordionItem title={"Meal Types"}>

            </AccordionItem>

            
            <AccordionItem title={"Dietary Exclusions"}>

            </AccordionItem>
          </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background:{ flex:1 , alignItems:'center',  marginTop:32},
  filterAndSearchContainer: {flexDirection:'row', gap:8},
  filterContainer: {borderWidth: 1, borderColor:'green' , justifyContent:'center', flexDirection:'row', alignItems:'center'},
  editFilterText:{color:'black', padding:5, fontSize:18},
  modalBackground:{ flex:1 , alignItems:'center',   backgroundColor:'white'},
  headerTitle:{fontWeight:'500',fontSize:24, padding:5},
  resultsTextInput:{
    borderWidth:1,
    padding:5
  }, 
})