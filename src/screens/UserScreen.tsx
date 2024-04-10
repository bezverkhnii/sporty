import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAuthContext} from '../navigation/AuthProvider';
import InfoNote from '../components/InfoNote';
import TextInputField from '../components/TextInputField';
import ParametersInput from '../components/ParametersInput';
import DatePickerField from '../components/DatePicker';
import {COLORS} from '../constants/colors';
import RadioButtonGroup from '../components/RadioButtonGroup';
import CustomButton from '../components/Button';
import moment from 'moment';
import {formatSecondsToDate} from '../utils/formatDate';
import InfoBlock from '../components/InfoBlock';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {getCaloriesInfo} from '../api/getCaloriesInfo';
import {activityLevels} from '../constants/activityLevels';

const UserScreen = () => {
  const minDate = moment().subtract(18, 'years').toDate();
  const insets = useSafeAreaInsets();
  //@ts-expect-error
  const {logout, user} = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [height, setHeight] = useState<number>();
  const [currentWeight, setCurrentWeight] = useState<number>();
  const [desiredWeight, setDesiredWeight] = useState<number>();
  const [date, setDate] = useState(minDate);
  const [activitylevel, setActivitylevel] = useState<string>('level_1');
  const [caloriesData, setCaloriesData] = useState<number>();
  const subscriptionRef = useRef(null);

  useEffect(() => {
    setLoading(true);

    // Subscribe to the Firestore document
    const docRef = firestore().collection('users').doc(auth().currentUser?.uid);

    // Listen for snapshot changes
    subscriptionRef.current = docRef.onSnapshot(async doc => {
      if (doc.exists) {
        const {
          firstName,
          lastName,
          height,
          currentWeight,
          desiredWeight,
          birthdayDate,
          activitylevel,
        } = doc.data();

        const testDate = formatSecondsToDate(
          birthdayDate ? birthdayDate.seconds : '',
        );

        const age = moment
          .duration(moment().diff(testDate))
          .humanize()
          .split(' ')[0];

        const caloriesData = await getCaloriesInfo({
          age: age,
          gender: 'male',
          height: `${height}`,
          weight: `${currentWeight}`,
          activitylevel: activitylevel,
        });

        setCaloriesData(caloriesData);
        setFirstName(firstName);
        setLastName(lastName);
        setHeight(height);
        setCurrentWeight(currentWeight);
        setDesiredWeight(desiredWeight);
        setDate(
          birthdayDate ? formatSecondsToDate(birthdayDate.seconds) : minDate,
        );
        setActivitylevel(activitylevel);
        setLoading(false);
      }
    });

    // Cleanup function
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current();
      }
    };
  }, []);

  const handleSetFullName = (text: string) => {
    const fullName = text.split(' ');
    setFirstName(fullName[0]);
    setLastName(fullName[1]);
  };

  const handlePress = () => {
    if (height && currentWeight && desiredWeight && date && activitylevel) {
      firestore().collection('users').doc(auth().currentUser?.uid).update({
        firstName,
        lastName,
        height,
        currentWeight,
        desiredWeight,
        birthdayDate: date,
        activitylevel,
      });
    } else {
      Alert.alert('Please provide all data!');
    }
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}>
            <Image source={{uri: user.photoURL}} style={styles.image} />
            <Text style={styles.userName}>
              {user.displayName || firstName
                ? `${firstName} ${lastName}`
                : 'No name'}
            </Text>
            <View style={styles.infoBlockContainer}>
              <InfoBlock
                title="Daily basal calories intake"
                measurement={caloriesData ? caloriesData.BMR : '?'}
                filled
              />
              <InfoBlock
                title="Maintain weight calories intake"
                measurement={
                  caloriesData ? caloriesData.goals['maintain weight'] : '?'
                }
                filled
              />
            </View>
            <InfoNote>
              We understand that each individual is unique, so the entire
              approach to diet is relative and tailored to your unique body and
              goals.
            </InfoNote>
            <Button title="Logout" onPress={logout} />
            <View style={styles.basicInfo}>
              <Text>Basic Info</Text>
              <TextInputField
                placeholder="Username"
                value={
                  user.displayName !== null
                    ? user.displayName
                    : firstName
                    ? `${firstName} ${lastName}`
                    : ''
                }
                onChangeText={handleSetFullName}
              />
              <TextInputField
                placeholder="Email address"
                value={user.email}
                editable={false}
              />
            </View>
            <View style={styles.parametersContainer}>
              <ParametersInput
                placeholder="Height"
                value={height}
                onChangeText={(e: number) => setHeight(e)}
              />
              <ParametersInput
                placeholder="Current weight"
                value={currentWeight}
                onChangeText={(e: number) => setCurrentWeight(e)}
              />
              <ParametersInput
                placeholder="Desired weight"
                value={desiredWeight}
                onChangeText={(e: number) => setDesiredWeight(e)}
              />
              <DatePickerField date={date} setDate={setDate} />
            </View>
            <View>
              <RadioButtonGroup
                selected={activitylevel}
                setSelected={setActivitylevel}
                data={activityLevels}
              />
            </View>
          </ScrollView>
          <CustomButton filled title="Save" onPress={handlePress} />
        </>
      )}
    </View>
  );
};

export default UserScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: -20,
    backgroundColor: COLORS.primary,
  },

  infoBlockContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    gap: 10,
  },

  scrollView: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 100,
  },

  userName: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: '400',
  },

  basicInfo: {
    width: '100%',
    gap: 13,
  },
  parametersContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  parametersBlock: {},
});
