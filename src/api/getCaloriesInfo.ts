import axios from 'axios';
import {Alert} from 'react-native';

const options = {
  method: 'GET',
  url: 'https://fitness-calculator.p.rapidapi.com/dailycalorie',

  headers: {
    'X-RapidAPI-Key': '53e9058eb6msh0d5eff2898c471ap1421b8jsnc2d08a6db159',
    'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
  },
};

export const getCaloriesInfo = async params => {
  try {
    console.log({options, ...params});
    const response = await axios.get(
      'https://fitness-calculator.p.rapidapi.com/dailycalorie',
      {
        headers: {
          'X-RapidAPI-Key':
            '53e9058eb6msh0d5eff2898c471ap1421b8jsnc2d08a6db159',
          'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
        },
        params,
      },
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error: any) {
    Alert.alert('Error retrieveing data', error.message);
  }
};
