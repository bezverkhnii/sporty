import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS} from '../constants/colors';
import OpacityPressable from './OpacityPressable';
import AddProductModal from './AddProductModal';
import firestore from '@react-native-firebase/firestore';
import {useAuthContext} from '../navigation/AuthProvider';
import moment from 'moment';
import ProductBar from './ProductBar';

const ProductsBlock = () => {
  const [loading, setLoading] = useState(true);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [products, setProducts] = useState([]);
  const {user} = useAuthContext();
  //products prop
  //   const products = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  //add subscription to doc
  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      const dayId = `${moment().date()}.${moment().month()}`;
      try {
        const productsDocRef = await firestore()
          .collection('users')
          .doc(user.uid)
          .collection('products')
          .doc(dayId)
          .get();

        const dbProds = productsDocRef.data();
        if (!dbProds) {
          setProducts([]);
        } else {
          setProducts(dbProds.food);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [user.uid]);

  return loading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.text}>Products</Text>
        <OpacityPressable onPress={() => setIsOpened(true)}>
          <Text style={styles.addBtn}>Add product</Text>
        </OpacityPressable>
      </View>
      <View style={styles.productsField}>
        {products.length ? (
          <>
            <View style={styles.productsContainer}>
              <Text style={styles.text}>Title</Text>
              <Text style={styles.text}>Calories</Text>
            </View>
            {products.map(prod => (
              <ProductBar key={prod.title} product={prod} />
            ))}
          </>
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
    color: COLORS.white,
    fontWeight: 'bold',
  },

  addBtn: {
    color: COLORS.green,
    fontWeight: 'bold',
    fontSize: 15,
  },

  productsField: {
    paddingVertical: 20,
    justifyContent: 'center',
    // alignItems: 'center',
    gap: 5,
  },

  productsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
