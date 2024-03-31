import LottieView from 'lottie-react-native';
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuthContext} from '../navigation/AuthProvider';
import Button from '../components/Button';
import {COLORS} from '../constants/colors';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {loginWithCredentials, signInWithGoogle} = useAuthContext();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.innerView}>
          <View
            style={{
              height: 400,
            }}>
            <LottieView
              style={styles.animation}
              source={require('../assets/animations/Meditating.json')}
              autoPlay
            />
          </View>
          <Text style={styles.header}>Login</Text>
          <Text style={styles.text}>Continue your fitness journey!</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
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
            <Text style={styles.inputLabel}>Password</Text>
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
            title="Log In"
            filled
            onPress={() => loginWithCredentials(email, password)}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <View style={styles.dividor} />
            <Text style={{color: COLORS.grayText}}>Or log in with</Text>
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
          {/* <View style={styles.loginContainer}>
            <Text>Already have an account?</Text>
            <Pressable
              onPress={() => navigation.navigate('Login')}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              style={{opacity}}>
              <Text style={styles.loginButton}>Log In</Text>
            </Pressable>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
    borderColor: '#cccccc',
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
