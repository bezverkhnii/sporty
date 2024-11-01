import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';
import firestore from '@react-native-firebase/firestore';
import {useAuthContext} from '../navigation/AuthProvider';
import {formatSecondsToDate} from '../utils/formatDate';
import moment from 'moment';
import {height} from '@fortawesome/free-solid-svg-icons/fa0';
import {calculatePhysicalActivityBarHeight} from '../utils/caculatePhysicalActivityBarHeight';
import {IMeal} from '../types';

const PhysicalActivity = () => {
  //@ts-expect-error
  const {user} = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [totalActivity, setTotalActivity] = useState(0);
  const [totalCalories, setTotalCalories] = useState<any>([]);

  useEffect(() => {
    setLoading(true);
    const getActivities = async () => {
      try {
        const allActivitiesSnapshot = await firestore()
          .collection('users')
          .doc(user.uid)
          .collection('activities')
          .get();

        const allProductsSnapshot = await firestore()
          .collection('users')
          .doc(user.uid)
          .collection('products')
          .get();

        const allActivities = allActivitiesSnapshot.docs.map(d => ({
          id: d.id,
          data: d.data(),
        }));

        const allCalories = allProductsSnapshot.docs.map(d => {
          if (d.data().food) {
            return d.data().food.map((meal: IMeal) => meal.calories);
          }
        });

        setTotalCalories(allCalories);
        const dbActivities = allActivities;

        if (!dbActivities) {
          setActivities([]);
        } else {
          const unsubscribe = firestore()
            .collection('users')
            .doc(user.uid)
            .collection('activities')
            .onSnapshot(snapshot => {
              const allActivities = snapshot.docs.map(d => ({
                id: d.id,
                data: d.data(),
              }));
              //@ts-expect-error
              setActivities(allActivities);
              setTotalActivity(allActivities.length);
            });
          return () => unsubscribe();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getActivities();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Physical Activity</Text>
      <Text style={styles.subheader}>Total for the month</Text>
      <View style={styles.statsContainer}>
        <View style={{gap: 5}}>
          <View style={styles.activityBars}>
            {activities.map(a => (
              <View
                key={a.id}
                style={[
                  styles.activityMeasure,
                  {
                    height: calculatePhysicalActivityBarHeight(
                      a.data.activities,
                    ),
                  },
                ]}></View>
            ))}
          </View>
          <Text style={styles.subheader}>Activity amount</Text>
          <Text style={styles.measurement}>{totalActivity}</Text>
        </View>
        <View
          style={{
            height: '100%',
            width: 1,
            backgroundColor: 'rgba(255,255,255,0.4)',
          }}></View>
        <View style={{gap: 5}}>
          <View style={styles.activityBars}>
            {totalCalories.map((d: number[], idx: number) => (
              <View
                key={idx}
                style={[
                  styles.activityMeasure,
                  {height: calculatePhysicalActivityBarHeight(d)},
                ]}></View>
            ))}
          </View>
          <Text style={styles.subheader}>Consumed calories</Text>
          <Text style={styles.measurement}>
            {totalCalories
              .flat()
              .reduce((acc, curr) => Number(acc) + Number(curr), 0)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PhysicalActivity;

const styles = StyleSheet.create({
  container: {
    height: 180,
    width: '100%',
    backgroundColor: COLORS.violet,
    borderRadius: 30,
    padding: 20,
  },

  header: {
    color: COLORS.white,
    fontSize: 20,
  },

  subheader: {
    color: COLORS.white,
    fontWeight: '300',
  },

  activityMeasure: {
    backgroundColor: COLORS.white,
    height: 5,
    width: 2,
    borderRadius: 10,
  },

  activityBars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    maxHeight: 42,
    overflow: 'hidden',
  },

  measurement: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },

  statsContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 15,
    paddingHorizontal: 10,
  },
});
