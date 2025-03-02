import { View, Text, StyleSheet } from 'react-native';

export default function SavedRecipePage() {
  return (
    <View style={styles.container}>
      <Text>Saved Recipes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
