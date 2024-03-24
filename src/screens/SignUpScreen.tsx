/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../components/Button.tsx';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useState} from 'react';
import {useAuthContext} from '../navigation/AuthProvider.tsx';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  GoogleSignin.configure({
    webClientId:
      '1023232230089-simi48vfd10909cialu0dqlpu1e8vn85.apps.googleusercontent.com',
  });

  const {signInWithGoogle, signInWithCredentials} = useAuthContext();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerView}>
        <Text style={styles.header}>Create Account</Text>
        <Text style={styles.text}>Start sculpting your body today!</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>1. Enter your email</Text>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Email address"
              placeholderTextColor="#353535"
              value={email}
              autoCapitalize="none"
              onChangeText={e => setEmail(e)}
              keyboardType="email-address"
              style={{width: '100%'}}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>2. Create Password</Text>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Password"
              value={password}
              secureTextEntry
              onChangeText={p => setPassword(p)}
              placeholderTextColor="#353535"
              style={{width: '100%'}}
            />
          </View>
        </View>
        <Button title="Sign up" filled onPress={signInWithCredentials} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <View style={styles.dividor} />
          <Text style={{color: 'gray'}}>Or sign up with</Text>
          <View style={styles.dividor} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={signInWithGoogle}
            style={styles.signInMethodContainer}>
            <Image
              source={require('../assets/google.png')}
              style={{height: 36, width: 36, marginRight: 8}}
            />
            <Text>Google</Text>
          </TouchableOpacity>
        </View>
        <Text>Already have an account?</Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  innerView: {
    flex: 1,
    marginHorizontal: 22,
  },

  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#000',
  },

  text: {
    fontSize: 16,
    color: '#000000',
  },

  inputContainer: {
    marginBottom: 12,
  },

  inputLabel: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
  },

  inputBox: {
    width: '100%',
    height: 48,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22,
  },

  dividor: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
    marginHorizontal: 10,
  },

  signInMethodContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 52,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 4,
    borderRadius: 10,
  },
});
