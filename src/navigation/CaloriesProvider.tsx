import {createContext, useContext, useState} from 'react';
import React from 'react';
import {ICaloriesData} from '../types';

const CaloriesContext = createContext(null);

export const useCaloriesContext = () => useContext(CaloriesContext);

const CaloriesProvider = ({children}) => {
  const [caloriesData, setCaloriesData] = useState<ICaloriesData>();
  const [consumedCalories, setConsumedCalories] = useState<number>(0);
  const [consumedProteins, setConsumedProteins] = useState<number>(0);
  const [consumedFat, setConsumedFat] = useState<number>(0);
  const [consumedCarbs, setConsumedCarbs] = useState<number>(0);
  //   const [BMR, setBMR] = useState<number>(0);
  //   const [extremeWeightGain, setExtremeWeightGain] = useState<number>(0);
  //   const [extremeWeightLoss, setExtremeWeightLoss] = useState<number>(0);
  //   const [mildWeightGain, setMildWeightGain] = useState<number>(0);
  //   const [mildWeightLoss, setMildWeightLoss] = useState<number>(0);
  //   const [weightGain, setWeightGain] = useState<number>(0);
  //   const [weightLoss, setWeightLoss] = useState<number>(0);
  //   const [maintainWeight, setMaintainWeight] = useState<number>(0);

  const contextValues = {
    // BMR,
    // setBMR,
    // extremeWeightGain,
    // setExtremeWeightGain,
    // extremeWeightLoss,
    // setExtremeWeightLoss,
    // mildWeightGain,
    // setMildWeightGain,
    // mildWeightLoss,
    // setMildWeightLoss,
    // weightGain,
    // setWeightGain,
    // weightLoss,
    // setWeightLoss,
    // maintainWeight,
    // setMaintainWeight,
    caloriesData,
    setCaloriesData,
    consumedCalories,
    setConsumedCalories,
    consumedProteins,
    setConsumedProteins,
    consumedFat,
    setConsumedFat,
    consumedCarbs,
    setConsumedCarbs,
  };

  return (
    //@ts-expect-error
    <CaloriesContext.Provider value={contextValues}>
      {children}
    </CaloriesContext.Provider>
  );
};

export default CaloriesProvider;
