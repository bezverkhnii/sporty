import React from 'react';
import {Button, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuthContext} from '../navigation/AuthProvider';

const HomeScreen = () => {
  const {logout, user} = useAuthContext();

  console.log(user);

  return (
    <SafeAreaView>
      <Text>{user.displayName}</Text>
      <Button title="Logout" onPress={logout} />
    </SafeAreaView>
  );
};

export default HomeScreen;
