import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';

const NutritionBlock = ({nutritionValue, nutritionType}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{nutritionValue}</Text>
      <Text style={styles.description}>{nutritionType}</Text>
    </View>
  );
};

export default NutritionBlock;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.transparent,
    width: 140,
    paddingVertical: 25,
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },

  description: {
    fontSize: 13,
    color: COLORS.white,
  },
});
