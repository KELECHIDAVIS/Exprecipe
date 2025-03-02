import { View, Text, StyleSheet } from 'react-native';

export default function ComplexRecipePage() {
  return (
    <View style={styles.container}>
      <Text>Complex</Text>
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
