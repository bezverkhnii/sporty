import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';

interface IProd {
  product: {
    title: string;
    calories: string;
    proteins: string;
    fat: string;
    carbs: string;
  };
}

const ProductBar = ({product}: IProd) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{product.title}</Text>
      <Text style={styles.text}>{product.calories}</Text>
    </View>
  );
};

export default ProductBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.transparent,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7,
    justifyContent: 'space-between',
  },

  text: {
    color: COLORS.white,
  },
});
