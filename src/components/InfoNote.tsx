import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';

const InfoNote = ({children}) => {
  return (
    <View style={styles.faq}>
      <Text>{children}</Text>
    </View>
  );
};

export default InfoNote;

export const styles = StyleSheet.create({
  faq: {
    alignItems: 'center',
    paddingVertical: 10,
    color: COLORS.grayText,
  },
});
