import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';
import OpacityPressable from './OpacityPressable';

const ActivityBox = ({
  time,
  activity,
  setModalVisible,
  filled,
}: {
  time?: string | Date;
  activity: string;
  setModalVisible?: React.Dispatch<SetStateAction<boolean>>;
  filled?: boolean;
}) => {
  return (
    <OpacityPressable
      onPress={
        activity === 'add'
          ? () => setModalVisible!(true)
          : () => console.log('other')
      }>
      <View
        style={[
          styles.container,
          {backgroundColor: filled ? COLORS.violet : 'rgba(250,250,250, 0.2)'},
        ]}>
        {activity === 'add' ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              gap: 5,
            }}>
            <FontAwesomeIcon icon="plus" size={20} color={COLORS.white} />
            <Text style={{color: COLORS.white}}>Add Activity</Text>
          </View>
        ) : (
          <>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                padding: 5,
              }}>
              <View style={styles.arrowContainer}>
                <FontAwesomeIcon icon={'arrow-right'} size={20} color="white" />
              </View>
            </View>
            <View style={styles.details}>
              <Text
                style={{fontSize: 20, fontWeight: '500', color: COLORS.white}}>
                {activity}
              </Text>
              <Text
                style={{fontSize: 25, fontWeight: '300', color: COLORS.white}}>
                {String(time)!}
              </Text>
            </View>
          </>
        )}
      </View>
    </OpacityPressable>
  );
};

export default ActivityBox;

const styles = StyleSheet.create({
  container: {
    width: 170,
    height: 170,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  arrowContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(250, 250, 250, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },

  details: {
    padding: 15,
  },
});
