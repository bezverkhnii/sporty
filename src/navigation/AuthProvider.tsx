import React, {createContext, useContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Alert} from 'react-native';
import {firebaseErrorToText} from '../utils/firebaseErrorToText';
import firestore from '@react-native-firebase/firestore';

const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
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
    } catch (error: any) {
      const errorMessage = firebaseErrorToText(error);
      Alert.alert('Error creating user.', errorMessage);
    }
  };

  const loginWithCredentials = async (email: string, password: string) => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      console.log('Successful login');
      console.log(response.user);
    } catch (error: any) {
      const errorMessage = firebaseErrorToText(error);
      Alert.alert('Error while loggin in.', errorMessage);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Sign-in cancelled.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Sign-in already in progress.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play Services are not available at the moment.');
      } else {
        Alert.alert('Ooops... Something went wrong');
        console.log(error.code);
      }
    }
  };
  const register = async (email: string, password: string) => {
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          //Once the user creation has happened successfully, we can add the currentUser into firestore
          //with the appropriate details.
          firestore()
            .collection('users')
            .doc(auth().currentUser?.uid)
            .set({
              firstName: '',
              lastName: '',
              email: email,
              createdAt: firestore.Timestamp.fromDate(new Date()),
              userImg: null,
              height: null,
              gender: null,
              currentWeight: null,
              desiredWeight: null,
              birthdayDate: null,
              activityLevel: null,
            })
            //ensure we catch any errors at this stage to advise us if something does go wrong
            .catch(error => {
              console.log(
                'Something went wrong with added user to firestore: ',
                error,
              );
            });
        })
        //we need to catch the whole sign up process if it fails too.
        .catch(error => {
          console.log('Something went wrong with sign up: ', error);
        });
    } catch (e) {
      console.log(e);
    }
  };
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
    loginWithCredentials,
    signInWithGoogle,
    logout,
    register,
  };

  return (
    //@ts-expect-error
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
