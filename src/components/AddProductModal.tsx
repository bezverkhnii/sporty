import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../constants/colors';
import OpacityPressable from './OpacityPressable';
import CustomButton from './CustomButton';
import {Formik} from 'formik';
import TextInputField from './TextInputField';
import firestore from '@react-native-firebase/firestore';
import {useAuthContext} from '../navigation/AuthProvider';
import {checkIfDocExists} from '../utils/checkIfDocExists';
import {addFoodItem} from '../utils/addFoodItem';
import moment from 'moment';

const AddProductModal = ({isOpened, setIsOpened}) => {
  const {user} = useAuthContext();

  const dayId = `${moment().date()}.${moment().month()}`;
  const [day, month] = dayId.split('.');
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={isOpened}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.heading}>Add product</Text>
            <Formik
              initialValues={{
                title: '',
                calories: '',
                fat: '',
                proteins: '',
                carbs: '',
              }}
              onSubmit={async ({title, calories, fat, proteins, carbs}) => {
                const newItem = {
                  title,
                  calories,
                  fat,
                  proteins,
                  carbs,
                };
                await addFoodItem(user.uid, dayId, newItem);
                setIsOpened(false);
              }}>
              {({handleChange, handleBlur, handleSubmit, values}) => (
                <View
                  style={{
                    gap: 10,
                    maxWidth: 240,
                    minWidth: 240,
                  }}>
                  <TextInput
                    placeholderTextColor={COLORS.grayText}
                    style={styles.input}
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
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TextInput
                      style={[{minWidth: 70, maxWidth: 70}, styles.input]}
                      placeholderTextColor={COLORS.grayText}
                      placeholder="Fat"
                      onChangeText={handleChange('fat')}
                      onBlur={handleBlur('fat')}
                      value={values.fat}
                    />
                    <TextInput
                      style={[{minWidth: 70, maxWidth: 70}, styles.input]}
                      placeholderTextColor={COLORS.grayText}
                      placeholder="Proteins"
                      onChangeText={handleChange('proteins')}
                      onBlur={handleBlur('proteins')}
                      value={values.proteins}
                    />
                    <TextInput
                      style={[{minWidth: 70, maxWidth: 70}, styles.input]}
                      placeholderTextColor={COLORS.grayText}
                      placeholder="Carbs"
                      onChangeText={handleChange('carbs')}
                      onBlur={handleBlur('carbs')}
                      value={values.carbs}
                    />
                  </View>
                  <CustomButton title="Save" onPress={handleSubmit} filled />
                  <CustomButton
                    title="Cancel"
                    onPress={() => setIsOpened(false)}
                  />
                </View>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddProductModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    paddingVertical: 20,
    paddingHorizontal: 60,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 5,
  },

  heading: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingBottom: 10,
    color: COLORS.white,
  },

  input: {
    borderWidth: 1,
    padding: 15,
    borderColor: COLORS.borderColor,
    borderRadius: 9,
    color: COLORS.white,
  },
});
