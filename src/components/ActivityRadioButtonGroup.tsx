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

const ActivityRadioButtonGroup = ({activityLevel, setActivityLevel}) => {
  const handleSelect = level => {
    setActivityLevel(level);
  };

  console.log(activityLevel);

  return (
    <View style={{gap: 5}}>
      {activityLevels.map(level => (
        <View key={level.level} style={groupStyles.container}>
          <RadioButton
            selected={level.level === activityLevel}
            onPress={() => handleSelect(level.level)}
          />
          <Text>{level.description}</Text>
        </View>
      ))}
    </View>
  );
};

export default ActivityRadioButtonGroup;

const groupStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
