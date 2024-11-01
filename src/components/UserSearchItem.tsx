import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';
import {IUser} from '../types';
import OpacityPressable from './OpacityPressable';

const UserSearchItem = ({
  user,
  type,
  onPress,
}: {
  user: IUser;
  type: string;
  onPress: () => void;
}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', gap: 10}}>
        <View>
          {user.userImg ? (
            <Image source={{uri: user.userImg}} />
          ) : (
            <FontAwesomeIcon
              icon="circle-user"
              color={COLORS.white}
              size={40}
            />
          )}
        </View>
        <View style={styles.details}>
          <Text style={styles.name}>{user.username}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>
      {type === 'search' && (
        <OpacityPressable onPress={onPress}>
          <FontAwesomeIcon icon="plus" color={COLORS.white} size={20} />
        </OpacityPressable>
      )}
    </View>
  );
};

export default UserSearchItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255, 0.2)',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    gap: 10,
    marginVertical: 3,
  },

  details: {},

  name: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },

  email: {
    color: COLORS.white,
    fontSize: 12,
  },
});
