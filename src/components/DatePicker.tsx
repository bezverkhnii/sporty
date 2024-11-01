import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {COLORS} from '../constants/colors';
import DatePicker from 'react-native-date-picker';
import {formatDate} from '../utils/formatDate';
import OpacityPressable from './OpacityPressable';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const DatePickerField = ({
  date,
  setDate,
  showTitle,
}: {
  date: Date;
  setDate: (date: Date) => void;
  showTitle?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={{gap: 3}}>
      {showTitle && <Text style={{color: COLORS.white}}>Birthday date</Text>}
      <View style={styles.container}>
        <View style={styles.inputBox}>
          <Text style={{color: COLORS.white, fontSize: 16, fontWeight: '600'}}>
            {formatDate(date)}
          </Text>
          <OpacityPressable onPress={() => setOpen(true)}>
            <FontAwesomeIcon icon="calendar" size={20} color={COLORS.white} />
          </OpacityPressable>
          <DatePicker
            mode="date"
            modal
            open={open}
            date={date}
            onConfirm={selectedDate => {
              setDate(selectedDate);
              setOpen(false);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default DatePickerField;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(51,51,51,0.5)',
    paddingHorizontal: 15,
    paddingVertical: 13,
    width: 170,
    gap: 5,
    borderRadius: 25,
  },

  inputBox: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
