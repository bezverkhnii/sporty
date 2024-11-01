import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {COLORS} from '../constants/colors';
import OpacityPressable from './OpacityPressable';
import {useAuthContext} from '../navigation/AuthProvider';

const NotificationItem = ({item}: {item: any}) => {
  //@ts-expect-error
  const {user} = useAuthContext();

  const [friendRequest, setFriendRequest] = useState<any>('');
  useEffect(() => {
    const getUserById = async () => {
      const user = await firestore().collection('users').doc(item.id).get();

      setFriendRequest(user.data());
    };

    getUserById();
  }, []);

  const handleAcceptFriendRequest = async () => {
    try {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('friends')
        .doc(item.id)
        .update({
          status: 'accepted',
        });

      await firestore()
        .collection('users')
        .doc(item.id)
        .collection('friends')
        .doc(user.uid)
        .update({
          status: 'accepted',
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectFriendRequest = async () => {
    try {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('friends')
        .doc(item.id)
        .update({
          status: 'rejected',
        });

      await firestore()
        .collection('users')
        .doc(item.id)
        .collection('friends')
        .doc(user.id)
        .update({
          status: 'rejected',
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.username}>{friendRequest.username}</Text>
      <View style={styles.controls}>
        <OpacityPressable onPress={handleAcceptFriendRequest}>
          <FontAwesomeIcon
            icon="circle-check"
            color={COLORS.checkMark}
            size={30}
          />
        </OpacityPressable>
        <OpacityPressable onPress={handleRejectFriendRequest}>
          <FontAwesomeIcon icon="circle-xmark" color={COLORS.red} size={30} />
        </OpacityPressable>
      </View>
    </View>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(51,51,51,0.8)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 10,
    borderRadius: 10,
  },

  username: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '700',
  },

  controls: {
    gap: 5,
  },
});
