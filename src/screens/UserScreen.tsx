import React, {useState} from 'react';
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
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

const UserScreen = () => {
  const minDate = moment().subtract(18, 'years').toDate();

  //@ts-expect-error
  const {logout, user} = useAuthContext();
  const [height, setHeight] = useState();
  const [currentWeight, setCurrentWeight] = useState();
  const [desiredWeight, setDesiredWeight] = useState();
  const [date, setDate] = useState(minDate);
  const [activityLevel, setActivityLevel] = useState('level_1');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image source={{uri: user.photoURL}} style={styles.image} />
        <Text style={styles.userName}>{user.displayName}</Text>
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
            onChangeText={e => setHeight(e)}
          />
          <ParametersInput
            placeholder="Current weight"
            value={currentWeight}
            onChangeText={e => setCurrentWeight(e)}
          />
          <ParametersInput
            placeholder="Desired weight"
            value={desiredWeight}
            onChangeText={e => setDesiredWeight(e)}
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
      <CustomButton
        filled
        title="Save"
        onPress={() =>
          console.log({
            height,
            currentWeight,
            desiredWeight,
            date: formatDate(date),
            activityLevel,
          })
        }
      />
    </SafeAreaView>
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
