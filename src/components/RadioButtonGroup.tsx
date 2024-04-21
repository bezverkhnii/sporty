import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import OpacityPressable from './OpacityPressable';
import {activityLevels} from '../constants/activityLevels';
import {COLORS} from '../constants/colors';

const RadioButton = ({selected = false, onPress}) => {
  return (
    <OpacityPressable onPress={onPress}>
      <View style={btnStyles.outerCircle}>
        {selected ? <View style={btnStyles.selectedCircle} /> : null}
      </View>
    </OpacityPressable>
  );
};

const btnStyles = StyleSheet.create({
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCircle: {
    height: 10,
    width: 10,
    borderRadius: 6,
    backgroundColor: COLORS.green,
  },
});

const RadioButtonGroup = ({selected, setSelected, data}) => {
  const handleSelect = selected => {
    setSelected(selected);
  };

  console.log(selected);

  return (
    <View style={{gap: 5}}>
      {data.map((item, idx) => (
        <View key={idx} style={groupStyles.container}>
          <RadioButton
            selected={item.value === selected}
            onPress={() => handleSelect(item.value)}
          />
          <Text style={groupStyles.textColor}>{item.description || ''}</Text>
        </View>
      ))}
    </View>
  );
};

export default RadioButtonGroup;

const groupStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  textColor: {
    color: COLORS.white,
  },
});
