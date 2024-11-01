import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';

const InfoBlock = ({
  title,
  measurement,
  filled = false,
}: {
  title: string;
  measurement: string | number;
  filled?: boolean;
}) => {
  return (
    <View
      style={[filled ? styles.filled : styles.transparent, styles.container]}>
      <Text
        style={[
          filled ? {color: COLORS.primary} : {color: COLORS.white},
          styles.text,
        ]}>
        {title}
      </Text>
      <Text
        style={[
          filled ? {color: COLORS.primary} : {color: COLORS.white},
          styles.measurement,
        ]}>
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
  },
  measurement: {
    paddingTop: 20,
    fontWeight: 'bold',
    fontSize: 17,
  },
});
