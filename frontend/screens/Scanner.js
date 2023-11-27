import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GlobalStyles from '../assets/styles/GlobalStyles';



export default function Scanner() {
  return (
    <View style={styles.container}>
      <Text> Scanner </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
