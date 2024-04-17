import React, {useState} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';
import OpacityPressable from './OpacityPressable';
import AddProductModal from './AddProductModal';

const ProductsBlock = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  //products prop
  //   const products = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const products = [];

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.text}>Products</Text>
        <OpacityPressable onPress={() => setIsOpened(true)}>
          <Text style={styles.addBtn}>Add product</Text>
        </OpacityPressable>
      </View>
      <View style={styles.productsField}>
        {products.length ? (
          products.map(prod => <Text>{prod}</Text>)
        ) : (
          <Text style={styles.text}>Not found products</Text>
        )}
      </View>
      <AddProductModal isOpened={isOpened} setIsOpened={setIsOpened} />
    </View>
  );
};

export default ProductsBlock;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: COLORS.transparent,
    padding: 20,
  },

  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  text: {
    textAlign: 'center',
    color: COLORS.white,
  },

  addBtn: {
    color: COLORS.green,
    fontWeight: 'bold',
    fontSize: 15,
  },

  productsField: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});
