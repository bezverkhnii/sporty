import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';
import {useAuthContext} from '../navigation/AuthProvider';

const TextInputField = ({value, placeholder, editable = true}) => {
  const {user} = useAuthContext();

  console.log(user);

  return (
    <View style={styles.inputBox}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={COLORS.borderColor}
        value={value}
        // onChangeText={e => setEmail(e)}
        style={[!editable ? {color: COLORS.borderColor} : {}, {width: '100%'}]}
        editable={editable}
      />
    </View>
  );
};

export default TextInputField;

export const styles = StyleSheet.create({
  inputBox: {
    width: '100%',
    height: 48,
    borderColor: COLORS.borderColor,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22,
  },
});