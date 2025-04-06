// AccordionItem.tsx
import React, { useRef, useState, useEffect } from 'react';
import { Animated, Easing, Text, View, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';// optional icon

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const AccordionItem = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(prev => !prev);
  };

  return (
    <View style={{
      marginVertical: 8,
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: '#f3f3f3',
    }}>
      <TouchableOpacity
        onPress={toggleAccordion}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16,
          backgroundColor: '#e0e0e0',
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: '600' }}>{title}</Text>
        <Animated.View style={{
          transform: [{ rotate: expanded ? '180deg' : '0deg' }],
        }}>
          <Entypo name="chevron-down" size={24} color="black" />
        </Animated.View>
      </TouchableOpacity>

      {expanded && (
        <View style={{ padding: 16 }}>
          {children}
        </View>
      )}
    </View>
  );
};
