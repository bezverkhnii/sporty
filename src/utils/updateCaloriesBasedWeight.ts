export const updateCaloriesBasedWeight = (calories, weight) => {
  // console.log(proteins, fat, carbs);
  // const p = 4 * Number(proteins);
  // const f = 9 * Number(fat);
  // const c = 4 * Number(carbs);
  // return p + f + c;
  //in case of perfect formula -> soon
  const caloriesRatio = calories / 100;
  return Math.floor(caloriesRatio * weight);
};
