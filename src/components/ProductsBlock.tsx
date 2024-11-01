import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';
import OpacityPressable from './OpacityPressable';
import AddProductModal from './AddProductModal';
import firestore from '@react-native-firebase/firestore';
import {useAuthContext} from '../navigation/AuthProvider';
import moment from 'moment';
import ProductBar from './ProductBar';
import {useCaloriesContext} from '../navigation/CaloriesProvider';

const ProductsBlock = () => {
  const [loading, setLoading] = useState(true);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [products, setProducts] = useState([]);
  //@ts-expect-error
  const {user} = useAuthContext();
  const {
    //@ts-expect-error
    setConsumedCalories,
    //@ts-expect-error
    setConsumedProteins,
    //@ts-expect-error
    setConsumedFat,
    //@ts-expect-error
    setConsumedCarbs,
  } = useCaloriesContext();
  const dayId = `${moment().date()}.${moment().month()}`;

  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      try {
        const productsSnapshot = await firestore()
          .collection('users')
          .doc(user.uid)
          .collection('products')
          .doc(dayId)
          .get();

        const dbProds = productsSnapshot.data();
        if (!dbProds) {
          setProducts([]);
        } else {
          const unsubscribe = firestore()
            .collection('users')
            .doc(user.uid)
            .collection('products')
            .doc(dayId)
            .onSnapshot(snapshot => {
              console.log(snapshot);
              const updatedProds = snapshot.data();
              setProducts(updatedProds!.food);
              const summaries = updatedProds!.food.reduce(
                (acc, product) => {
                  acc.calories += product.calories;
                  acc.proteins += product.proteins;
                  acc.fat += product.fat;
                  acc.carbs += product.carbs;
                  return acc;
                },
                {calories: 0, proteins: 0, fat: 0, carbs: 0},
              );
              setConsumedCalories(summaries.calories);
              setConsumedProteins(summaries.proteins);
              setConsumedFat(summaries.fat);
              setConsumedCarbs(summaries.carbs);
            });
          return () => unsubscribe();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [
    user.uid,
    setConsumedCalories,
    dayId,
    setConsumedCarbs,
    setConsumedFat,
    setConsumedProteins,
  ]);

  const handleDelete = async (idx: number) => {
    const updatedProducts = products.filter((prod, index) => index !== idx);
    try {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('products')
        .doc(dayId)
        .update({
          food: updatedProducts,
        });
    } catch (e) {
      console.log(e);
    }
  };

  return loading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.text}>Consumed Products</Text>
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
            {products.map((prod, idx) => (
              <ProductBar
                key={idx}
                product={prod}
                onPress={() => handleDelete(idx)}
              />
            ))}
          </>
        ) : (
          <Text style={styles.text}>Not found products</Text>
        )}
      </View>
      <AddProductModal
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        setProducts={setProducts}
      />
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
    textAlign: 'center',
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
