export const calculatePhysicalActivityBarHeight = (prop: any[]) => {
  let height = 0;

  prop.forEach(item => {
    height += 1;
  });

  return height * 12;
};

export const calculateConsumedCaloriesBarHeight = (prop: number[]) => {
  let height = 0;

  prop.forEach(n => {
    height += n / 100;
  });

  return height;
};
