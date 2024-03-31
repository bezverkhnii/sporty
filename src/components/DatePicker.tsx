import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {COLORS} from '../constants/colors';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const DatePickerField = () => {
  const minDate = moment().subtract(18, 'years').toDate();

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(minDate);

  //@ts-expect-error
  const formatDate = selectedDate => {
    return moment(selectedDate).calendar();
  };

  return (
    <View style={styles.container}>
      <Text>Birthday date</Text>
      <View style={styles.inputBox}>
        <Text>{formatDate(date)}</Text>
        <Button title="i" onPress={() => setOpen(true)} />
        <DatePicker
          mode="date"
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setDate(date);
            setOpen(false);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    </View>
  );
};

export default DatePickerField;

export const styles = StyleSheet.create({
  container: {
    width: '47%',
    gap: 5,
  },

  inputBox: {
    height: 48,
    borderColor: COLORS.borderColor,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 22,
    paddingRight: 10,
  },
});
