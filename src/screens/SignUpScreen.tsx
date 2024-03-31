/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../components/Button.tsx';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useState} from 'react';
import {useAuthContext} from '../navigation/AuthProvider.tsx';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS} from '../constants/colors.ts';
import OpacityPressable from '../components/OpacityPressable.tsx';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  GoogleSignin.configure({
    webClientId:
      '1023232230089-simi48vfd10909cialu0dqlpu1e8vn85.apps.googleusercontent.com',
  });
  //@ts-expect-error
  const {signInWithGoogle, signInWithCredentials} = useAuthContext();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.innerView}>
          <View style={{height: 400}}>
            <LottieView
              style={styles.animation}
              source={require('../assets/animations/SignUpScreenAnimation.json')}
              autoPlay
            />
          </View>
          <Text style={styles.header}>Create Account</Text>
          <Text style={styles.text}>Start sculpting your body today!</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>1. Enter your email</Text>
            <View style={styles.inputBox}>
              <TextInput
                placeholder="Email address"
                placeholderTextColor={COLORS.borderColor}
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
                placeholderTextColor={COLORS.borderColor}
                style={{width: '100%'}}
              />
            </View>
          </View>
          <Button
            title="Sign up"
            filled
            onPress={() => signInWithCredentials(email, password)}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <View style={styles.dividor} />
            <Text style={{color: COLORS.grayText}}>Or sign up with</Text>
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
          <View style={styles.loginContainer}>
            <Text>Already have an account?</Text>
            <OpacityPressable onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginButton}>Log In</Text>
            </OpacityPressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  innerView: {
    flex: 2,
    marginHorizontal: 22,
  },

  animation: {
    flex: 2,
  },

  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#000',
  },

  text: {
    fontSize: 16,
    color: COLORS.grayText,
  },

  inputContainer: {
    marginBottom: 12,
  },

  inputLabel: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
    color: COLORS.grayText,
  },

  inputBox: {
    width: '100%',
    height: 48,
    borderColor: COLORS.borderColor,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22,
  },

  dividor: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.borderColor,
    marginHorizontal: 10,
  },

  signInMethodContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    marginRight: 4,
    borderRadius: 10,
  },
  loginContainer: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#217931',
  },
});
