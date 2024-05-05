import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const InfoNote = ({children}: any) => {
  return (
    <View style={styles.faq}>
      <FontAwesomeIcon icon="triangle-exclamation" style={{color: '#ffea00'}} />
      <Text style={styles.color}>{children}</Text>
    </View>
  );
};

export default InfoNote;

export const styles = StyleSheet.create({
  faq: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 20,
  },

  color: {
    color: COLORS.white,
    width: '90%',
  },
});
