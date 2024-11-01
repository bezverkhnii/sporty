import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {useAuthContext} from '../navigation/AuthProvider';
import {COLORS} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';
import OpacityPressable from './OpacityPressable';
import firestore from '@react-native-firebase/firestore';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import NotificationsModal from './NotificationsModal';

const UserBar = () => {
  //@ts-expect-error
  const {logout, user} = useAuthContext();
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  const [friendNotifications, setFriendNotifications] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currUser, setCurrUser] = useState<any>({});

  useEffect(() => {
    setloading(true);
    const getCurrentUserData = async () => {
      try {
        const res = await firestore().collection('users').doc(user.uid).get();
        console.log(res.data(), 'userrrrr');

        setCurrUser(res.data());
      } catch (error) {
        console.log(error);
      }
    };
    const getFriendsNotifications = async () => {
      const friendsList = await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('friends')
        .get();

      const incomingRequests = friendsList.docs
        .map(friend => ({id: friend.id, status: friend.data().status}))
        .filter(r => r.status === 'incoming');

      console.log(incomingRequests);

      if (incomingRequests.length) {
        setFriendNotifications(incomingRequests);
      }
    };
    getFriendsNotifications();
    getCurrentUserData();
    setloading(false);
  }, []);

  return loading ? (
    <ActivityIndicator />
  ) : (
    <View style={{width: '100%', paddingBottom: 10}}>
      <NotificationsModal
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
        notifications={friendNotifications}
      />
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <OpacityPressable onPress={() => navigation.navigate('User')}>
            {user.photoURL ? (
              <Image source={{uri: user.photoURL}} style={styles.image} />
            ) : (
              <Image
                source={require('../assets/user.png')}
                style={styles.image}
              />
            )}
          </OpacityPressable>
          <View>
            <Text style={styles.thinText}>Hello</Text>
            <Text style={styles.name}>
              {currUser.username ? currUser.username.split(' ')[0] : ''}
            </Text>
          </View>
        </View>
        <OpacityPressable onPress={() => setModalVisible(true)}>
          <View style={styles.notifications}>
            {friendNotifications.length ? (
              <View style={styles.notificationBadge}></View>
            ) : (
              ''
            )}
            <FontAwesomeIcon icon={'bell'} size={20} color="white" />
          </View>
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
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  thinText: {
    fontWeight: '300',
    fontSize: 30,
    color: COLORS.white,
  },

  notifications: {
    padding: 9,
    backgroundColor: 'rgba(51,51,51, 0.9)',
    borderRadius: 50,
  },

  notificationBadge: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 10,
    height: 10,
    backgroundColor: COLORS.red,
    borderRadius: 50,
    zIndex: 10,
  },

  name: {
    fontWeight: 'bold',
    fontSize: 30,
    color: COLORS.white,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});
