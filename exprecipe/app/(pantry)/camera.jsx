import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function CameraScreen() {
  const router = useRouter();

  return (
    <View>
      <Text>Camera Page</Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}
