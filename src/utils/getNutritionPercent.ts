export const getNutritionPercent = (nutrition, allNutritionsAmount) => {
  console.log(nutrition, allNutritionsAmount);
  const a = nutrition * 100;
  return Math.round(a / allNutritionsAmount);
};
