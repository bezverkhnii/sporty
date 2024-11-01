import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../constants/colors';
import UserBar from '../components/UserBar';
import {useAuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import UserSearchItem from '../components/UserSearchItem';

const FriendsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [friends, setFriends] = useState<any[]>([]);
  //@ts-expect-error
  const {user} = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersSnapshot = await firestore().collection('users').get();

        const userList = usersSnapshot.docs
          .map(doc => ({
            id: doc.id,
            data: doc.data(),
          }))
          .filter(doc => doc.id !== user.uid);

        const friendsSnapshot = await firestore()
          .collection('users')
          .doc(user.uid)
          .collection('friends')
          .where('status', '==', 'accepted')
          .get();

        const friendsData = await Promise.all(
          friendsSnapshot.docs.map(async friendDoc => {
            const friendRef = await firestore()
              .collection('users')
              .doc(friendDoc.id)
              .get();
            return {id: friendDoc.id, ...friendRef.data()};
          }),
        );

        // Exclude friends from the user list
        const nonFriends = userList.filter(
          u => !friendsData.some(friend => friend.id === u.id),
        );

        setFriends(friendsData);
        setUsers(nonFriends);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const unsubscribeUsers = firestore()
      .collection('users')
      .onSnapshot(snapshot => {
        const updatedUsers = snapshot.docs
          .map(doc => ({
            id: doc.id,
            data: doc.data(),
          }))
          .filter(doc => doc.id !== user.uid);

        // Filter out friends from the user list
        const nonFriends = updatedUsers.filter(
          u => !friends.some(friend => friend.id === u.id),
        );

        setUsers(nonFriends);
      });

    const unsubscribeFriends = firestore()
      .collection('users')
      .doc(user.uid)
      .collection('friends')
      .where('status', '==', 'accepted')
      .onSnapshot(async snapshot => {
        const updatedFriends = await Promise.all(
          snapshot.docs.map(async friendDoc => {
            const friendRef = await firestore()
              .collection('users')
              .doc(friendDoc.id)
              .get();
            return {id: friendDoc.id, ...friendRef.data()};
          }),
        );

        // Filter out friends from the user list
        const nonFriends = users.filter(
          u => !updatedFriends.some(friend => friend.id === u.id),
        );

        setFriends(updatedFriends);
        setUsers(nonFriends);
      });

    return () => {
      unsubscribeUsers();
      unsubscribeFriends();
    };
  }, [user.uid]);

  const handleFindUserByName = (text: string) => {
    setSearchText(text);
    const filtered = users.filter(u =>
      u.data.username?.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredUsers(filtered);
  };

  const handleAddFriend = async (userId: string) => {
    try {
      const batch = firestore().batch();

      const userRef = firestore()
        .collection('users')
        .doc(user.uid)
        .collection('friends')
        .doc(userId);
      const friendRef = firestore()
        .collection('users')
        .doc(userId)
        .collection('friends')
        .doc(user.uid);

      batch.set(userRef, {id: userId, status: 'sent'});
      batch.set(friendRef, {id: user.uid, status: 'incoming'});

      await batch.commit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gradientTop}></View>
      <View style={styles.gradientRight}></View>
      <View style={styles.gradientLeft}></View>
      <UserBar />
      <Text style={styles.pageHeading}>Search for your friends!</Text>
      <TextInput
        onChangeText={handleFindUserByName}
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor="rgba(255,255,255, 0.2)"
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text style={styles.subHeading}>Your Friends</Text>
          {friends.map((friend, index) => (
            <UserSearchItem
              key={index}
              type=""
              user={friend}
              onPress={() => handleAddFriend(friend.id)}
            />
          ))}
          <Text style={styles.subHeading}>Search</Text>
          <FlatList
            style={styles.marginBottom}
            showsVerticalScrollIndicator={false}
            data={searchText ? filteredUsers : users}
            renderItem={({item}) => (
              <UserSearchItem
                type="search"
                user={item.data}
                onPress={() => handleAddFriend(item.id)}
              />
            )}
            keyExtractor={item => item.id}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default FriendsScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
  },
  pageHeading: {
    fontSize: 30,
    fontWeight: '600',
    color: COLORS.white,
    paddingTop: 20,
  },
  blockGrid: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },

  modalContainer: {
    width: '80%',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  form: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  input: {
    backgroundColor: 'rgba(51,51,51,0.5)',
    paddingHorizontal: 15,
    paddingVertical: 15,
    gap: 5,
    color: COLORS.white,
    borderRadius: 25,
    marginVertical: 10,
  },

  animation: {
    position: 'absolute',
    height: '140%',
    width: '140%',
  },

  modalHeader: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: '600',
    paddingVertical: 10,
  },

  subHeading: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '600',
  },

  marginBottom: {
    marginBottom: 50,
  },

  gradientTop: {
    top: -250,
    right: 130,
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100, // Makes it a circle (blob shape)
    backgroundColor: COLORS.primary, // Background color for the blob
    shadowColor: COLORS.green, // Shadow color
    shadowOffset: {width: 0, height: 10}, // The offset of the shadow
    shadowOpacity: 1, // The opacity of the shadow
    shadowRadius: 100, // How blurry the shadow is
    elevation: 15,
  },

  gradientRight: {
    top: 300,
    right: -300,
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 999, // Makes it a circle (blob shape)
    backgroundColor: COLORS.primary, // Background color for the blob
    shadowColor: COLORS.violet, // Shadow color
    shadowOffset: {width: 0, height: 10}, // The offset of the shadow
    shadowOpacity: 1, // The opacity of the shadow
    shadowRadius: 100, // How blurry the shadow is
    elevation: 15,
  },

  gradientLeft: {
    top: 400,
    right: 400,
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100, // Makes it a circle (blob shape)
    backgroundColor: COLORS.primary, // Background color for the blob
    shadowColor: 'green', // Shadow color
    shadowOffset: {width: 0, height: 10}, // The offset of the shadow
    shadowOpacity: 1, // The opacity of the shadow
    shadowRadius: 100, // How blurry the shadow is
    elevation: 15,
  },
});
