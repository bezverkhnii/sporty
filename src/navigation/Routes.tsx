import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {useAuthContext} from './AuthProvider';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
// import AppStack from './AppStack';

const Routes = () => {
  //@ts-expect-error
  const {user, setUser} = useAuthContext();
  const [initializing, setInitializing] = useState(true);

  //@ts-expect-error
  const onAuthStateChanged = user => {
    setUser(user);
    console.log(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
