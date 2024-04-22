import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {COLORS} from '../constants/colors';
import DatePicker from 'react-native-date-picker';
import {formatDate} from '../utils/formatDate';

const DatePickerField = ({
  date,
  setDate,
}: {
  date: Date;
  setDate: (date: Date) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={{color: COLORS.white}}>Birthday date</Text>
      <View style={styles.inputBox}>
        <Text style={{color: COLORS.white}}>{formatDate(date)}</Text>
        <Button title="i" onPress={() => setOpen(true)} />
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
