import React from 'react';
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

const AddProductModal = ({isOpened, setIsOpened}) => {
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
              onSubmit={values => console.log(values)}>
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
                      flexDirection: 'row',
                      gap: 5,
                    }}>
                    <TextInput
                      style={styles.input}
                      placeholderTextColor={COLORS.grayText}
                      placeholder="Fat"
                      onChangeText={handleChange('fat')}
                      onBlur={handleBlur('fat')}
                      value={values.fat}
                    />
                    <TextInput
                      style={styles.input}
                      placeholderTextColor={COLORS.grayText}
                      placeholder="Proteins"
                      onChangeText={handleChange('proteins')}
                      onBlur={handleBlur('proteins')}
                      value={values.proteins}
                    />
                    <TextInput
                      style={styles.input}
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
