import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useAuthContext} from '../navigation/AuthProvider';
import {COLORS} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';
import OpacityPressable from './OpacityPressable';

const UserBar = () => {
  //@ts-expect-error
  const {user} = useAuthContext();
  const navigation = useNavigation();
  return (
    <View style={{width: '100%', paddingBottom: 10}}>
      <View style={styles.container}>
        <Text style={styles.appTitle}>sporty</Text>
        <OpacityPressable onPress={() => navigation.navigate('User')}>
          <Image source={{uri: user.photoURL}} style={styles.image} />
        </OpacityPressable>
      </View>
    </View>
  );
};

export default UserBar;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  appTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    color: COLORS.white,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
