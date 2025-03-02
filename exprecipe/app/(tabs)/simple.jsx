import { View, Text, StyleSheet } from 'react-native';

export default function SimpleRecipesPage() {
  return (
    <View style={styles.container}>
      <Text>Simple</Text>
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
