import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../constants/colors';
import UserBar from '../components/UserBar';
import ActivityBox from '../components/ActivityBox';
import OpacityPressable from '../components/OpacityPressable';
import {Formik} from 'formik';
import DatePicker from 'react-native-date-picker';
import DatePickerField from '../components/DatePicker';
import CustomButton from '../components/CustomButton';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {addActivity} from '../utils/addActivity';
import {useAuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import {
  formatDate,
  formatFirestoreDate,
  formatSecondsToDate,
} from '../utils/formatDate';
import {IActivity} from '../types';

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  //@ts-expect-error
  const {user} = useAuthContext();

  const getActivities = async () => {
    try {
      const activitiesSnapshot = await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('activities')
        .doc(dayId)
        .get();

      // const allActivitiesSnapshot = await firestore()
      //   .collection('users')
      //   .doc(user.uid)
      //   .collection('activities')
      //   .get();

      const dbActivities = activitiesSnapshot.data();
      if (!dbActivities) {
        setActivities([]);
      } else {
        const unsubscribe = firestore()
          .collection('users')
          .doc(user.uid)
          .collection('activities')
          .doc(dayId)
          .onSnapshot(snapshot => {
            const updatedActivities = snapshot.data();
            const upcomingActivities = updatedActivities!.activities
              .filter(
                (a: IActivity) =>
                  formatSecondsToDate(a.time.seconds!) >
                  new Date(moment().toISOString()),
              )
              .sort(
                (a: IActivity, c: IActivity) => a.time.seconds - c.time.seconds,
              );

            setActivities(upcomingActivities);
          });
        return () => unsubscribe();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddActivity = async (values: any) => {
    try {
      await addActivity(user.uid, values);
      await getActivities();
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Error occured');
    }
  };
  const dayId = `${moment().date()}.${moment().month()}`;

  useEffect(() => {
    setLoading(true);

    getActivities();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Modal transparent animationType="fade" visible={modalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={{position: 'absolute', right: 20, top: 10}}>
              <OpacityPressable onPress={() => setModalVisible(false)}>
                <FontAwesomeIcon
                  icon="plus"
                  style={{transform: [{rotate: '45deg'}]}}
                  size={25}
                  color={COLORS.white}
                />
              </OpacityPressable>
            </View>
            <Formik
              initialValues={{
                activity: '',
                time: new Date(Date.now()),
              }}
              onSubmit={values => handleAddActivity(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                setFieldValue,
              }) => (
                <View style={styles.form}>
                  <Text style={styles.modalHeader}>Create an Activity</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Activity"
                    onChangeText={handleChange('activity')}
                    onBlur={handleBlur('activity')}
                    placeholderTextColor={COLORS.grayText}
                    value={values.activity}
                  />
                  <RNDateTimePicker
                    style={{marginRight: 10}}
                    display="default"
                    value={values.time}
                    themeVariant="dark"
                    minuteInterval={15}
                    mode="datetime"
                    onChange={(event, selectedDate) => {
                      setFieldValue('time', selectedDate);
                    }}
                  />

                  <CustomButton onPress={handleSubmit} title="Submit" filled />
                </View>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
      <View style={styles.gradientTop}></View>
      <View style={styles.gradientRight}></View>
      <View style={styles.gradientLeft}></View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <UserBar />
        <Text style={styles.pageHeading}>Ready for Today's Challenges?</Text>
        <View style={styles.blockGrid}>
          {activities.map((activity: IActivity, idx: number) => (
            <ActivityBox
              key={idx}
              activity={activity.activity}
              time={formatFirestoreDate(activity.time)}
              filled={idx === 0}
            />
          ))}
          <ActivityBox activity="add" setModalVisible={setModalVisible} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageHeading: {
    fontSize: 40,
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
    width: 200,
    gap: 5,
    color: COLORS.white,
    borderRadius: 25,
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
