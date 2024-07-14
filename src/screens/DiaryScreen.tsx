import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InfoBlock from '../components/InfoBlock';
import {COLORS} from '../constants/colors';
import UserBar from '../components/UserBar';
import InfoNote from '../components/InfoNote';
import ProductsBlock from '../components/ProductsBlock';
import {useCaloriesContext} from '../navigation/CaloriesProvider';
import NutritionChart from '../components/NutritionChart';
import LottieView from 'lottie-react-native';

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

      <UserBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.blockGrid}>
          <InfoBlock
            title={'Daily calorie intake'}
            measurement={Math.round(dailyCalorieIntake) + ' kcal/day'}
            filled={true}
          />
          {/* Think about realization */}
          {/* <InfoBlock
            title={'Daily norm of sports'}
            measurement={2200}
            filled={true}
          /> */}
          <InfoBlock
            title={'Calories consumed'}
            measurement={consumedCalories}
          />
          {/* <InfoBlock title={'Calories burned'} measurement={200} /> */}
        </View>
        <InfoNote>
          Record all your meals in a calorie diary every day. This will help me
          be aware of my nutrition and make me responsible for my choices.
        </InfoNote>
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
});
