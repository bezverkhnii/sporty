/* eslint-disable react/react-in-jsx-scope */
import {ButtonProps, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants/colors';

interface IButton {
  title: string;
  filled: boolean;
  onPress: () => void;
}

const CustomButton: React.FC<IButton> = ({title, filled, onPress}) => {
  return (
    <TouchableOpacity
      style={[
        filled
          ? {backgroundColor: COLORS.green}
          : {borderColor: COLORS.green, borderWidth: 3},
        {paddingVertical: 15, alignItems: 'center', borderRadius: 8},
      ]}
      onPress={onPress}>
      <Text
        style={[
          filled ? {color: 'white'} : {color: COLORS.green},
          {fontWeight: '600', fontSize: 16},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;