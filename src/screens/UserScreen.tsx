import React, {useEffect, useState} from 'react';
import {Button, Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAuthContext} from '../navigation/AuthProvider';
import InfoNote from '../components/InfoNote';
import TextInputField from '../components/TextInputField';
import ParametersInput from '../components/ParametersInput';
import DatePickerField from '../components/DatePicker';
import {COLORS} from '../constants/colors';
import ActivityRadioButtonGroup from '../components/ActivityRadioButtonGroup';
import CustomButton from '../components/Button';
import moment from 'moment';
import {formatDate} from '../utils/formatDate';
import InfoBlock from '../components/InfoBlock';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const UserScreen = () => {
  const minDate = moment().subtract(18, 'years').toDate();
  const insets = useSafeAreaInsets();
  //@ts-expect-error
  const {logout, user} = useAuthContext();
  const [height, setHeight] = useState<number>();
  const [currentWeight, setCurrentWeight] = useState<number>();
  const [desiredWeight, setDesiredWeight] = useState<number>();
  const [date, setDate] = useState(minDate);
  const [activityLevel, setActivityLevel] = useState<string>('level_1');

  // useEffect(() => {
  //   const getData = async () => {
  //     const usersCollection = await firestore()
  //       .collection('users')
  //       .doc('UKkiYQEqQ2ZmHJ8SrGO7')
  //       .get();
  //     console.log(usersCollection);
  //   };
  //   getData();
  // }, []);
  console.log(auth().currentUser);
  const handlePress = () => {
    console.log({
      height,
      currentWeight,
      desiredWeight,
      date: formatDate(date),
      activityLevel,
    });
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Image source={{uri: user.photoURL}} style={styles.image} />
        <Text style={styles.userName}>{user.displayName}</Text>
        <View style={styles.infoBlockContainer}>
          <InfoBlock title="Daily calories intake" measurement="?" filled />
          <InfoBlock title="Daily norm of sports" measurement="?" filled />
        </View>
        <InfoNote>
          We understand that each individual is unique, so the entire approach
          to diet is relative and tailored to your unique body and goals.
        </InfoNote>
        <Button title="Logout" onPress={logout} />
        <View style={styles.basicInfo}>
          <Text>Basic Info</Text>
          <TextInputField
            placeholder="Username"
            value={user.displayName}
            editable={false}
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
          <ActivityRadioButtonGroup
            activityLevel={activityLevel}
            setActivityLevel={setActivityLevel}
          />
        </View>
      </ScrollView>
      <CustomButton filled title="Save" onPress={handlePress} />
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
