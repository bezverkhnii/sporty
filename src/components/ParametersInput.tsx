import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {COLORS} from '../constants/colors';

const ParametersInput = ({
  value,
  placeholder,
  onChangeText,
}: {
  value: number | undefined;
  placeholder: string;
  onChangeText: (val: number) => void;
}) => {
  return (
    <View style={styles.container}>
      <Text style={{color: COLORS.white}}>{placeholder}</Text>
      <View style={styles.inputBox}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={COLORS.borderColor}
          value={value}
          onChangeText={onChangeText}
          style={{width: '100%', color: COLORS.white}}
          inputMode="numeric"
        />
      </View>
    </View>
  );
};

export default ParametersInput;

export const styles = StyleSheet.create({
  container: {
    width: '47%',
    gap: 5,
  },

  inputBox: {
    backgroundColor: 'rgba(51,51,51,0.5)',
    paddingHorizontal: 15,
    paddingVertical: 15,
    gap: 5,
    borderRadius: 25,
  },
});
