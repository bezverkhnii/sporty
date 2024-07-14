import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IMessage} from '../types';
import {COLORS} from '../constants/colors';
import {useAuthContext} from '../navigation/AuthProvider';

const ChatChip = ({message}: {message: IMessage}) => {
  const {user} = useAuthContext();
  console.log(user);

  return (
    <View
      style={[
        styles.container,
        {flexDirection: message.id % 2 === 0 ? 'row-reverse' : 'row'},
      ]}>
      <View style={styles.profilePic}>
        <Image
          source={{
            uri:
              message.user === 'SportyAI'
                ? 'https://f4.bcbits.com/img/0009644394_23.jpg'
                : user.photoURL,
          }}
          width={30}
          height={30}
        />
      </View>
      <View
        style={{alignItems: message.id % 2 === 0 ? 'flex-end' : 'flex-start'}}>
        <Text style={styles.userName}>
          {message.user === 'SportyAI' ? message.user : user.displayName}
        </Text>
        <Text style={styles.message}>{message.message}</Text>
      </View>
    </View>
  );
};

export default ChatChip;

const styles = StyleSheet.create({
  container: {
    gap: 5,
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: COLORS.transparent,
    borderRadius: 10,
    padding: 10,
  },

  profilePic: {
    borderRadius: 100,
    overflow: 'hidden',
  },

  userName: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '600',
  },

  message: {
    maxWidth: '90%',
    fontWeight: '500',
    color: COLORS.white,
  },
});
