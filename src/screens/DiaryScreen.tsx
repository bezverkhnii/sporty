import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InfoBlock from '../components/InfoBlock';
import {COLORS} from '../constants/colors';
import UserBar from '../components/UserBar';
import InfoNote from '../components/InfoNote';
import ProductsBlock from '../components/ProductsBlock';
import {useCaloriesContext} from '../navigation/CaloriesProvider';
import NutritionChart from '../components/NutritionChart';
import LottieView from 'lottie-react-native';
import PhysicalActivity from '../components/PhysicalActivity';

const DiaryScreen = () => {
  //@ts-expect-error
  const {caloriesData, consumedCalories} = useCaloriesContext();
  const [goalMet, setGoalMet] = useState<boolean>(false);
  const [dailyCalorieIntake, setDailyCalorieIntake] = useState(0);

  const tdee_mulitiplier = {
    Inactive: 1,
    'Low Active': 1.2,
    Active: 1.55,
    'Very Active': 1.725,
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setDailyCalorieIntake(
      Number(
        caloriesData['BMI_EER']['Estimated Daily Caloric Needs']
          .split(' ')[0]
          .split(',')
          .join(''),
        //@ts-expect-error
      ) * tdee_mulitiplier[caloriesData.activitylevel],
    );

    if (consumedCalories >= dailyCalorieIntake) {
      setGoalMet(true);
      console.log('goal met!');
    } else {
      setGoalMet(false);
      console.log('nothing met');
    }
  });
  return (
    <SafeAreaView style={styles.container}>
      {goalMet && (
        <LottieView
          style={styles.animation}
          source={require('../assets/animations/Confetti.json')}
          autoPlay
          loop={false}
        />
      )}

      <View style={styles.gradientRight}></View>
      <View style={styles.gradientLeft}></View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{gap: 20}}>
        <Text style={styles.heading}>Statistics</Text>
        <View style={styles.blockGrid}>
          <InfoBlock
            title={'Daily calorie intake'}
            measurement={Math.round(dailyCalorieIntake) + ' kcal/day'}
            filled={true}
          />
          <InfoBlock
            title={'Calories consumed'}
            measurement={consumedCalories}
          />
        </View>
        <PhysicalActivity />
        <ProductsBlock />
        <NutritionChart />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DiaryScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    alignItems: 'center',
  },

  heading: {
    fontSize: 32,
    fontWeight: '300',
    color: COLORS.white,
    alignSelf: 'center',
  },

  blockGrid: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  animation: {
    position: 'absolute',
    height: '140%',
    width: '140%',
  },

  gradientRight: {
    bottom: 270,
    right: -200,
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100, // Makes it a circle (blob shape)
    backgroundColor: COLORS.primary, // Background color for the blob
    shadowColor: 'red', // Shadow color
    shadowOffset: {width: 0, height: 10}, // The offset of the shadow
    shadowOpacity: 1, // The opacity of the shadow
    shadowRadius: 100, // How blurry the shadow is
    elevation: 15,
  },

  gradientLeft: {
    bottom: 100,
    left: -200,
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100, // Makes it a circle (blob shape)
    backgroundColor: COLORS.primary, // Background color for the blob
    shadowColor: 'green', // Shadow color
    shadowOffset: {width: 0, height: 10}, // The offset of the shadow
    shadowOpacity: 1, // The opacity of the shadow
    shadowRadius: 100, // How blurry the shadow is
    elevation: 15,
  },
});
