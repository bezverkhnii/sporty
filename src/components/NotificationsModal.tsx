import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from '../constants/colors';
import {FlatList} from 'react-native-gesture-handler';
import NotificationItem from './NotificationItem';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import OpacityPressable from './OpacityPressable';

const NotificationsModal = ({
  isVisible,
  setIsVisible,
  notifications,
}: {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  notifications: any;
}) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInRight"
      animationOut="slideOutRight">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <OpacityPressable onPress={() => setIsVisible(false)}>
            <FontAwesomeIcon
              icon={'plus'}
              color={COLORS.white}
              style={styles.closeButton}
              size={25}
            />
          </OpacityPressable>
          {notifications.length ? (
            <FlatList
              data={notifications}
              renderItem={({item}) => <NotificationItem item={item} />}
            />
          ) : (
            <Text style={styles.bigText}>No recent notifications</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default NotificationsModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  modalContent: {
    position: 'absolute',
    height: '100%',
    right: -30,
    top: 15,
    width: 250,
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 10,
  },

  closeButton: {
    transform: [{rotate: '45deg'}],
  },

  bigText: {
    color: COLORS.white,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
});
