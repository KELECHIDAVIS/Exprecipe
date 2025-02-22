import { Stack } from "expo-router";

export default function PantryLayout() {
  return (
    <Stack >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="camera" options={{headerShown:false, presentation:'transparentModal',animation:'fade'}} />
    </Stack>
  );
}