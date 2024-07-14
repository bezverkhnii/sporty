import axios from 'axios';

export const getNutrition = async (
  sex: string,
  age: string,
  height: string | number,
  weight: string | number,
  activity_level: string,
) => {
  try {
    const response = await axios.get(
      'https://nutrition-calculator.p.rapidapi.com/api/nutrition-info',
      {
        params: {
          measurement_units: 'met',
          sex: sex,
          age_value: age,
          age_type: 'yrs',
          cm: `${height}`,
          kilos: `${weight}`,
          activity_level: activity_level,
        },
        headers: {
          'x-rapidapi-key':
            '53e9058eb6msh0d5eff2898c471ap1421b8jsnc2d08a6db159',
          'x-rapidapi-host': 'nutrition-calculator.p.rapidapi.com',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
