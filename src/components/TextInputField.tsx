import React from 'react';
import {View, TextInput, StyleSheet, TextInputProps} from 'react-native';
import {COLORS} from '../constants/colors';

interface ITextInputField {
  value: string;
  placeholder: string;
  editable?: boolean;
  onChangeText?: (text: string) => void;
}

const TextInputField: React.FC<ITextInputField> = ({
  value,
  placeholder,
  editable = true,
  onChangeText,
}) => {
  return (
    <View style={styles.inputBox}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={COLORS.borderColor}
        value={value}
        onChangeText={onChangeText}
        style={[!editable ? {color: COLORS.grayText} : {}, {width: '100%'}]}
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
