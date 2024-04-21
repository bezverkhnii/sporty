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
import {COLORS} from '../constants/colors';
import CustomButton from './CustomButton';
import {Formik} from 'formik';
import {useAuthContext} from '../navigation/AuthProvider';
import {addFoodItem} from '../utils/addFoodItem';
import moment from 'moment';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SelectList} from 'react-native-dropdown-select-list';
import firestore from '@react-native-firebase/firestore';
import {updateNutritionBasedOnWeight} from '../utils/updateNutritionBasedOnWeight';
import {updateCaloriesBasedOnNutrition} from '../utils/updateCaloriesBasedOnNutrition';
import NutritionBlock from './NutritionBlock';
import AddNewProductModal from './AddNewProductModal';

const AddProductModal = ({isOpened, setIsOpened}) => {
  const {user} = useAuthContext();
  const insets = useSafeAreaInsets();
  const [existingProducts, setExistingProducts] = useState([]);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [calories, setCalories] = useState<number>();
  const [proteins, setProteins] = useState<number | string>();
  const [fat, setFat] = useState<number | string>();
  const [carbs, setCarbs] = useState<number | string>();
  const [isVisible, setIsVisible] = useState(false);

  const dayId = `${moment().date()}.${moment().month()}`;
  const [day, month] = dayId.split('.');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productSnapshot = await firestore().collection('products').get();
        const data = productSnapshot.docs.map(doc => {
          return {id: doc.id, data: doc.data()};
        });

        const listData = data.map(item => {
          return {key: item.id, value: item.data.title};
        });
        setExistingProducts(data);
        setData(listData);

        const unsubscribe = firestore()
          .collection('products')
          .onSnapshot(snapshot => {
            const updatedData = snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data(),
            }));
            const updatedListData = updatedData.map(item => ({
              key: item.id,
              value: item.data.title,
            }));
            setExistingProducts(updatedData);
            setData(updatedListData);
          });
        return () => unsubscribe();
      } catch (error: any) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const handleSelect = () => {
    setSelectedProduct(existingProducts.find(({id}) => id === selected));
  };

  const handleChange = grams => {
    const updatedProteins = updateNutritionBasedOnWeight(
      grams,
      selectedProduct.data.proteins,
    );
    const updatedFat = updateNutritionBasedOnWeight(
      grams,
      selectedProduct.data.fat,
    );
    const updatedCarbs = updateNutritionBasedOnWeight(
      grams,
      selectedProduct.data.carbs,
    );

    const newOtherState = updateCaloriesBasedOnNutrition(
      updatedProteins,
      updatedFat,
      updatedCarbs,
    );

    setProteins(updatedProteins);
    setFat(updatedFat);
    setCarbs(updatedCarbs);
    setCalories(newOtherState);
  };

  const handleSubmit = async () => {
    const newItem = {
      title: selectedProduct.data.title,
      calories,
      proteins,
      fat,
      carbs,
    };
    await addFoodItem(user.uid, dayId, newItem);
    setIsOpened(false);
  };

  return (
    <Modal animationType="slide" visible={isOpened}>
      <View style={[{paddingTop: insets.top}, styles.centeredView]}>
        <View style={styles.modalView}>
          <Text style={styles.heading}>Add product</Text>
          <View
            style={{
              gap: 10,
            }}>
            <SelectList
              dropdownTextStyles={{color: COLORS.white}}
              inputStyles={{color: COLORS.white}}
              onSelect={() => handleSelect()}
              search={true}
              data={data}
              setSelected={val => setSelected(val)}
              save="key"
            />
            <TextInput
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              placeholder="Grams | 100 by default"
              onChangeText={val => handleChange(val)}
            />
            {selectedProduct && (
              <View style={styles.nutritionBlock}>
                <NutritionBlock
                  nutritionValue={
                    calories ? calories : selectedProduct.data.calories
                  }
                  nutritionType="Overrall calories"
                />
                <NutritionBlock
                  nutritionValue={
                    proteins ? proteins : selectedProduct.data.proteins
                  }
                  nutritionType="Proteins"
                />
                <NutritionBlock
                  nutritionValue={fat ? fat : selectedProduct.data.fat}
                  nutritionType="Fat"
                />
                <NutritionBlock
                  nutritionValue={carbs ? carbs : selectedProduct.data.carbs}
                  nutritionType="Carbs"
                />
              </View>
            )}
            <Text>Can't find product? Add it!</Text>
            <CustomButton
              title="Add new product"
              filled
              onPress={() => setIsVisible(true)}
            />
            <CustomButton title="Save" onPress={handleSubmit} filled />
            <CustomButton title="Cancel" onPress={() => setIsOpened(false)} />
            <AddNewProductModal
              isVisible={isVisible}
              setIsVisible={setIsVisible}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddProductModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
  },
  modalView: {
    borderRadius: 20,
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

  nutritionBlock: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
});
