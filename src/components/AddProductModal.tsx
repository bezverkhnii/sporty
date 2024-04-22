import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import {COLORS} from '../constants/colors';
import CustomButton from './CustomButton';
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
import {IProduct, ISelectListData} from '../types';
import LottieView from 'lottie-react-native';

const AddProductModal = ({
  isOpened,
  setIsOpened,
}: {
  isOpened: boolean;
  setIsOpened: (state: boolean) => void;
}) => {
  //@ts-expect-error
  const {user} = useAuthContext();
  const insets = useSafeAreaInsets();
  const [existingProducts, setExistingProducts] = useState<IProduct[]>([]);
  const [data, setData] = useState<ISelectListData[]>([]);
  const [selected, setSelected] = useState<string>();
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>();
  const [calories, setCalories] = useState<number>();
  const [proteins, setProteins] = useState<number | string>();
  const [fat, setFat] = useState<number | string>();
  const [carbs, setCarbs] = useState<number | string>();
  const [isVisible, setIsVisible] = useState(false);

  const dayId = `${moment().date()}.${moment().month()}`;

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

  const handleChange = (grams: string) => {
    const updatedProteins = updateNutritionBasedOnWeight(
      grams,
      selectedProduct!.data.proteins,
    );
    const updatedFat = updateNutritionBasedOnWeight(
      grams,
      selectedProduct!.data.fat,
    );
    const updatedCarbs = updateNutritionBasedOnWeight(
      grams,
      selectedProduct!.data.carbs,
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
      title: selectedProduct!.data.title,
      calories,
      proteins,
      fat,
      carbs,
    };
    await addFoodItem(user.uid, dayId, newItem);
    setIsOpened(false);
    setSelected('');
    setSelectedProduct(null);
  };

  const handleCancel = () => {
    setIsOpened(false);
    setSelected('');
    setSelectedProduct(null);
  };

  return (
    <Modal animationType="slide" visible={isOpened}>
      <View style={[{paddingTop: insets.top}, styles.centeredView]}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{paddingBottom: insets.bottom}}>
          <View style={styles.modalView}>
            <Text style={styles.heading}>Add product</Text>
            <LottieView
              style={styles.animation}
              source={require('../assets/animations/Food.json')}
              autoPlay
            />
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
                setSelected={(val: string) => setSelected(val)}
                save="key"
              />
              {selectedProduct && (
                <>
                  <TextInput
                    placeholderTextColor={COLORS.grayText}
                    style={styles.input}
                    placeholder="Grams | 100 by default"
                    onChangeText={val => handleChange(val)}
                  />
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
                      nutritionValue={
                        carbs ? carbs : selectedProduct.data.carbs
                      }
                      nutritionType="Carbs"
                    />
                  </View>
                </>
              )}
              <CustomButton title="Save" onPress={handleSubmit} filled />
              <CustomButton title="Cancel" onPress={handleCancel} />
              <AddNewProductModal
                isVisible={isVisible}
                setIsVisible={setIsVisible}
              />
              <Text style={styles.addNew}>
                Can't find product?{' '}
                <Text style={styles.highlighted}>Add it!</Text>
              </Text>
              <CustomButton
                title="Add new product"
                filled
                onPress={() => setIsVisible(true)}
              />
            </View>
          </View>
        </ScrollView>
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

  animation: {
    height: 250,
    marginVertical: 20,
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

  addNew: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.white,
    fontWeight: '500',
  },

  highlighted: {
    color: COLORS.green,
  },
});
