import React from 'react';
import {View, TextInput, StyleSheet, Text, Button} from 'react-native';
import {COLORS} from '../constants/colors';

const ParametersInput = ({value, placeholder}) => {
  return (
    <View style={styles.container}>
      <Text>{placeholder}</Text>
      <View style={styles.inputBox}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={COLORS.borderColor}
          value={value}
          // onChangeText={e => setEmail(e)}
          style={{width: '100%'}}
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
    height: 48,
    borderColor: COLORS.borderColor,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22,
  },
});
