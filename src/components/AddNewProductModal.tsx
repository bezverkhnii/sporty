import React from 'react';
import {Modal, StyleSheet, Text, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import CustomButton from './CustomButton';
import {COLORS} from '../constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import LottieView from 'lottie-react-native';

interface IFormValues {
  title: string;
  calories: string;
  proteins: string;
  fat: string;
  carbs: string;
}

const AddNewProductModal = ({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: (state: boolean) => void;
}) => {
  const insets = useSafeAreaInsets();

  const handleAddProduct = async (values: IFormValues) => {
    try {
      const {title, calories, proteins, fat, carbs} = values;
      await firestore().collection('products').add({
        title,
        calories,
        proteins,
        fat,
        carbs,
      });
      console.log('Product added succesfully');
      setIsVisible(false);
    } catch (error: any) {
      console.log(error.messsage);
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={[{paddingTop: insets.top}, styles.centeredView]}>
        <Text style={styles.heading}>Add New Product</Text>
        <LottieView
          style={styles.animation}
          source={require('../assets/animations/NewProduct.json')}
          autoPlay
        />
        <Formik
          initialValues={{
            title: '',
            calories: '',
            proteins: '',
            fat: '',
            carbs: '',
          }}
          onSubmit={values => handleAddProduct(values)}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholderTextColor={COLORS.grayText}
                placeholder="Product Name"
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
              />
              <TextInput
                style={styles.input}
                placeholderTextColor={COLORS.grayText}
                placeholder="Calories"
                onChangeText={handleChange('calories')}
                onBlur={handleBlur('calories')}
                value={values.calories}
              />
              <View style={styles.nutritionInputs}>
                <TextInput
                  style={[{minWidth: 100, maxWidth: 100}, styles.input]}
                  placeholderTextColor={COLORS.grayText}
                  placeholder="Proteins"
                  onChangeText={handleChange('proteins')}
                  onBlur={handleBlur('proteins')}
                  value={values.proteins}
                />
                <TextInput
                  style={[{minWidth: 100, maxWidth: 100}, styles.input]}
                  placeholderTextColor={COLORS.grayText}
                  placeholder="Fat"
                  onChangeText={handleChange('fat')}
                  onBlur={handleBlur('fat')}
                  value={values.fat}
                />
                <TextInput
                  style={[{minWidth: 100, maxWidth: 100}, styles.input]}
                  placeholderTextColor={COLORS.grayText}
                  placeholder="Carbs"
                  onChangeText={handleChange('carbs')}
                  onBlur={handleBlur('carbs')}
                  value={values.carbs}
                />
              </View>
              <CustomButton title="Add" onPress={handleSubmit} filled />
              <CustomButton
                title="Cancel"
                onPress={() => setIsVisible(false)}
              />
            </View>
          )}
        </Formik>
      </View>
    </Modal>
  );
};

export default AddNewProductModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    padding: 15,
    borderColor: COLORS.borderColor,
    borderRadius: 9,
    color: COLORS.white,
  },

  heading: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingBottom: 10,
    color: COLORS.white,
  },

  animation: {
    height: 300,
  },

  nutritionInputs: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  form: {
    gap: 10,
  },
});
