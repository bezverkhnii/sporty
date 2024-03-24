import React, {createContext, useContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Alert} from 'react-native';

const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  GoogleSignin.configure({
    webClientId:
      '1023232230089-simi48vfd10909cialu0dqlpu1e8vn85.apps.googleusercontent.com',
  });

  const signInWithCredentials = async (email: string, password: string) => {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log('User created!');
      console.log(response.user);
    } catch (error) {
      Alert.alert('Error creating user.', error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  // register: async (email, password) => {
  //   try {
  //     await auth().createUserWithEmailAndPassword(email, password)
  //     .then(() => {
  //       //Once the user creation has happened successfully, we can add the currentUser into firestore
  //       //with the appropriate details.
  //       firestore().collection('users').doc(auth().currentUser.uid)
  //       .set({
  //           fname: '',
  //           lname: '',
  //           email: email,
  //           createdAt: firestore.Timestamp.fromDate(new Date()),
  //           userImg: null,
  //       })
  //       //ensure we catch any errors at this stage to advise us if something does go wrong
  //       .catch(error => {
  //           console.log('Something went wrong with added user to firestore: ', error);
  //       })
  //     })
  //     //we need to catch the whole sign up process if it fails too.
  //     .catch(error => {
  //         console.log('Something went wrong with sign up: ', error);
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // },
  const logout = async () => {
    try {
      await auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };

  const contextValues = {
    user,
    setUser,
    signInWithCredentials,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
