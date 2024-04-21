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

  const handleDone = () => {
    if (!date || !gender || !height || !currentWeight || !desiredWeight) {
      Alert.alert(
        'Fill in blank fields',
        "Looks like you didn't provide needed data :(",
      );
    } else {
      firestore().collection('users').doc(auth().currentUser?.uid).update({
        height,
        currentWeight,
        gender,
        desiredWeight,
        birthdayDate: date,
        activitylevel,
      });
      navigation.navigate('User');
    }
  };

  return (
    <Onboarding
      showSkip={false}
      onDone={handleDone}
      pages={[
        {
          backgroundColor: '#326445',
          image: (
            <Image
              source={require('../assets/handshake.png')}
              style={styles.image}
            />
          ),
          title: 'Hello!',
          titleStyles: {fontWeight: 'bold'},
          subtitle:
            'Welcome to "sporty", your helper to achieve your healthy goals!',
        },
        {
          backgroundColor: '#863232',
          image: (
            <Image
              source={require('../assets/question.png')}
              style={styles.image}
            />
          ),
          title: 'Parameters',
          titleStyles: {
            fontWeight: 'bold',
          },
          subtitle:
            'Now, to create personalised experience, I would like to get to know you a lil better :)',
        },
        {
          backgroundColor: '#ffcddf',
          image: (
            <Image
              source={require('../assets/birthday-cake.png')}
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
          backgroundColor: '#ebcdff',
          image: (
            <Image
              source={require('../assets/gender.png')}
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
              setSelected={setGender}
            />
          ),
        },
        {
          backgroundColor: '#1066bb',
          image: (
            <Image
              source={require('../assets/height.png')}
              style={styles.image}
            />
          ),
          title: 'Whats your height? :)',
          titleStyles: {
            fontWeight: 'bold',
          },
          subtitle: (
            <TextInputField
              value={height}
              placeholder="Your height"
              onChangeText={e => setHeight(e)}
            />
          ),
          subTitleStyles: {},
        },
        {
          backgroundColor: '#6f889a',
          image: (
            <Image
              source={require('../assets/weight-scale.png')}
              style={styles.image}
            />
          ),
          title: 'Whats your current weight? :)',
          titleStyles: {
            fontWeight: 'bold',
          },
          subtitle: (
            <TextInputField
              value={currentWeight}
              placeholder="Your weight"
              onChangeText={e => setCurrentWeight(e)}
            />
          ),
        },
        {
          backgroundColor: '#cd763c',
          image: (
            <Image
              source={require('../assets/weight-loss.png')}
              style={styles.image}
            />
          ),
          title: 'And your desired weight? :)',
          titleStyles: {
            fontWeight: 'bold',
          },
          subtitle: (
            <TextInputField
              value={desiredWeight}
              placeholder="Your desired weight"
              onChangeText={e => setDesiredWeight(e)}
            />
          ),
        },
        {
          backgroundColor: '#bae0ba',
          image: (
            <Image
              source={require('../assets/training.png')}
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
          backgroundColor: '#ffffff',
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
