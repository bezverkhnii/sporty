import React, {useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InfoBlock from '../components/InfoBlock';
import {COLORS} from '../constants/colors';
import UserBar from '../components/UserBar';
import InfoNote from '../components/InfoNote';
import ProductsBlock from '../components/ProductsBlock';
import {useCaloriesContext} from '../navigation/CaloriesProvider';

const DiaryScreen = () => {
  //@ts-expect-error
  const {caloriesData, consumedCalories} = useCaloriesContext();

  return (
    <SafeAreaView style={styles.container}>
      <UserBar />
      <ScrollView>
        <View style={styles.blockGrid}>
          <InfoBlock
            title={'Daily calorie intake'}
            measurement={caloriesData.BMR}
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
});
