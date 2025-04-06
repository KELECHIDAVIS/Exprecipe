import React, { useState } from 'react';
import { View, Switch, FlatList, Text } from 'react-native';
import { AccordionItem } from '../../components/AccordionItem';

export default function ComplexRecipePage() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(prev => !prev);

  return (
    <View style={{ padding: 20 }}>
      <AccordionItem title="List of options">
        <FlatList
          data={['Option 1', 'Option 2', 'Option 3']}
          renderItem={({ item }) => <Text style={{ marginVertical: 4 }}>{item}</Text>}
          keyExtractor={(item) => item}
        />
      </AccordionItem>

      <AccordionItem title="Toggle switch">
        <Switch value={isEnabled} onValueChange={toggleSwitch} />
      </AccordionItem>

      <AccordionItem title="Nested Accordion">
        <AccordionItem title="Inner accordion">
          <Text>This is nested content.</Text>
        </AccordionItem>
      </AccordionItem>
    </View>
  );
}