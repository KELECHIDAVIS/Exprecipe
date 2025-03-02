import { Tabs } from "expo-router";

import {ParamListBase, TabNavigationState} from '@react-navigation/native'
import {createMaterialTopTabNavigator,MaterialTopTabNavigationOptions , MaterialTopTabNavigationEventMap} from "@react-navigation/material-top-tabs"; 
import { withLayoutContext } from "expo-router";
// have to make sure this meshes w/ expo router 
const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);


export default function RecipesLayout() {
  return <MaterialTopTabs></MaterialTopTabs>  
}