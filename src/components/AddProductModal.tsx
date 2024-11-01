import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Alert,
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
import {updateCaloriesBasedWeight} from '../utils/updateCaloriesBasedWeight';
import NutritionBlock from './NutritionBlock';
import AddNewProductModal from './AddNewProductModal';
import {IProduct, ISelectListData} from '../types';
import LottieView from 'lottie-react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const AddProductModal = ({
  isOpened,
  setIsOpened,
  setProducts,
}: {
  isOpened: boolean;
  setIsOpened: (state: boolean) => void;
  setProducts?: (state: any[]) => void;
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
  const [gramsError, setGramsError] = useState(false);
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

    const newCalories = updateCaloriesBasedWeight(
      selectedProduct!.data.calories,
      grams,
    );

    setProteins(updatedProteins);
    setFat(updatedFat);
    setCarbs(updatedCarbs);
    setCalories(newCalories);
  };

  const handleSubmit = async () => {
    try {
      const newItem = {
        title: selectedProduct!.data.title,
        calories,
        proteins,
        fat,
        carbs,
      };
      if (!proteins || !fat || !carbs) {
        setGramsError(true);
        return;
      }
      await addFoodItem(user.uid, dayId, newItem);
      setIsOpened(false);
      setSelected('');
      setSelectedProduct(null);
    } catch (error) {
      Alert.alert(
        'Select a product',
        'Please select a product from present ones or create a new one!',
      );
    }
  };

  const handleCancel = () => {
    setGramsError(false);
    setIsOpened(false);
    setSelected('');
    setSelectedProduct(null);
  };

  return (
    <Modal animationType="slide" visible={isOpened}>
      <View style={[{paddingTop: insets.top}, styles.centeredView]}>
        <View style={styles.gradientRight}></View>
        <View style={styles.gradientLeft}></View>
        <ScrollView
          style={{flex: 1, width: '100%'}}
          contentContainerStyle={{paddingBottom: insets.bottom}}>
          <View style={styles.modalView}>
            <Text style={styles.heading}>Add product</Text>
            <View
              style={{
                gap: 10,
              }}>
              <SelectList
                boxStyles={styles.dropdownBox}
                dropdownTextStyles={styles.dropdownTextItem}
                dropdownStyles={styles.dropdown}
                searchicon={
                  <FontAwesomeIcon
                    icon="magnifying-glass"
                    color={COLORS.white}
                  />
                }
                closeicon={
                  <FontAwesomeIcon
                    icon="plus"
                    style={{transform: [{rotate: '45deg'}]}}
                    size={25}
                    color={COLORS.white}
                  />
                }
                arrowicon={
                  <FontAwesomeIcon icon="angle-down" color={COLORS.white} />
                }
                dropdownItemStyles={styles.dropdownItem}
                inputStyles={styles.dropdownInputStyles}
                onSelect={() => handleSelect()}
                search={true}
                data={data}
                setSelected={(val: string) => setSelected(val)}
                save="key"
              />
              {selectedProduct && (
                <>
                  <TextInput
                    keyboardType="numeric"
                    placeholderTextColor={COLORS.grayText}
                    style={styles.input}
                    placeholder="Grams | Data below is shown for 100g"
                    onChangeText={val => handleChange(val)}
                    onFocus={() => setGramsError(false)}
                  />
                  {gramsError && (
                    <Text style={styles.error}>This field is Required</Text>
                  )}
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
              <View style={{alignSelf: 'center', gap: 15, paddingTop: 20}}>
                <CustomButton
                  title="Save"
                  disabled={gramsError}
                  onPress={handleSubmit}
                  filled
                />
                <CustomButton title="Cancel" onPress={handleCancel} />
              </View>
              <AddNewProductModal
                isVisible={isVisible}
                setIsVisible={setIsVisible}
              />
              <View
                style={{alignSelf: 'center', alignItems: 'center', gap: 20}}>
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
    // width: '100%',
  },

  heading: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingBottom: 10,
    color: COLORS.white,
    alignSelf: 'center',
  },

  animation: {
    height: 250,
    marginVertical: 20,
  },

  input: {
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
    borderWidth: 0,
    fontSize: 16,
    borderRadius: 30,
    fontWeight: '600',
    padding: 12,
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

  dropdown: {
    borderWidth: 0,
  },

  dropdownBox: {
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
    borderWidth: 0,
    borderRadius: 30,
  },

  dropdownItem: {
    backgroundColor: 'rgba(51,51,51, 0.5)',
    marginVertical: 2,
    borderRadius: 5,
  },

  dropdownTextItem: {
    paddingVertical: 5,
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '600',
  },

  dropdownInputStyles: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },

  error: {
    color: COLORS.red,
    fontSize: 14,
    alignSelf: 'flex-start',
    paddingLeft: 10,
  },

  gradientRight: {
    top: 200,
    right: -300,
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 999, // Makes it a circle (blob shape)
    backgroundColor: COLORS.primary, // Background color for the blob
    shadowColor: COLORS.violet, // Shadow color
    shadowOffset: {width: 0, height: 10}, // The offset of the shadow
    shadowOpacity: 1, // The opacity of the shadow
    shadowRadius: 100, // How blurry the shadow is
    elevation: 15,
  },

  gradientLeft: {
    top: 500,
    right: 400,
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100, // Makes it a circle (blob shape)
    backgroundColor: COLORS.primary, // Background color for the blob
    shadowColor: COLORS.red, // Shadow color
    shadowOffset: {width: 0, height: 10}, // The offset of the shadow
    shadowOpacity: 1, // The opacity of the shadow
    shadowRadius: 100, // How blurry the shadow is
    elevation: 15,
  },
});
