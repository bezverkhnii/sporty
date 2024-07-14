import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export interface IProduct {
  id: string;
  data: FirebaseFirestoreTypes.DocumentData;
  // data: {
  //   title: string;
  //   calories: string;
  //   proteins: string;
  //   fat: string;
  //   carbs: string;
  // };
}

export interface IProductData {
  title: string;
  calories: string;
  proteins: string;
  fat: string;
  carbs: string;
}

export interface ISelectListData {
  key: string;
  value: string;
}

export interface ICaloriesData {
  BMR: number;
  goals: {
    'Exreme weight gain': {
      calory: number;
      'gain weight': string;
    };
    'Exreme weight loss': {
      calory: number;
      'gain weight': string;
    };
    'Mild weight gain': {
      calory: number;
      'gain weight': string;
    };
    'Mild weight loss': {
      calory: number;
      'gain weight': string;
    };
    'Weight gain': {
      calory: number;
      'gain weight': string;
    };
    'Weight loss': {
      calory: number;
      'gain weight': string;
    };
    'maintain weight': number;
  };
}

export interface IMessage {
  user: string;
  message: string;
  id: number;
}
