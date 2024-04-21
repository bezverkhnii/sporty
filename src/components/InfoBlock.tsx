import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';

const InfoBlock = ({title, measurement, filled = false}) => {
  return (
    <View
      style={[filled ? styles.filled : styles.transparent, styles.container]}>
      <Text style={[filled ? {color: COLORS.primary} : {}, styles.text]}>
        {title}
      </Text>
      <Text style={[filled ? {color: COLORS.primary} : {}, styles.measurement]}>
        {measurement}
      </Text>
    </View>
  );
};

export default InfoBlock;

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    width: 170,
    paddingHorizontal: 10,
    justifyContent: 'center',

    borderRadius: 10,
  },
  filled: {
    backgroundColor: COLORS.green,
  },

  transparent: {
    backgroundColor: COLORS.transparent,
  },

  text: {
    fontWeight: '500',
    color: COLORS.white,
  },
  measurement: {
    paddingTop: 20,
    fontWeight: 'bold',
    fontSize: 17,
    color: COLORS.white,
  },
});
