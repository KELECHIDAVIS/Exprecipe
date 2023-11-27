import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import GlobalStyles from '../assets/styles/GlobalStyles';

import { Controller } from 'react-hook-form';

export default function InputField({
  placeHolder,
  icon,
  secureTextEntry,
  fieldButtonLabel,
  fieldButtonFunction,
  control,
  rules={},
  name,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
      {icon}
      {/* <TextInput
          placeholder={placeHolder}
          style={{flex: 1, paddingVertical: 0}}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={setValue}
        /> */}

        <Controller
          control={control}
          name={name}
          rules={{required: true}}
          render ={({field: {value, onChange, onBlur}, fieldState:{error}}) => 
            <TextInput
            placeholder={placeHolder}
            style={[{flex: 1, paddingVertical: 0}, {backgroundColor: error ? 'orange': GlobalStyles.pageBackgroundColor.backgroundColor}]}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            />
          }

        />

      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{color: GlobalStyles.accentColor.backgroundColor, fontWeight: '700'}}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}