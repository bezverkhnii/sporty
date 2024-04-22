import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import OpacityPressable from './OpacityPressable';
import {COLORS} from '../constants/colors';

interface IRadioButtonsData {
  value: string;
  description: string;
}

const RadioButton = ({
  selected = false,
  onPress,
}: {
  selected: boolean;
  onPress: () => void;
}) => {
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

const RadioButtonGroup = ({
  selected,
  setSelected,
  data,
}: {
  selected: string | null;
  setSelected: (val: string) => void;
  data: {value: string; description: string}[];
}) => {
  const handleSelect = (selectedVal: string) => {
    setSelected(selectedVal);
  };

  console.log(selected);

  return (
    <View style={{gap: 5}}>
      {data.map((item: IRadioButtonsData, idx: number) => (
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
