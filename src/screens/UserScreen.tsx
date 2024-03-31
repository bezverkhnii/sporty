import React from 'react';
import {Button, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuthContext} from '../navigation/AuthProvider';
import InfoNote from '../components/InfoNote';
import TextInputField from '../components/TextInputField';
import DatePicker from 'react-native-date-picker';
import ParametersInput from '../components/ParametersInput';
import DatePickerField from '../components/DatePicker';
import {COLORS} from '../constants/colors';

const UserScreen = () => {
  //@ts-expect-error
  const {logout, user} = useAuthContext();

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{uri: user.photoURL}} style={styles.image} />
      <Text style={styles.userName}>{user.displayName}</Text>
      <InfoNote>
        We understand that each individual is unique, so the entire approach to
        diet is relative and tailored to your unique body and goals.
      </InfoNote>
      <Button title="Logout" onPress={logout} />
      <View style={styles.basicInfo}>
        <Text>Basic Info</Text>
        <TextInputField placeholder="Username" value={user.displayName} />
        <TextInputField
          placeholder="Email address"
          value={user.email}
          editable={false}
        />
      </View>
      <View style={styles.parametersContainer}>
        <ParametersInput placeholder="Height" value="1" />
        <ParametersInput placeholder="Current weight" value="1" />
        <ParametersInput placeholder="Desired weight" value="0" />
        <DatePickerField />
      </View>
    </SafeAreaView>
  );
};

export default UserScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
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
