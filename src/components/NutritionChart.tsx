import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PieChart from 'react-native-pie-chart';
import {useCaloriesContext} from '../navigation/CaloriesProvider';
import {
  CARBS_COLOR,
  COLORS,
  FAT_COLOR,
  PROTEINS_COLOR,
} from '../constants/colors';
import {getNutritionPercent} from '../utils/getNutritionPercent';

const NutritionChart = () => {
  //@ts-expect-error
  const {consumedProteins, consumedFat, consumedCarbs} = useCaloriesContext();

  const overrallNutrition = [
    consumedProteins,
    consumedFat,
    consumedCarbs,
  ].reduce((acc, curr) => acc + curr, 0);

  const proteinsPercentage = getNutritionPercent(
    consumedProteins,
    overrallNutrition,
  );
  const fatPercentage = getNutritionPercent(consumedFat, overrallNutrition);
  const carbsPercentage = getNutritionPercent(consumedCarbs, overrallNutrition);

  return (
    <View style={styles.container}>
      <View style={styles.nutritionDescription}>
        <View style={styles.directionRow}>
          <View
            style={[{backgroundColor: PROTEINS_COLOR}, styles.colorMarker]}
          />
          <Text style={styles.text}>Protein: {proteinsPercentage}%</Text>
        </View>
        <View style={styles.directionRow}>
          <View style={[{backgroundColor: FAT_COLOR}, styles.colorMarker]} />
          <Text style={styles.text}>Fat: {fatPercentage}%</Text>
        </View>
        <View style={styles.directionRow}>
          <View style={[{backgroundColor: CARBS_COLOR}, styles.colorMarker]} />
          <Text style={styles.text}>Carbs: {carbsPercentage}%</Text>
        </View>
      </View>
      <PieChart
        widthAndHeight={150}
        series={[
          consumedProteins ? consumedProteins : 1,
          consumedFat ? consumedFat : 1,
          consumedCarbs ? consumedCarbs : 1,
        ]}
        sliceColor={[PROTEINS_COLOR, FAT_COLOR, CARBS_COLOR]}
        coverRadius={0.5}
      />
    </View>
  );
};

export default NutritionChart;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },

  nutritionDescription: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 20,
  },

  colorMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  directionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  text: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
