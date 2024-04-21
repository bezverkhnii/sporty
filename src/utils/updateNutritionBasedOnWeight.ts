export const updateNutritionBasedOnWeight = (weight, nutrition) => {
  const result = Number(nutrition) / 100;
  return Math.floor(result * Number(weight));
};
