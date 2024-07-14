import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../constants/colors';
import {askQuestion} from '../api/askGPT';
import ChatChip from '../components/ChatChip';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import LottieView from 'lottie-react-native';

const SportyAI = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const [chat, setChat] = useState([
    {
      user: 'SportyAI',
      message:
        'Hello! My name is SportyAI. Feel free to ask any information about traings and more!',
      id: 1,
    },
  ]);

  const getAnswer = async () => {
    setText('');
    setChat(chats => [
      ...chats,
      {
        user: 'Your name',
        message: text,
        id: chats.length + 1,
      },
    ]);
    setLoading(true);
    const aiResponse = await askQuestion(text);
    setLoading(false);
    setChat(chats => [
      ...chats,
      {
        user: 'SportyAI',
        message: aiResponse,
        id: chats.length + 1,
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{alignItems: 'center', paddingHorizontal: 10}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Image
              source={{
                uri: 'https://f4.bcbits.com/img/0009644394_23.jpg',
                width: 50,
                height: 50,
              }}
            />
          </View>
          <Text style={styles.headerText}>SportyAI</Text>
        </View>
        <View style={styles.chat}>
          {chat.map(message => (
            <View
              key={message.id}
              style={{
                alignItems: message.id % 2 === 0 ? 'flex-end' : 'flex-start',
              }}>
              <ChatChip message={message} />
            </View>
          ))}
        </View>
        {loading && (
          <LottieView
            style={styles.animation}
            source={require('../assets/animations/ai-think.json')}
            autoPlay
            speed={5}
            loop
          />
        )}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.input}>
          <TextInput
            value={text}
            onChangeText={e => setText(e)}
            placeholder="Type here..."
            placeholderTextColor={COLORS.transparent}
            multiline
            style={[{color: COLORS.white}, {maxWidth: 300, maxHeight: 40}]}
          />
          <TouchableOpacity
            onPress={() => getAnswer()}
            disabled={text === ''}
            style={[
              styles.sendButton,
              {
                backgroundColor:
                  text !== '' ? COLORS.white : COLORS.transparent,
              },
            ]}>
            <FontAwesomeIcon icon="paper-plane" size={20} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SportyAI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  input: {
    margin: 5,
    borderRadius: 20,
    padding: 3,
    backgroundColor: COLORS.transparent,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },

  chat: {
    paddingTop: 10,
    gap: 8,
  },

  logo: {
    borderRadius: 100,
    overflow: 'hidden',
  },

  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },

  sendButton: {
    padding: 12,
    borderRadius: 100,
    alignItems: 'center',
  },
  animation: {
    width: 100,
    height: 100,
  },
});
