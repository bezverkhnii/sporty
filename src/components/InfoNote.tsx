import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';

const InfoNote = ({children}: any) => {
  return (
    <View style={styles.faq}>
      <Text style={styles.color}>{children}</Text>
    </View>
  );
};

export default InfoNote;

export const styles = StyleSheet.create({
  faq: {
    alignItems: 'center',
    paddingVertical: 10,
  },

  color: {
    color: COLORS.white,
  },
});
