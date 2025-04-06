import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'green' , headerShown:true}}>
      <Tabs.Screen
        name="(pantry)"
        options={{
          title: 'Pantry',
          tabBarIcon: ({ color }) => <MaterialIcons name="door-sliding" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(recipes)"
        options={{
          title: 'Recipes',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart" color={color} />,
        }}
      />
     
    </Tabs>
  );
}
