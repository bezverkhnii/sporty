import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, Image, StyleSheet} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import DatePickerField from '../components/DatePicker';
import RadioButtonGroup from '../components/RadioButtonGroup';
import {GENDERS} from '../constants/genders';
import TextInputField from '../components/TextInputField';
import {activityLevels} from '../constants/activityLevels';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [gender, setGender] = useState(null);
  const [height, setHeight] = useState<number>();
  const [currentWeight, setCurrentWeight] = useState<number>();
  const [desiredWeight, setDesiredWeight] = useState<number>();
  const [activitylevel, setActivitylevel] = useState<string>('level_1');

  const handleDone = async () => {
    if (!date || !gender || !height || !currentWeight || !desiredWeight) {
      Alert.alert(
        'Fill in blank fields',
        "Looks like you didn't provide needed data :(",
      );
    } else {
      console.log(auth().currentUser?.uid);

      const res = await firestore()
        .collection('users')
        .doc(auth().currentUser?.uid)
        .set({
          height,
          currentWeight,
          gender,
          desiredWeight,
          birthdayDate: date,
          activitylevel,
        });

      console.log(res);

      //@ts-expect-error
      navigation.navigate('User');
    }
  };

  return (
    <Onboarding
      showSkip={false}
      onDone={handleDone}
      pages={[
        {
          backgroundColor: '#202020',
          image: (
            <Image
              source={require('../assets/welcome.png')}
              style={styles.image}
            />
          ),
          title: 'Hello!',
          titleStyles: {fontWeight: 'bold'},
          subtitle:
            'Welcome to "sporty", your helper to achieve your healthy goals!',
        },
        {
          backgroundColor: '#202020',
          image: (
            <Image
              source={require('../assets/zoom-in.png')}
              style={styles.image}
            />
          ),
          title: 'Detailed look',
          titleStyles: {
            fontWeight: 'bold',
          },
          subtitle:
            "Let's take a better look on your current state!",
        },
        {
          backgroundColor: '#202020',
          image: (
            <Image
              source={require('../assets/confetti.png')}
              style={styles.image}
            />
          ),
          title: 'Whats your b-day date? :)',
          titleStyles: {
            fontWeight: 'bold',
          },
          subtitle: <DatePickerField date={date} setDate={setDate} />,
        },
        {
          backgroundColor: '#202020',
          image: (
            <Image
              source={require('../assets/person.png')}
              style={styles.image}
            />
          ),
          title: 'Whats your gender? :D',
          titleStyles: {
            fontWeight: 'bold',
          },
          subtitle: (
            <RadioButtonGroup
              data={GENDERS}
              selected={gender}
              //@ts-expect-error
              setSelected={setGender}
            />
          ),
        },
        {
          backgroundColor: '#202020',
          image: (
            <Image
              source={require('../assets/height.png')}
              style={styles.image}
            />
          ),
          title: 'Whats your height?',
          titleStyles: {
            fontWeight: 'bold',
          },
          subtitle: (
            <TextInputField
              value={height}
              placeholder="Your height"
              onChangeText={(val: number) => setHeight(val)}
            />
          ),
          subTitleStyles: {},
        },
        {
          backgroundColor: '#202020',
          image: (
            <Image
              source={require('../assets/speedometer.png')}
              style={styles.image}
            />
          ),
          title: 'Whats your current weight?',
          titleStyles: {
            fontWeight: 'bold',
          },
          subtitle: (
            <TextInputField
              value={currentWeight}
              placeholder="Your weight"
              onChangeText={(val: number) => setCurrentWeight(val)}
            />
          ),
        },
        {
          backgroundColor: '#202020',
          image: (
            <Image
              source={require('../assets/female-body.png')}
              style={styles.image}
            />
          ),
          title: 'And your desired weight?',
          titleStyles: {
            fontWeight: 'bold',
          },
          subtitle: (
            <TextInputField
              value={desiredWeight}
              placeholder="Your desired weight"
              onChangeText={(val: number) => setDesiredWeight(val)}
            />
          ),
        },
        {
          backgroundColor: '#202020',
          image: (
            <Image
              source={require('../assets/dumbell.png')}
              style={styles.image}
            />
          ),
          title: 'Whats your average activity level?',
          titleStyles: {
            fontWeight: 'bold',
          },
          subtitle: (
            <RadioButtonGroup
              data={activityLevels}
              selected={activitylevel}
              setSelected={setActivitylevel}
            />
          ),
        },
        {
          backgroundColor: '#202020',
          image: (
            <Image
              source={require('../assets/done.png')}
              style={styles.image}
            />
          ),
          title: 'You are all set!',
          titleStyles: {
            fontWeight: 'bold',
          },
          subtitle:
            'Thanks for your time, now you have access to all features of the application!',
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});
