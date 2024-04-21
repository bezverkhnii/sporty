export const updateCaloriesBasedOnNutrition = (proteins, fat, calories) => {
  console.log(proteins, fat, calories);
  const p = 4 * Number(proteins);
  const f = 9 * Number(fat);
  const c = 4 * Number(calories);
  return p + f + c;
};
