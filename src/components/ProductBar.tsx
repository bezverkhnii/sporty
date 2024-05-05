import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';
import {Swipeable} from 'react-native-gesture-handler';
import OpacityPressable from './OpacityPressable';
import {IProductData} from '../types';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const ProductBar = ({
  product,
  onPress,
}: {
  product: IProductData;
  onPress: () => void;
}) => {
  const leftSwipe = () => {
    return (
      <View style={styles.deleteBox}>
        <OpacityPressable onPress={onPress}>
          <FontAwesomeIcon icon="trash" style={{color: '#ff5555'}} size={25} />
        </OpacityPressable>
      </View>
    );
  };

  return (
    <Swipeable renderLeftActions={leftSwipe}>
      <View style={styles.container}>
        <Text style={styles.text}>{product.title}</Text>
        <Text style={styles.text}>{product.calories}</Text>
      </View>
    </Swipeable>
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

  deleteBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
});
